import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StructuredData } from "@/components/misc/StructuredData";
import { SITE } from "@/lib/constants";
import { HOME_DESCRIPTION, HOME_TITLE, SHARE_IMAGE } from "@/lib/seo";
import "@/styles/globals.css";

// Rebuild every page at most once a day (on the first visit after a day has
// passed), so year-based figures — SITE.yearsIndependent, the footer's
// copyright year — roll over on 1 January without a redeploy.
export const revalidate = 86400;

// Self-hosted (Lato's latin subset, which covers French), not next/font/google:
// in Next 14 the generated class name is hashed partly from the stylesheet Google
// returns at build time, and the server and client halves of one build fetch it
// separately. When the two answers differed, the page asked for one class while
// the CSS defined another, and the whole site fell back to Times New Roman (seen
// on Vercel, October 2026). Local files make the hash deterministic.
const lato = localFont({
  src: [
    { path: "./fonts/lato-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/lato-latin-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/lato-latin-900.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // Fallbacks only. Every page sets its own title, description, canonical and
  // Open Graph through pageMetadata() in lib/seo.ts; these apply to the 404
  // page and to any page added later that forgets to.
  title: {
    default: HOME_TITLE,
    template: `%s — ${SITE.name}`,
  },
  description: HOME_DESCRIPTION,
  keywords: [
    "paysagiste Broye",
    "paysagiste Saint-Aubin",
    "entretien de jardin Broye",
    "paysagiste Fribourg",
    "paysagiste Neuchâtel",
    "contrat d'entretien annuel",
    "petits chantiers extérieurs",
    "débarras extérieur",
    "régies immobilières espaces verts",
  ],
  openGraph: {
    type: "website",
    locale: "fr_CH",
    siteName: SITE.name,
    // No `url`: a fixed one here would name the homepage on every page that
    // falls back to this object. Pages set their own via pageMetadata().
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CH" className={lato.variable}>
      <body className="font-sans antialiased">
        {/* Scroll reveals start transparent (or, for SVG line-draw
         * animations, pathLength:0) — without JS they would never reach
         * their visible/fully-drawn state. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;stroke-dasharray:none!important;stroke-dashoffset:0!important}`}</style>
        </noscript>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-field focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <StructuredData />
      </body>
    </html>
  );
}
