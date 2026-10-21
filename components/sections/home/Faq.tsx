import { JsonLd } from "@/components/misc/StructuredData";
import { Accordion } from "@/components/ui/Accordion";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/data/faq";

export function Faq() {
  return (
    <section id="faq" className="bg-bg py-16 lg:py-[100px]">
      <div className="container-page grid gap-12 lg:grid-cols-[519px_1fr] lg:gap-[133px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            <AnimatedHeadline
              text="Vos questions, avant même de nous contacter"
              className="section-heading"
            />
            <Reveal as="p" delay={0.1} className="text-body">
              Une réponse {SITE.replyTime}, et une visite sur place généralement dans la semaine.
            </Reveal>
          </div>

          <Reveal
            delay={0.15}
            // Dark text on moss, as in Figma: white on this green is 3.4:1,
            // under the 4.5:1 that 16px body text needs; ink is about 5:1.
            className="flex max-w-[485px] flex-col gap-6 rounded-card bg-moss p-6 text-ink"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
              <h3 className="text-card-title font-bold uppercase leading-[1.6] sm:max-w-[171px]">
                Pas ce que vous cherchez ?
              </h3>
              <p className="text-base sm:max-w-[268px] sm:pt-1.5">
                Chaque jardin a ses particularités. Décrivez votre situation, Nicolas vous répond
                directement.
              </p>
            </div>
            <ButtonLink href="/contact">Poser ma question à Nicolas</ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:max-w-[628px]">
          <Accordion items={FAQ_ITEMS} />
        </Reveal>
      </div>
      {/* Google shows FAQ rich results only for government and health sites
       * since 2023; this is for AI answer engines, which read it. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
    </section>
  );
}
