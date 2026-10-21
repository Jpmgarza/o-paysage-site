import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { SITE } from "@/lib/constants";
import { TESTIMONIAL_FIDELITE } from "@/lib/data/testimonials";

export function ServicesCta() {
  return (
    <section className="bg-moss py-16 lg:py-[100px]">
      <div className="container-page flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex max-w-[690px] flex-col items-start gap-6">
          <AnimatedHeadline
            text="Parlez à Nicolas de votre projet"
            className="section-heading text-bg"
          />
          {/* Ink, not white: white body text on moss is 3.31:1, under AA's 4.5:1.
           * The heading above stays white, as large text it needs only 3:1. */}
          <Reveal as="p" delay={0.1} className="max-w-[519px] text-body text-ink">
            Dites-nous ce que vous souhaitez améliorer. Nicolas vous rappelle {SITE.replyTime} pour
            discuter de votre projet.
          </Reveal>
          <Reveal delay={0.2} className="lg:pt-2">
            <ButtonLink href="/contact">Parler à Nicolas</ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="w-full lg:max-w-[411px]">
          <TestimonialCard testimonial={TESTIMONIAL_FIDELITE} />
        </Reveal>
      </div>
    </section>
  );
}
