import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const STATS = [
  { value: SITE.yearsIndependent, label: "Années d'activité indépendante" },
  { value: 140, label: "Projets réalisés" },
];

export function Hero() {
  return (
    // A minimum height, never a fixed h-dvh, at every width: with items-end
    // anchoring content to the bottom, a fixed height makes a tall headline
    // overflow upward into the space kept for the floating header, landing it
    // under the logo and nav (seen on phones, and at 1024x768 on iPad
    // landscape). The top padding must stay taller than the header: 160px
    // below lg, 200px from lg, where the header is 170px.
    <section className="relative isolate flex min-h-[max(100dvh,560px)] items-end overflow-hidden pt-40 lg:pt-[200px]">
      <Image
        src="/images/hero-home.webp"
        alt="Le logo Ô Paysage en version réelle : une colline verdoyante traversée par un chemin de gravier sinueux, avec un arbre doré et une montagne enneigée"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-scrim" />
      {/* Phones only: there the headline spans the full width and crosses the
       * bright sky, where it measured 2.52:1 (AA: 3 for large text). */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-shade lg:hidden" />

      <div className="container-page flex w-full flex-col gap-10 pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:pb-[72px]">
        <div className="flex max-w-[672px] flex-col gap-6 lg:gap-8">
          {/* Above the fold, so CSS animate-rise rather than AnimatedHeadline
           * and Reveal, which keep their content invisible until JavaScript
           * has loaded (see tailwind.config.ts). */}
          <h1 className="animate-rise text-[2.25rem] font-bold uppercase leading-[1.15] text-bg sm:text-[2.75rem] lg:text-[clamp(2.75rem,4.375vw,3.5rem)]">
            Un jardin impeccable toute l&apos;année, sans les mauvaises surprises.
          </h1>
          <p className="animate-rise text-body text-bg [animation-delay:100ms]">
            {SITE.yearsIndependent} ans d&apos;expérience en tant qu&apos;indépendant. Nicolas Descloux, Fondateur de Ô
            Paysage, est actif dans la Broye — un seul interlocuteur, du premier rendez-vous à
            l&apos;entretien annuel.
          </p>
          <div className="animate-rise [animation-delay:150ms]">
            <ButtonLink href="/contact">
              Obtenir mon devis gratuit
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </div>

        <div className="w-full animate-rise rounded-lg bg-moss/80 p-6 [animation-delay:200ms] sm:max-w-[411px] sm:p-8">
          {/* A caption for the figures below, not a page section — kept out of
           * the heading outline, where an h2 here would read as the first
           * section after the h1. */}
          <p className="text-[1.1875rem] font-black uppercase leading-[1.3] tracking-[1.5px] text-bg">
            Chiffres Clés
          </p>
          <dl className="mt-5 flex gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-1 flex-col gap-1 text-bg">
                <dd className="text-[2.25rem] font-black leading-none sm:text-stat">
                  <AnimatedCounter value={stat.value} prefix="+" delay={1.1} />
                </dd>
                <dt className="text-[1.1875rem] font-bold uppercase leading-[1.3]">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
