"use client";

import { m, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
};

export function Reveal({ children, as = "div", className, delay = 0, id }: RevealProps) {
  const Component = m[as as keyof typeof m] as typeof m.div;

  return (
    <Component
      id={id}
      data-reveal
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
