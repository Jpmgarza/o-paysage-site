/** The year Nicolas started as an independent. */
const INDEPENDENT_SINCE = 2009;

export const SITE = {
  name: "Ô Paysage",
  owner: "Nicolas Descloux",
  /** Official firm name, as in the business register. He goes by "Ô Paysage"
   *  day to day, so `name` stays the brand and this is for the legal pages. */
  legalName: "Ô Paysage, Nicolas Descloux",
  tagline: "Paysagiste indépendant dans la Broye",
  /** The final production domain, fixed on purpose. Canonical tags, Open Graph,
   *  the sitemap and the structured data all point here whatever URL the site
   *  is actually served from (a *.vercel.app preview included), so a copy on
   *  another host can never claim to be the original. Not read from the
   *  environment: a variable set to the wrong host would silently break this. */
  url: "https://www.o-paysage.ch",
  phone: "+41 (0) 79 407 54 27",
  phoneHref: "tel:+41794075427",
  email: "opaysage.nd@gmail.com",
  address: "Rte du Château 19C, 1566 Saint-Aubin",
  /** Years of activity as an independent, shown in the hero counter and every
   *  "X ans d'expérience" line. Counted from the year he started (2009), so it
   *  goes up by itself each January: 17 in 2026, 18 in 2027. The pages are
   *  prerendered, so this is evaluated when they are built; the `revalidate`
   *  in app/layout.tsx rebuilds them daily so the new year shows without a
   *  redeploy. */
  yearsIndependent: new Date().getFullYear() - INDEPENDENT_SINCE,
  /** How fast he replies to a request, worded to follow "réponse " / "répond ".
   *  Every mention on the site reads this, so it only ever needs changing here. */
  replyTime: "sous 24 à 72h",
  /** Swiss business identification number, from the public UID register. */
  uid: "CHE-114.972.631",
  /** Coordinates of the address, from his Google Maps listing (addressMapUrl). */
  geo: { latitude: 46.888313, longitude: 6.982794 },
  addressMapUrl:
    "https://www.google.com/maps/place/%C3%94+Paysage/@46.888313,6.9802191,17z/data=!3m1!4b1!4m6!3m5!1s0x478e737d516b71df:0xdd86b6b9bd148165!8m2!3d46.888313!4d6.982794!16s%2Fg%2F11f_wm8n7f?entry=ttu&g_ep=EgoyMDI2MDkxNS4wIKXMDSoASAFQAw%3D%3D",
  /** Where he is based and mainly active; used as "dans {region}". He only
   *  travels to the regions of Fribourg and Neuchâtel occasionally. */
  region: "la Broye",
} as const;

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Comment ça marche", href: "/#processus" },
  { label: "A propos", href: "/#a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export const LEGAL_LINKS = [
  { label: "Mentions Légales", href: "/mentions-legales" },
  { label: "Données Personnelles", href: "/donnees-personnelles" },
] as const;

export const STUDIO_PWI_URL = "https://www.studiopwi.com";
