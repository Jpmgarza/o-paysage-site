"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Animated elements use framer's slim `m` component, which ships without
 * animation features; this provider adds the `domAnimation` set (animate,
 * variants, exit, whileInView, hover/tap) once for the whole site. The full
 * `motion` component bundled every feature, layout and drag included, which
 * Lighthouse reported as ~25 KB of unused JavaScript on each page.
 *
 * `strict` makes any stray `motion.*` throw in development, so it cannot
 * silently bring the full bundle back.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
