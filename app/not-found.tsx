import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// Next marks this page noindex and serves it with a 404 status by itself.
export const metadata: Metadata = {
  title: "Page introuvable",
};

// Ink on moss throughout except the large h1: white body text on moss is 3.31:1,
// under the 4.5:1 WCAG AA asks; ink is 5.12:1.
const textLink =
  "inline-flex min-h-11 items-center text-body text-ink underline underline-offset-4 hover:decoration-2";

export default function NotFound() {
  return (
    // bg-moss like /contact, so the floating header's white logo stays legible.
    <section className="bg-moss pb-20 pt-32 lg:pb-[120px] lg:pt-[200px]">
      <div className="container-page">
        <div className="flex max-w-[737px] flex-col items-start gap-6">
          <p className="text-card-title font-bold uppercase tracking-[1.5px] text-ink">Erreur 404</p>
          <h1 className="text-[2.25rem] font-bold uppercase leading-[1.15] text-bg sm:text-[2.75rem] lg:text-[clamp(2.75rem,4.375vw,3.5rem)]">
            Cette page n&apos;existe pas
          </h1>
          <p className="max-w-[65ch] text-body text-ink">
            Le lien est peut-être ancien, ou l&apos;adresse contient une faute de frappe. Voici où
            trouver ce que vous cherchez.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
            <Link href="/services" className={textLink}>
              Nos services
            </Link>
            <Link href="/contact" className={textLink}>
              Contacter {SITE.owner.split(" ")[0]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
