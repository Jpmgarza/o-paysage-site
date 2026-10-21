import { SITE } from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/data/faq";
import { SERVICES } from "@/lib/data/services";

// Rebuilt daily like the pages, so the years figure stays current.
export const revalidate = 86400;

/**
 * /llms.txt (llmstxt.org): a plain-text summary of the business for AI
 * assistants. Built from the same data as the pages, so it cannot drift from
 * them; only the framing sentences live here.
 */
export function GET() {
  const services = SERVICES.map(
    (service) =>
      `- [${service.page.title}](${SITE.url}/services#${service.slug}): ${service.page.paragraphs.join(" ")}`,
  ).join("\n");
  const faq = FAQ_ITEMS.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n");

  const body = `# ${SITE.name}

> ${SITE.name} est l'entreprise de ${SITE.owner}, paysagiste indépendant depuis ${SITE.yearsIndependent} ans, basé à Saint-Aubin (FR), actif principalement dans ${SITE.region} et ponctuellement dans les régions de Fribourg et de Neuchâtel. Un seul interlocuteur du devis à la réalisation. Devis gratuit, réponse ${SITE.replyTime}.

## Contact

- Téléphone : ${SITE.phone}
- E-mail : ${SITE.email}
- Adresse : ${SITE.address}
- Formulaire de demande : ${SITE.url}/contact

## Services

${services}

## Questions fréquentes

${faq}

## Pages

- [Accueil](${SITE.url}/)
- [Services](${SITE.url}/services)
- [Contact et devis](${SITE.url}/contact)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
