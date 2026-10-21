"use client";

import { m, type Variants } from "framer-motion";
import { Star } from "lucide-react";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const drop: Variants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

type StarRatingProps = {
  className?: string;
  /** Drops each star in from just above, one after another, on scroll into view. */
  animated?: boolean;
};

export function StarRating({ className = "", animated = false }: StarRatingProps) {
  if (!animated) {
    return (
      <div
        className={`flex items-center ${className}`}
        role="img"
        aria-label="Note de 5 étoiles sur 5"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="size-[18px] fill-accent text-accent" strokeWidth={0} />
        ))}
      </div>
    );
  }

  return (
    <m.div
      className={`flex items-center ${className}`}
      role="img"
      aria-label="Note de 5 étoiles sur 5"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <m.span key={index} data-reveal variants={drop} className="inline-flex">
          <Star className="size-[18px] fill-accent text-accent" strokeWidth={0} />
        </m.span>
      ))}
    </m.div>
  );
}
