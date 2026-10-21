"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  duration?: number;
  /** Held at 0 for this long before counting starts — set this past any
   * parent fade-in so the "0" is actually visible, not hidden mid-count. */
  delay?: number;
  className?: string;
};

export function AnimatedCounter({
  value,
  prefix = "",
  duration = 1.1,
  delay = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Starts at the final value so SSR output and no-JS fallback are always
  // correct; the effect below resets to 0 and counts back up once visible.
  const motionValue = useMotionValue(value);
  const rounded = useTransform(motionValue, (latest) => `${prefix}${Math.round(latest)}`);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    // Zero out immediately (while still hidden by the parent's fade-in) so
    // the "0" is what's on screen the instant the card becomes visible.
    motionValue.set(0);
    const controls = animate(motionValue, value, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value, duration, delay, motionValue]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
