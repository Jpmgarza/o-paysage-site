import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

/**
 * Search-result lengths, checked by counting: titles 50-60 characters
 * *including* the " — Ô Paysage" the layout template appends (so a page's own
 * `title` is 38-48), descriptions 150-160. Several strings below insert site
 * settings (region, years, reply time), so recount if those change.
 */

// Search term first, brand last: nobody searches for "Ô Paysage" yet.
export const HOME_TITLE = `Paysagiste dans ${SITE.region}, Saint-Aubin FR — ${SITE.name}`;

export const HOME_DESCRIPTION = `Nicolas Descloux, paysagiste indépendant dans ${SITE.region} depuis ${SITE.yearsIndependent} ans : entretien de jardins, contrats annuels, petits chantiers et débarras. Devis gratuit.`;

/**
 * The image shown when a link is shared (WhatsApp, Facebook, LinkedIn, X...):
 * the hero photo cropped to 1200x630, with the white logo added. Made from
 * `hero-home.webp` and brand/logo-kit/master-png/logo-white.png; JPG because social apps do not read
 * WebP reliably. Like every URL in metadata it resolves against the production
 * domain, so it is served from there once the site is live.
 */
export const SHARE_IMAGE = {
  url: "/images/og-share.jpg",
  width: 1200,
  height: 630,
  alt: "Le logo Ô Paysage sur un paysage de colline verte, avec un chemin sinueux, un arbre doré et une montagne enneigée",
};

type PageSeo = {
  /** Path of the page, e.g. "/contact": used for the canonical and og:url. */
  path: string;
  description: string;
  /** Page-specific part of the title; the layout adds " — Ô Paysage". */
  title?: string;
  /** A complete title, used as-is (the home page, which has no suffix). */
  absoluteTitle?: string;
  noindex?: boolean;
};

/**
 * Everything one page needs for search and sharing, in one call, so the title,
 * description, canonical and Open Graph tags cannot drift apart.
 *
 * Next.js *replaces* a page's `openGraph` object instead of merging it into
 * the layout's, so the shared fields (type, locale, site name) are repeated
 * here rather than left to be inherited.
 */
export function pageMetadata({
  path,
  description,
  title,
  absoluteTitle,
  noindex = false,
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ?? `${title} — ${SITE.name}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      locale: "fr_CH",
      siteName: SITE.name,
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    // X/Twitter does not derive its card from Open Graph, and defaults to a
    // small one, so it is set explicitly here.
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
