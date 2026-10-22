import { z } from "zod";
import { SERVICES } from "./data/services";

export const SERVICE_OPTIONS = [
  ...SERVICES.map((service) => ({ value: service.slug, label: service.title })),
  { value: "autre", label: "Autre demande" },
];

const allowedServices = SERVICE_OPTIONS.map((option) => option.value);

export const ContactSchema = z.object({
  name: z.string().trim().min(2, "Merci d'indiquer votre nom.").max(100),
  email: z.string().trim().email("Adresse e-mail invalide."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  service: z
    .string()
    .trim()
    .refine((value) => value === "" || allowedServices.includes(value), "Service inconnu.")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Décrivez votre projet en quelques mots.").max(2000),
  // Spam traps: bots fill hidden fields and submit instantly.
  hp: z.literal("").optional(),
  startedAt: z.number().optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "rate_limited" | "mail" };

export function serviceLabel(slug?: string): string {
  if (!slug) return "Non précisé";
  return SERVICE_OPTIONS.find((option) => option.value === slug)?.label ?? "Non précisé";
}
