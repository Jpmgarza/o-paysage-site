import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        moss: {
          DEFAULT: "rgb(var(--color-moss) / <alpha-value>)",
          // Fixed 15% tint used for icon chips — same channel, different default alpha.
          soft: "rgb(var(--color-moss-soft) / 0.15)",
          // For text on light backgrounds (4.54:1 on white); see globals.css.
          dark: "rgb(var(--color-moss-dark) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-lato)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Raised from Figma's 11px and 14px in responsive QA: nothing on the
        // site renders under 12px, and running copy is at least 16px.
        caption: ["0.875rem", { lineHeight: "1.375rem" }],
        "card-body": ["1rem", { lineHeight: "1.625rem" }],
        label: ["0.875rem", { lineHeight: "1.25rem" }],
        body: ["1.125rem", { lineHeight: "1.8125rem" }],
        "card-title": ["1.125rem", { lineHeight: "1.3125rem" }],
        quote: ["1.8125rem", { lineHeight: "2.5625rem" }],
        stat: ["3rem", { lineHeight: "1.1" }],
        "heading-sm": ["2.625rem", { lineHeight: "3.25rem" }],
        heading: ["2.9375rem", { lineHeight: "3.8125rem" }],
        display: ["3.5rem", { lineHeight: "4.25rem" }],
      },
      borderRadius: {
        card: "1rem",
        field: "0.625rem",
        step: "0.75rem",
      },
      boxShadow: {
        cta: "0 6px 8px rgba(228, 175, 58, 0.2)",
        card: "8px 8px 10px rgba(28, 28, 26, 0.1)",
        "card-strong": "8px 8px 10px rgba(28, 28, 26, 0.15)",
        bento: "8px 8px 10px rgba(28, 28, 26, 0.3)",
        "bento-soft": "4px 8px 5px rgba(132, 148, 67, 0.15)",
        photo: "8px 8px 20px rgba(28, 28, 26, 0.15)",
        "photo-strong": "8px 8px 20px rgba(28, 28, 26, 0.2)",
      },
      maxWidth: {
        page: "1440px",
      },
      keyframes: {
        // A slide without a fade: text that starts at opacity 0 is not counted
        // as painted until it shows, which measured ~0.4s later LCP on a
        // throttled phone than sliding fully opaque text.
        rise: {
          from: { transform: "translateY(16px)" },
          to: { transform: "none" },
        },
      },
      animation: {
        // Hero entrance in plain CSS: it starts with the first paint instead of
        // waiting for JavaScript, unlike Reveal, so the hero's largest text is
        // not held invisible until hydration (that pushed phone LCP past 4s).
        rise: "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      backgroundImage: {
        scrim:
          "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.45) 100%)",
        // Bottom-up shade added under hero text where the side scrim alone left
        // it under WCAG AA (bright sky or white walls behind the words).
        "hero-shade":
          "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.1) 100%)",
        "scrim-flipped":
          "linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.45) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
