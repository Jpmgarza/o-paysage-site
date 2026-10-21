import { SITE } from "@/lib/constants";
import { SERVICES } from "@/lib/data/services";

const BUSINESS_ID = `${SITE.url}/#business`;

const business = {
  // HomeAndConstructionBusiness is the schema.org LocalBusiness subtype closest
  // to landscaping; LocalBusiness is kept alongside for tools that only know it.
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": BUSINESS_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  image: `${SITE.url}/images/og-share.jpg`,
  logo: `${SITE.url}/icons/icon-512.png`,
  description:
    "Paysagiste indépendant dans la Broye, actif ponctuellement dans les régions de Fribourg et de Neuchâtel : entretien de jardins, contrats d'entretien annuel, petits chantiers extérieurs, entretien pour régies et petit débarras.",
  // E.164, the form search engines expect, rather than the display format.
  telephone: SITE.phoneHref.replace("tel:", ""),
  email: SITE.email,
  founder: { "@type": "Person", name: SITE.owner },
  foundingDate: "2009",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rte du Château 19C",
    postalCode: "1566",
    addressLocality: "Saint-Aubin",
    addressRegion: "FR",
    addressCountry: "CH",
  },
  geo: { "@type": "GeoCoordinates", ...SITE.geo },
  hasMap: SITE.addressMapUrl,
  // The Broye is where he is based and mainly works; the other two are
  // occasional. Listed in that order.
  areaServed: [
    { "@type": "AdministrativeArea", name: "Broye" },
    { "@type": "AdministrativeArea", name: "Région de Fribourg" },
    { "@type": "AdministrativeArea", name: "Région de Neuchâtel" },
  ],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.page.title,
        description: service.page.paragraphs.join(" "),
        url: `${SITE.url}/services#${service.slug}`,
      },
    })),
  },
  // Still to add once confirmed with Nicolas: sameAs (his public Google
  // Business profile URL) and openingHoursSpecification.
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  inLanguage: "fr-CH",
  publisher: { "@id": BUSINESS_ID },
};

/**
 * Rendered as a plain <script> so the JSON-LD is in the server HTML: a
 * next/script <Script> injects it only after hydration, which crawlers that do
 * not run JavaScript (most AI crawlers, many SEO tools) never see.
 *
 * dangerouslySetInnerHTML is the pattern the Next.js docs give for JSON-LD, and
 * is safe here: `data` only ever holds the site's own constants, never user
 * input, and escaping "<" means nothing in it can close the script tag early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function StructuredData() {
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": [business, website] }} />;
}
