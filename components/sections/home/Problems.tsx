"use client";

import { motion, type Variants } from "framer-motion";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PROBLEMS, type Problem } from "@/lib/data/problems";

const EASE = [0.22, 1, 0.36, 1] as const;
const STAGGER_STEP = 0.12;
const BASE_DELAY = 0.1;
const CARD_DURATION = 0.9;

function cardVariants(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: -56 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: CARD_DURATION, delay, ease: EASE },
    },
  };
}

// The 16px offset lives in top/left/right/bottom, not transform: Framer
// Motion owns the whole `transform` property once it animates `scale` (that
// would wipe out a translate-* class on the same element), and the no-JS
// noscript fallback forces `transform: none !important` on every
// data-reveal node — either one would erase an offset expressed as x/y.
// Box-edge positioning is immune to both.
function plateVariants(delay: number): Variants {
  return {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay, ease: EASE },
    },
  };
}

function ProblemCard({ problem, index }: { problem: Problem; index: number }) {
  const delay = BASE_DELAY + index * STAGGER_STEP;

  return (
    <motion.div
      className="relative h-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Stays fully hidden until the card in front finishes landing,
       * then grows/fades in on top of the now-settled card. */}
      {problem.highlighted && (
        <motion.span
          aria-hidden
          data-reveal
          variants={plateVariants(delay + CARD_DURATION)}
          className="absolute -bottom-4 -right-4 left-4 top-4 rounded-field bg-moss"
        />
      )}
      <motion.article
        data-reveal
        variants={cardVariants(delay)}
        className={`relative flex h-full flex-col gap-4 rounded-card border-2 border-moss bg-bg p-8 lg:p-9 ${
          problem.highlighted ? "shadow-bento" : "shadow-bento-soft"
        }`}
      >
        <p className="text-quote text-moss" aria-hidden>
          {problem.number}
        </p>
        <div className="flex flex-col gap-2">
          <h3 className="text-card-title font-bold uppercase leading-[1.6]">{problem.title}</h3>
          <p className="text-body">{problem.description}</p>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function Problems() {
  const [first, second, third, fourth] = PROBLEMS;

  return (
    <section className="bg-bg py-16 lg:py-[120px]">
      <div className="container-page flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-5">
          <AnimatedHeadline
            text="Un jardin négligé coûte plus cher qu'un jardin entretenu"
            className="section-heading max-w-[714px]"
          />
          <Reveal as="p" delay={0.1} className="max-w-[720px] text-body opacity-70">
            Un jardin négligé, ce n&apos;est jamais juste une question d&apos;esthétique.
          </Reveal>
        </div>

        {/* Figma's bento: a narrow card beside a wide one (397px and 801px at
         * 1440), then two halves. The moss plates reach 16px past their card,
         * which the 24px+ gaps leave room for. */}
        <div className="flex flex-col gap-10 sm:gap-8">
          <div className="grid gap-10 sm:gap-8 md:grid-cols-[1fr_2fr] md:items-stretch lg:gap-6">
            <ProblemCard problem={first} index={0} />
            <ProblemCard problem={second} index={1} />
          </div>
          <div className="grid gap-10 sm:gap-8 md:grid-cols-2 md:items-stretch lg:gap-6">
            <ProblemCard problem={third} index={2} />
            <ProblemCard problem={fourth} index={3} />
          </div>
        </div>

        <Reveal className="flex justify-center">
          <ButtonLink href="/contact">Trouver ma solution</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
