import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { SITE } from "@/lib/constants";
import { TESTIMONIAL_TERRASSE } from "@/lib/data/testimonials";

export function ServicesHero() {
  return (
    // See Hero.tsx for why this is a minimum height, not a fixed h-dvh, and
    // why the content uses CSS animate-rise rather than Reveal.
    <section className="relative isolate flex min-h-[max(100dvh,560px)] items-end overflow-hidden pt-40 lg:pt-[200px]">
      {/* The photo comes pre-straightened: Figma rotates it by -1.26°, which is
       * baked into the file and the tilted corners cropped away. */}
      <Image
        src="/images/services-hero.webp"
        alt="Terrasse en grès cérame devant une maison blanche à store banne, bordée d'une pelouse fraîchement tondue"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-scrim" />
      {/* Extra shade under the text: the white wall behind it is the brightest
       * part of the photo, and with the side scrim alone the paragraph measured
       * 3.46:1 (AA: 4.5) and the headline 2.19:1 on phones (AA: 3 for large text). */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-shade" />
      {/* Phones: the paragraph runs across the whole wall, and still measured 4.0:1. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/20 lg:hidden" />

      <div className="container-page flex w-full flex-col gap-10 pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:pb-[72px]">
        <div className="flex max-w-[652px] flex-col gap-6 lg:gap-8">
          <h1 className="animate-rise text-[2.25rem] font-bold uppercase leading-[1.15] text-bg sm:text-[2.75rem] lg:text-[clamp(2.75rem,4.375vw,3.5rem)]">
            Nos services de paysagisme
          </h1>
          <p className="animate-rise text-body font-bold text-bg [animation-delay:100ms]">
            Cinq prestations pensées pour un entretien simple, fiable et sans surprise, pour les
            particuliers comme pour les régies, dans {SITE.region} et ses environs.
          </p>
          <div className="animate-rise [animation-delay:150ms]">
            <ButtonLink href="#prestations">
              Voir nos prestations
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </div>

        <div className="w-full animate-rise [animation-delay:200ms] sm:max-w-[411px]">
          <TestimonialCard testimonial={{ ...TESTIMONIAL_TERRASSE, author: "M. Jacot-Descombes" }} />
        </div>
      </div>
    </section>
  );
}
