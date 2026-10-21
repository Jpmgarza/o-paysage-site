import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";

type Detail = {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

const DETAILS: Detail[] = [
  { icon: Phone, label: "Téléphone", value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: "Adresse", value: SITE.address, href: SITE.addressMapUrl, external: true },
];

export function ContactSection({
  title,
  subtitle,
  submitLabel,
  headingLevel = "h2",
}: {
  title: string;
  subtitle?: string;
  submitLabel?: string;
  headingLevel?: "h1" | "h2";
}) {
  return (
    <section id="contact" className="bg-bg py-16 lg:pb-[120px] lg:pt-[100px]">
      <div className="container-narrow flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        <div className="flex w-full max-w-[480px] flex-col gap-8 lg:gap-12">
          <div className="flex flex-col gap-4">
            <AnimatedHeadline as={headingLevel} text={title} className="section-heading" />
            {subtitle && (
              <Reveal as="p" delay={0.1} className="text-body">
                {subtitle}
              </Reveal>
            )}
          </div>

          <ul className="flex flex-col gap-4">
            {DETAILS.map((detail, index) => {
              const Icon = detail.icon;

              return (
                <Reveal as="li" key={detail.label} delay={0.08 * index} className="flex items-center gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-moss-soft">
                    <Icon aria-hidden className="size-6 text-moss" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-card-title font-bold uppercase leading-[1.6]">
                      {detail.label}
                    </span>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        {...(detail.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex min-h-11 items-center text-body transition-colors hover:text-moss-dark"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <span className="text-body">{detail.value}</span>
                    )}
                  </span>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Reveal delay={0.15} className="w-full lg:max-w-[640px]">
          <ContactForm submitLabel={submitLabel} />
        </Reveal>
      </div>
    </section>
  );
}
