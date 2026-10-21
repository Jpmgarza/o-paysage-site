import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

// Web app manifest: name and icons used when the site is added to a phone's
// home screen. Icons come from brand/logo-kit (see CLAUDE.md, "Logo").
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: SITE.name,
    start_url: "/",
    display: "standalone",
    background_color: "#fefefe",
    theme_color: "#849443",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
