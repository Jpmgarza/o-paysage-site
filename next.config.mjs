// Next.js evaluates strings for React Refresh in development only.
const scriptSrc =
  process.env.NODE_ENV === "development"
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimised images are otherwise cached for 60 seconds only. A week, not a
  // year: photos are replaced in place under the same name (see the colour
  // grading notes), and a visitor's cached copy should not outlive that long.
  images: { minimumCacheTTL: 604800 },
  async redirects() {
    // www.o-paysage.ch serves the same site (an Infomaniak alias); send it to
    // the bare domain, the canonical one (SITE.url). Matched on the forwarded
    // host as well as Host, since the Infomaniak proxy may rewrite Host — if
    // neither carries www, the rule simply does not fire.
    const toBareDomain = { destination: "https://o-paysage.ch/:path*", permanent: true };
    return [
      { source: "/:path*", has: [{ type: "host", value: "www\\.o-paysage\\.ch" }], ...toBareDomain },
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-host", value: "www\\.o-paysage\\.ch" }],
        ...toBareDomain,
      },
      // The Réalisations page was replaced by Services; old links land there.
      { source: "/realisations", destination: "/services", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              scriptSrc,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
