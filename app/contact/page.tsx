import { ContactSection } from "@/components/sections/ContactSection";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: `Devis paysagiste gratuit dans ${SITE.region}`,
  description: `Décrivez votre projet à Nicolas Descloux, paysagiste indépendant dans ${SITE.region}. Réponse ${SITE.replyTime}, devis gratuit et sans engagement, visite sur place.`,
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection title="Quelques infos, et Nicolas s'occupe du reste." submitLabel="Envoyer" />
    </>
  );
}
