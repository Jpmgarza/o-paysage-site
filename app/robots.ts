import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE } from "@/lib/constants";

// Read per request, not at build time: the answer depends on the address the
// site is being visited at.
export const dynamic = "force-dynamic";

const PRODUCTION_HOST = new URL(SITE.url).hostname.replace(/^www\./, "");

/**
 * Only the site on its real domain may be crawled: a copy indexed next to the
 * client's own domain (a *.vercel.app preview, a temporary hosting address,
 * localhost) is very hard to undo afterwards. So crawling is allowed exactly
 * when the request comes in on o-paysage.ch or www.o-paysage.ch, which needs no
 * environment variable and so works the same on any host.
 *
 * The forwarded host is read first: behind a reverse proxy (as on Infomaniak)
 * the Host header can be the proxy's internal address instead of the domain.
 */
export default function robots(): MetadataRoute.Robots {
  const requestHeaders = headers();
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "")
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "")
    .replace(/^www\./, "");

  if (host !== PRODUCTION_HOST) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
