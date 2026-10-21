"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type Segment = {
  text: string;
  className?: string;
};

type AnimatedHeadlineProps = {
  /** A string, or segments when part of the headline is styled differently. */
  text: string | Segment[];
  as?: "h1" | "h2" | "p";
  className?: string;
};

/**
 * Word-by-word reveal. The words stay real inline text so selection, wrapping
 * and assistive technology behave exactly like a normal heading.
 */
export function AnimatedHeadline({ text, as = "h2", className }: AnimatedHeadlineProps) {
  const segments: Segment[] = typeof text === "string" ? [{ text }] : text;
  const Component = m[as] as typeof m.h2;

  let index = 0;
  const nodes: ReactNode[] = [];

  segments.forEach((segment, segmentIndex) => {
    // A segment that opens with punctuation hugs the previous word ("message" + ".").
    if (segmentIndex > 0 && /^[.,;:!?)]/.test(segment.text)) {
      nodes.pop();
    }

    segment.text.split(" ").forEach((token) => {
      if (!token) return;
      nodes.push(
        <span key={`w-${index++}`} className="inline-block overflow-hidden align-bottom">
          <m.span
            data-reveal
            className={`inline-block ${segment.className ?? ""}`}
            variants={word}
          >
            {token}
          </m.span>
        </span>,
      );
      nodes.push(<span key={`s-${index++}`}> </span>);
    });
  });

  return (
    <Component
      className={className}
      data-reveal
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {nodes}
    </Component>
  );
}
