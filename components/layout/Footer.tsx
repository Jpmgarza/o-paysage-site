import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FOOTER_NAV_LINKS, LEGAL_LINKS, SITE, STUDIO_PWI_URL } from "@/lib/constants";

const columnTitle = "text-[0.9375rem] font-black uppercase";
// Hover in moss-dark (4.54:1 on white): plain moss is 3.31:1, under AA for 14px text.
const linkClass = "text-caption transition-colors hover:text-moss-dark";
// 44px-tall rows so every footer link is a full touch target; the lists that
// hold them use no gap, the row height provides the spacing.
const hitArea = "inline-flex min-h-11 min-w-11 items-center";

export function Footer() {
  return (
    <footer className="border-t-2 border-accent bg-bg">
      <div className="container-page flex flex-col gap-12 pb-10 pt-16 lg:gap-16 lg:pt-20">
        <div className="flex flex-col gap-10 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-[380px] flex-col gap-2">
            <Image
              src="/brand/logo-color.svg"
              alt={`${SITE.name} — ${SITE.owner}`}
              width={125}
              height={106}
              unoptimized
              // self-start: this column flex container would otherwise stretch
              // the logo to the column's full width while h-[106px] pins its
              // height, squashing the artwork.
              className="h-[106px] w-auto self-start"
            />
            <p className="text-body leading-[1.5]">
              {SITE.yearsIndependent} ans d&apos;expérience en tant qu&apos;indépendant au service de votre jardin. Un
              seul prestataire dédié pour un suivi impeccable et régulier dans {SITE.region}.
            </p>
          </div>

          <nav aria-label="Navigation du pied de page" className="flex flex-col gap-1">
            <h2 className={columnTitle}>Navigation</h2>
            <ul className="flex flex-col">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`${hitArea} ${linkClass}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-1">
            <h2 className={columnTitle}>Coordonnées</h2>
            <ul className="flex flex-col">
              <li>
                <a href={SITE.phoneHref} className="flex min-h-11 items-center gap-2">
                  <span className="flex size-[26px] items-center justify-center rounded-full bg-moss-soft">
                    <Phone aria-hidden className="size-3.5 text-moss" />
                  </span>
                  <span className={linkClass}>{SITE.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex min-h-11 items-center gap-2">
                  <span className="flex size-[26px] items-center justify-center rounded-full bg-moss-soft">
                    <Mail aria-hidden className="size-3.5 text-moss" />
                  </span>
                  <span className={linkClass}>{SITE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.addressMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2"
                >
                  <span className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-moss-soft">
                    <MapPin aria-hidden className="size-3.5 text-moss" />
                  </span>
                  <span className={linkClass}>{SITE.address}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className={columnTitle}>Légal</h2>
            <ul className="flex flex-col">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`${hitArea} ${linkClass}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t-[2.5px] border-accent pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption">
            © {new Date().getFullYear()} {SITE.name} · {SITE.owner}. Tous droits réservés.
          </p>
          <a
            href={STUDIO_PWI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${hitArea} ${linkClass}`}
          >
            Conçu par Studio PWI
          </a>
        </div>
      </div>
    </footer>
  );
}
