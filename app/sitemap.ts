import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified: the only date available is the build's, which changes on
  // every daily revalidation whether or not the page did, and Google ignores
  // a lastmod it finds to be unreliable.
  return [
    // With the trailing slash, to match the home page's canonical tag.
    { url: `${SITE.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/contact`, changeFrequency: "yearly", priority: 0.9 },
    // The two legal pages are deliberately left out: they are marked noindex,
    // and a sitemap should only list pages that are meant to be indexed.
  ];
}
