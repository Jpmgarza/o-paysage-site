import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "accent" | "outline-light";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2.5 text-center font-bold uppercase leading-[1.6] transition duration-200 disabled:cursor-not-allowed disabled:opacity-60";

// Font size lives in each variant, not in `base`, so one can differ without two
// competing size utilities on the same element.
const variants: Record<Variant, string> = {
  accent:
    "rounded-lg bg-accent px-6 py-3.5 text-card-title text-ink shadow-cta hover:-translate-y-0.5 hover:bg-[#d9a12c] hover:shadow-[0_10px_16px_rgba(228,175,58,0.28)] active:translate-y-0 sm:px-8 sm:py-4",
  // White text over photos and moss: 19px bold counts as WCAG "large text", whose
  // AA minimum is 3:1, which white on moss (3.31:1) and over the scrimmed heroes
  // meets. At 18px it would need 4.5:1.
  "outline-light":
    "rounded-field border-2 border-bg px-5 py-3 text-[1.1875rem] text-bg hover:bg-bg/20 sm:px-8 sm:py-3.5",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function Button({
  children,
  variant = "accent",
  className = "",
  ...props
}: ButtonProps & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "accent",
  className = "",
  ...props
}: ButtonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
