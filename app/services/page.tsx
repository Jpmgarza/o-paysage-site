import { ServicePanel } from "@/components/sections/services/ServicePanel";
import { ServicesCta } from "@/components/sections/services/ServicesCta";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { SITE } from "@/lib/constants";
import { SERVICES } from "@/lib/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services",
  title: `Entretien de jardin et paysagisme dans ${SITE.region}`,
  description: `Entretien de jardins, contrats annuels, petits chantiers, régies et débarras : les cinq services de Nicolas Descloux, paysagiste indépendant dans ${SITE.region}.`,
});

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <div id="prestations">
        {SERVICES.map((service, index) => (
          <ServicePanel key={service.slug} service={service} index={index} />
        ))}
      </div>
      <ServicesCta />
    </>
  );
}
