"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";

// Logo files from brand/logo-kit (vectors, so `unoptimized`: Next's image
// optimiser does not process SVG). The header floats over the first section:
// a photo on the home and Services pages, flat bg-moss on the others. The
// logo's hills are that same green, so on moss the all-white version is used.
const LOGO_WHITE = "/brand/logo-white.svg";
const LOGO_MONO_WHITE = "/brand/logo-mono-white.svg";
const LOGO_WIDTH = 125;
const LOGO_HEIGHT = 106;
// /contact also has a bg-moss hero but keeps the standard logo, by client
// choice, so the header looks the same as on the main pages.
const MOSS_HERO_PAGES = ["/mentions-legales", "/donnees-personnelles"];

export function Header() {
  const pathname = usePathname();
  const onMoss = MOSS_HERO_PAGES.includes(pathname);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container-page flex items-center justify-between gap-6 py-4 lg:py-8">
        <Link href="/" aria-label={`${SITE.name} — retour à l'accueil`} className="shrink-0">
          <Image
            src={onMoss ? LOGO_MONO_WHITE : LOGO_WHITE}
            alt={SITE.name}
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
            unoptimized
            // The standard logo's hills are the same green as bg-moss, so on the
            // contact hero they would disappear; a soft shadow lifts them off
            // it without tinting the section. The all-white logo needs none.
            className={`h-16 w-auto lg:h-[106px] ${
              onMoss ? "" : "drop-shadow-[0_1px_10px_rgba(28,28,26,0.25)]"
            }`}
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    // 19px bold is WCAG "large text" (AA minimum 3:1): white over the
                    // moss heroes is 3.31:1, enough at this size but not at 18px. The
                    // current page and hover are an underline, not gold, which is only
                    // 1.67:1 on moss.
                    className={`inline-flex min-h-11 items-center text-[1.1875rem] font-bold uppercase leading-[1.6] text-bg decoration-2 underline-offset-[6px] hover:underline ${
                      isActive ? "underline" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ButtonLink href="/contact" variant="outline-light" className="hidden lg:inline-flex">
          Contacter Nicolas
        </ButtonLink>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={isOpen}
          className="rounded-field border-2 border-bg p-2 text-bg lg:hidden"
        >
          <Menu aria-hidden className="size-6" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-moss lg:hidden"
          >
            <div className="container-page flex items-center justify-between py-4">
              <Image
                src={LOGO_MONO_WHITE}
                alt=""
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                unoptimized
                className="h-16 w-auto"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fermer le menu"
                className="rounded-field border-2 border-bg p-2 text-bg"
              >
                <X aria-hidden className="size-6" />
              </button>
            </div>

            <nav aria-label="Navigation principale" className="container-page mt-10">
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * index + 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className="inline-flex min-h-11 items-center text-[1.75rem] font-bold uppercase leading-tight text-bg"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <ButtonLink href="/contact" className="mt-10 w-full">
                Contacter Nicolas
              </ButtonLink>

              {/* Ink, not white: body-size white on moss is 3.31:1, under AA's 4.5:1. */}
              <div className="mt-10 flex flex-col items-start text-ink">
                <a href={SITE.phoneHref} className="inline-flex min-h-11 items-center text-body">
                  {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center text-body">
                  {SITE.email}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
