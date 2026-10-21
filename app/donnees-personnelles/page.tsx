import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/donnees-personnelles",
  title: "Données personnelles : traitement et vos droits",
  description: `Comment ${SITE.name} traite les données transmises via le formulaire de contact : responsable du traitement, finalité, conservation, anti-spam et vos droits.`,
  noindex: true,
});

export default function DonneesPersonnellesPage() {
  return (
    <>
      <section className="bg-moss pb-12 pt-32 lg:pb-16 lg:pt-[200px]">
        <div className="container-page">
          <h1 className="section-heading text-bg">Données personnelles</h1>
        </div>
      </section>

      <section className="bg-bg py-12 lg:py-16">
        <div className="container-page flex max-w-[760px] flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-card-title font-bold uppercase">Responsable du traitement</h2>
            <p className="text-body">
              {SITE.legalName} — entreprise individuelle, paysagiste indépendant.
              <br />
              {SITE.address}, Suisse.
              <br />
              Téléphone : {SITE.phone} · E-mail : {SITE.email}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-card-title font-bold uppercase">Données collectées</h2>
            <p className="text-body">
              Le formulaire de contact recueille uniquement les informations nécessaires au
              traitement de votre demande : nom, adresse e-mail, numéro de téléphone (facultatif),
              service concerné et description de votre projet.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-card-title font-bold uppercase">Finalité</h2>
            <p className="text-body">
              Ces données servent exclusivement à vous répondre, à préparer une visite sur place et
              à établir un devis. Elles ne sont ni revendues, ni transmises à des tiers à des fins
              commerciales.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-card-title font-bold uppercase">Conservation</h2>
            <p className="text-body">
              Les demandes sont conservées le temps nécessaire au suivi de la relation client, puis
              supprimées. Aucun profilage ni décision automatisée n&apos;est effectué.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-card-title font-bold uppercase">Mesures anti-spam</h2>
            <p className="text-body">
              Afin de limiter les envois automatisés, le formulaire utilise un champ masqué et une
              limitation du nombre d&apos;envois par adresse IP. Aucune donnée de navigation
              n&apos;est exploitée à d&apos;autres fins.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-card-title font-bold uppercase">Vos droits</h2>
            <p className="text-body">
              Vous pouvez demander à tout moment l&apos;accès, la rectification ou la suppression
              des données vous concernant en écrivant à {SITE.email}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
