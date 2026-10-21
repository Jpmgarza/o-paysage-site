import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    // With the trailing slash, to match the home page's canonical tag.
    { url: `${SITE.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE.url}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${SITE.url}/contact`, lastModified, changeFrequency: "yearly", priority: 0.9 },
    // The two legal pages are deliberately left out: they are marked noindex,
    // and a sitemap should only list pages that are meant to be indexed.
  ];
}
