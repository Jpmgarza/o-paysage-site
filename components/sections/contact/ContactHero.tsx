import Link from "next/link";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { SITE } from "@/lib/constants";
import { TESTIMONIAL_TERRASSE } from "@/lib/data/testimonials";

export function ContactHero() {
  return (
    // The hero uses CSS animate-rise rather than AnimatedHeadline/Reveal: see
    // Hero.tsx.
    <section className="bg-moss pb-16 pt-32 lg:pb-[104px] lg:pt-[200px]">
      <div className="container-page flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="flex max-w-[737px] flex-col gap-6">
          <h1 className="animate-rise text-[2.25rem] font-bold uppercase leading-[1.15] text-bg sm:text-[2.75rem] lg:text-[clamp(2.75rem,4.375vw,3.5rem)]">
            Un jardin bien entretenu commence par un simple{" "}
            {/* Ink, not Figma's gold: gold on moss is 1.67:1, under even the
             * 3:1 AA allows large text. */}
            <span className="text-ink">message</span>.
          </h1>
          {/* Ink body text: white on moss is 3.31:1, under AA's 4.5:1 at this size. */}
          <div className="flex animate-rise flex-col items-start text-ink [animation-delay:100ms]">
            <p className="max-w-[360px] text-body">
              Réponse {SITE.replyTime}, devis gratuit et sans engagement. Nicolas se déplace dans
              toute {SITE.region}.
            </p>
            {/* For visitors who land here first, e.g. from a search result. */}
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center text-body underline underline-offset-4 hover:decoration-2"
            >
              Voir les services
            </Link>
          </div>
        </div>

        <div className="w-full animate-rise [animation-delay:200ms] lg:max-w-[411px]">
          <TestimonialCard testimonial={TESTIMONIAL_TERRASSE} />
        </div>
      </div>
    </section>
  );
}
