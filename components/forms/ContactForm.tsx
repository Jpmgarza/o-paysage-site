"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { submitContactForm } from "./actions";
import { SITE } from "@/lib/constants";
import { ContactSchema, SERVICE_OPTIONS, type ContactInput } from "@/lib/contact-schema";

// Taller than Figma's 53px so a floated label and the typed text both fit.
// Focus turns the border ink (16.9:1 on white) rather than gold (1.98:1), and
// hover moss-dark rather than moss/80: a field's border must stay at 3:1 (AA).
const fieldClass =
  "peer w-full rounded-field border-[2.5px] border-moss bg-bg px-4 pb-2 pt-6 text-body text-ink outline-none transition-colors hover:border-moss-dark focus:border-ink";

// Floating labels: the label sits inside the field, where Figma shows its
// placeholder, and slides up to the top edge on focus or once filled, so it
// never disappears the way a placeholder does. It needs placeholder=" " on the
// field: an empty, visible placeholder is what :placeholder-shown detects.
const floated =
  "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[0.8125rem] peer-focus:leading-4 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[0.8125rem] peer-[:not(:placeholder-shown)]:leading-4";
const labelBase = "pointer-events-none absolute left-[18.5px] text-ink/70 transition-all duration-150";
const labelClass = `${labelBase} top-1/2 -translate-y-1/2 text-body ${floated}`;
const textareaLabelClass = `${labelBase} top-[18px] text-body ${floated}`;
// The select always shows a choice ("Non précisé" at least), so its label stays up.
const selectLabelClass = `${labelBase} top-2 text-[0.8125rem] leading-4`;

const errorClass = "mt-1.5 text-label text-[#a4331f]";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ submitLabel = "Envoyer ma demande" }: { submitLabel?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef(Date.now());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", phone: "", service: "", message: "", hp: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("sending");
    const result = await submitContactForm({ ...values, startedAt: startedAt.current });

    if (result.ok) {
      setStatus("success");
      reset();
      return;
    }

    setStatus("error");
  });

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-card border-[2.5px] border-moss bg-moss-soft p-8">
        <CheckCircle2 aria-hidden className="size-10 text-moss" />
        <h3 className="text-card-title font-bold uppercase">Demande envoyée</h3>
        <p className="text-body">
          Merci ! Nicolas vous répond personnellement {SITE.replyTime} pour convenir d&apos;une
          visite sur place.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[18px]">
      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-field border-2 border-[#a4331f] bg-[#a4331f]/5 p-4"
        >
          <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-[#a4331f]" />
          <p className="text-label text-[#a4331f]">
            L&apos;envoi a échoué. Réessayez, ou contactez Nicolas directement par téléphone.
          </p>
        </div>
      )}

      {/* In each field the label follows the input: the floating label is
       * styled from the input's state through Tailwind's peer-* variants,
       * which only reach later siblings. */}
      <div>
        <div className="relative">
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder=" "
            aria-invalid={Boolean(errors.name)}
            className={`${fieldClass} h-[60px]`}
            {...register("name")}
          />
          <label htmlFor="contact-name" className={labelClass}>
            Votre nom complet
          </label>
        </div>
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div>
        <div className="relative">
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder=" "
            aria-invalid={Boolean(errors.email)}
            className={`${fieldClass} h-[60px]`}
            {...register("email")}
          />
          <label htmlFor="contact-email" className={labelClass}>
            Votre adresse e-mail
          </label>
        </div>
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div className="relative">
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          placeholder=" "
          className={`${fieldClass} h-[60px]`}
          {...register("phone")}
        />
        <label htmlFor="contact-phone" className={labelClass}>
          Votre numéro (facultatif)
        </label>
      </div>

      <div className="relative">
        <select
          id="contact-service"
          className={`${fieldClass} h-[60px] appearance-none pr-12`}
          defaultValue=""
          {...register("service")}
        >
          {/* Same wording the notification email uses when none is chosen. */}
          <option value="">Non précisé</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label htmlFor="contact-service" className={selectLabelClass}>
          Service souhaité (facultatif)
        </label>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-moss"
        />
      </div>

      <div>
        <div className="relative">
          <textarea
            id="contact-message"
            rows={4}
            placeholder=" "
            aria-invalid={Boolean(errors.message)}
            className={`${fieldClass} h-[136px] resize-none pt-7`}
            {...register("message")}
          />
          <label htmlFor="contact-message" className={textareaLabelClass}>
            Décrivez votre projet
          </label>
        </div>
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {/* Spam trap — bots reading the HTML fill it, people never see it. It was
       * once a "Société" field moved off-screen, and browsers autofilled it with
       * the visitor's company: validation then failed on a field nobody could
       * see and the button did nothing. So: display:none (browsers do not
       * autofill fields that are not rendered), a name and label that match no
       * autofill category, and autocomplete off. */}
      <div aria-hidden className="hidden">
        <label htmlFor="contact-hp">Ne pas remplir</label>
        <input
          id="contact-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("hp")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="h-14 w-full rounded-lg bg-accent text-card-title font-bold uppercase text-ink shadow-cta transition hover:bg-[#d9a12c] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Envoi en cours…" : submitLabel}
      </button>

      <div className="flex max-w-[65ch] flex-col items-start text-base text-ink/70">
        <p>
          Vos données servent uniquement à répondre à votre demande. Réponse {SITE.replyTime},
          devis gratuit et sans engagement.
        </p>
        {/* Its own line, not inline in the sentence, so it can be a full
         * 44px-tall touch target without stretching the paragraph. */}
        <Link
          href="/donnees-personnelles"
          className="inline-flex min-h-11 items-center underline hover:text-ink"
        >
          Voir la page Données personnelles
        </Link>
      </div>
    </form>
  );
}
