"use client";

import { m, type Variants } from "framer-motion";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/data/process";

const EASE = [0.22, 1, 0.36, 1] as const;
const BASE_DELAY = 0.1;
const CIRCLE_DURATION = 0.28;
const LINE_DURATION = 0.28;
const CARD_DURATION = 0.4;
// One full cycle per step: its circle pops in, then its card rises, then the
// line to the next circle grows — each phase starts only once the one before
// it has finished, so the whole row reveals strictly one piece at a time.
const STEP_CYCLE = CIRCLE_DURATION + CARD_DURATION + LINE_DURATION;

const circleDelay = (index: number) => BASE_DELAY + index * STEP_CYCLE;
const cardDelay = (index: number) => circleDelay(index) + CIRCLE_DURATION;
// Line segment running from step `index` to step `index + 1`.
const lineDelay = (index: number) => cardDelay(index) + CARD_DURATION;

function circleVariants(delay: number): Variants {
  return {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1, transition: { duration: CIRCLE_DURATION, delay, ease: EASE } },
  };
}

function lineVariants(delay: number): Variants {
  return {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: LINE_DURATION, delay, ease: EASE } },
  };
}

function cardVariants(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: CARD_DURATION, delay, ease: EASE } },
  };
}

export function Process() {
  return (
    <section id="processus" className="bg-bg py-16 lg:py-[120px]">
      <div className="container-page flex flex-col gap-12 lg:gap-16">
        <AnimatedHeadline
          text="Votre jardin entretenu, en 5 étapes simples"
          className="section-heading max-w-[628px]"
        />

        <m.ol
          // Five columns only from xl: at 1024px each card is ~120px inside and
          // "PLANIFICATION" no longer fits. Two, then three columns in between.
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PROCESS_STEPS.map((step, index) => {
            const isLast = index === PROCESS_STEPS.length - 1;

            return (
              <li key={step.number} className="relative flex flex-col gap-4">
                {/* Grows left-to-right from this circle toward the next one,
                 * only once this step's card has finished landing. */}
                {!isLast && (
                  <m.span
                    aria-hidden
                    data-reveal
                    variants={lineVariants(lineDelay(index))}
                    // Only drawn when all five steps sit on one row (xl): with
                    // wrapping columns a line would point into empty space.
                    className="absolute left-6 top-6 hidden h-0.5 w-[calc(100%+1.5rem)] origin-left bg-accent xl:block"
                  />
                )}
                <m.span
                  data-reveal
                  variants={circleVariants(circleDelay(index))}
                  className={`relative flex size-12 items-center justify-center rounded-full text-body shadow-card ${
                    isLast ? "bg-accent" : "border-2 border-accent bg-bg"
                  }`}
                >
                  {step.number}
                </m.span>
                <m.div
                  data-reveal
                  variants={cardVariants(cardDelay(index))}
                  className={`flex h-full flex-col gap-3 rounded-step border-2 border-moss p-5 shadow-card ${
                    // Ink on the moss card too: white body text on moss is 3.31:1,
                    // under the 4.5:1 AA asks.
                    index === 0 ? "bg-moss text-ink" : "bg-bg text-ink"
                  }`}
                >
                  <h3 className="text-card-title font-bold uppercase leading-[1.6]">
                    {step.title}
                  </h3>
                  {/* Softened on white only; on the moss card it must stay full ink. */}
                  <p className={`text-body ${index === 0 ? "" : "opacity-80"}`}>{step.description}</p>
                </m.div>
              </li>
            );
          })}
        </m.ol>

        <div className="flex flex-col items-start gap-6 border-t border-ink/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <Reveal as="p" className="max-w-[605px] text-body">
            Une question sur l&apos;accompagnement ? Nicolas vous répond personnellement.
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/contact">Lancer mon projet</ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
