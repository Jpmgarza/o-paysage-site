import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/mentions-legales",
  title: "Mentions légales : éditeur et responsabilité",
  description: `Mentions légales du site ${SITE.name} : éditeur ${SITE.owner}, entreprise individuelle à Saint-Aubin, numéro IDE, propriété intellectuelle et responsabilité.`,
  noindex: true,
});

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="bg-moss pb-12 pt-32 lg:pb-16 lg:pt-[200px]">
        <div className="container-page">
          <h1 className="section-heading text-bg">Mentions légales</h1>
        </div>
      </section>

      <section className="bg-bg py-12 lg:py-16">
        <div className="container-page flex max-w-[760px] flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-card-title font-bold uppercase">Éditeur du site</h2>
            <p className="text-body">
              {SITE.legalName} — entreprise individuelle, paysagiste indépendant.
              <br />
              {SITE.address}, Suisse.
              <br />
              Téléphone : {SITE.phone} · E-mail : {SITE.email}
              <br />
              Numéro d&apos;identification des entreprises (IDE/UID) : {SITE.uid}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-card-title font-bold uppercase">Responsable de publication</h2>
            <p className="text-body">{SITE.owner}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-card-title font-bold uppercase">Propriété intellectuelle</h2>
            <p className="text-body">
              L&apos;ensemble des contenus de ce site (textes, photographies, logo et éléments
              graphiques) est la propriété de {SITE.name}, sauf mention contraire. Toute
              reproduction ou diffusion sans autorisation écrite préalable est interdite.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-card-title font-bold uppercase">Responsabilité</h2>
            <p className="text-body">
              Les informations publiées sur ce site sont fournies à titre indicatif et peuvent être
              modifiées à tout moment. Elles ne constituent pas une offre contractuelle : seul un
              devis établi après visite sur place engage {SITE.name}.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-card-title font-bold uppercase">Conception et hébergement</h2>
            <p className="text-body">
              Site conçu et réalisé par Studio PWI. Les coordonnées de l&apos;hébergeur sont
              communiquées sur simple demande à {SITE.email}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
