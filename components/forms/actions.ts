"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { SITE } from "@/lib/constants";
import {
  ContactSchema,
  serviceLabel,
  type ContactInput,
  type ContactResult,
} from "@/lib/contact-schema";

const MIN_FILL_TIME_MS = 2_000;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function withinRateLimit(key: string, max = 5, windowMs = 3_600_000): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) return false;

  entry.count += 1;
  return true;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function notificationHtml(data: ContactInput): string {
  const rows: Array<[string, string]> = [
    ["Nom", escapeHtml(data.name)],
    ["E-mail", escapeHtml(data.email)],
    ["Téléphone", data.phone ? escapeHtml(data.phone) : "—"],
    ["Service", escapeHtml(serviceLabel(data.service))],
  ];

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #1c1c1a;">
      <div style="background: #849443; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; color: #fefefe; font-size: 20px;">Nouvelle demande de devis</h1>
        <p style="margin: 8px 0 0; color: #fefefe;">${escapeHtml(SITE.name)} — site web</p>
      </div>
      <div style="border: 1px solid #e5e5e0; border-top: 0; border-radius: 0 0 8px 8px; padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">${label} :</td><td style="padding: 6px 0;">${value}</td></tr>`,
            )
            .join("")}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f7f7f4; border-radius: 8px;">
          <p style="margin: 0 0 8px; font-weight: bold;">Message :</p>
          <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
      </div>
    </div>
  `;
}

function confirmationHtml(name: string): string {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #1c1c1a;">
      <div style="background: #849443; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; color: #fefefe; font-size: 20px;">${escapeHtml(SITE.name)}</h1>
        <p style="margin: 8px 0 0; color: #fefefe;">${escapeHtml(SITE.tagline)}</p>
      </div>
      <div style="border: 1px solid #e5e5e0; border-top: 0; border-radius: 0 0 8px 8px; padding: 24px;">
        <p>Bonjour ${escapeHtml(name)},</p>
        <p style="line-height: 1.6;">
          Merci pour votre demande. Je l'ai bien reçue et je vous réponds personnellement ${escapeHtml(SITE.replyTime)}
          afin de convenir d'une visite sur place. Le devis est gratuit et sans engagement.
        </p>
        <p style="margin-top: 24px; padding: 16px; background: #f7f7f4; border-left: 4px solid #e4af3a; border-radius: 4px;">
          ${escapeHtml(SITE.owner)}<br />
          ${escapeHtml(SITE.phone)} · ${escapeHtml(SITE.email)}<br />
          ${escapeHtml(SITE.address)}
        </p>
      </div>
    </div>
  `;
}

async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    // In production this must fail: skipping silently showed visitors a
    // success message while their request went nowhere.
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMTP non configuré (SMTP_HOST / SMTP_USER manquant)");
    }
    console.warn("[contact] SMTP non configuré — e-mail non envoyé:", {
      to: options.to,
      subject: options.subject,
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  // Always from the site's own address, never from the environment, so a stale
  // SMTP_FROM on the server cannot change it.
  await transporter.sendMail({ from: `"${SITE.name}" <${SITE.email}>`, ...options });
}

export async function submitContactForm(input: unknown): Promise<ContactResult> {
  const parsed = ContactSchema.safeParse(input);

  if (!parsed.success) return { ok: false, reason: "invalid" };

  const data = parsed.data;

  if (data.hp) return { ok: false, reason: "invalid" };

  if (data.startedAt && Date.now() - data.startedAt < MIN_FILL_TIME_MS) {
    return { ok: false, reason: "invalid" };
  }

  const ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!withinRateLimit(`contact:${ip}`)) return { ok: false, reason: "rate_limited" };

  try {
    await sendMail({
      to: SITE.email,
      subject: `Nouvelle demande — ${data.name} — ${serviceLabel(data.service)}`,
      html: notificationHtml(data),
      replyTo: data.email,
    });

    await sendMail({
      to: data.email,
      subject: `Votre demande a bien été reçue — ${SITE.name}`,
      html: confirmationHtml(data.name),
    });

    return { ok: true };
  } catch (error) {
    console.error("[contact] Envoi e-mail impossible:", error);
    return { ok: false, reason: "mail" };
  }
}
