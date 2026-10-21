import { SITE } from "@/lib/constants";

export type FaqItem = {
  question: string;
  /** The client's answer, verbatim. */
  answer: string;
  /** A link shown under the answer, to the service it is about. */
  link?: { href: string; label: string };
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Combien coûte un entretien de jardin ?",
    answer:
      "Chaque jardin est différent. Le prix dépend de la surface et de la fréquence souhaitée — le devis sur place est gratuit et sans engagement.",
  },
  {
    question: "Intervenez-vous aussi pour les entreprises et les régies ?",
    answer:
      "Oui, directement. Aucun intermédiaire : vous traitez toujours avec Nicolas lui-même, du premier contact au suivi annuel.",
    link: { href: "/services#regies-promoteurs", label: "Entretien pour régies et promoteurs" },
  },
  {
    question: "Combien de temps faut-il pour obtenir un rendez-vous ?",
    answer: `Une réponse ${SITE.replyTime}, et une visite sur place généralement dans la semaine.`,
  },
  {
    question: "Proposez-vous des contrats d'entretien à l'année ?",
    answer:
      "Oui, c'est même la formule privilégiée pour garder un jardin impeccable sans y repenser à chaque saison.",
    link: { href: "/services#contrats-entretien-annuel", label: "Contrats d'entretien annuel" },
  },
  {
    question: "Dans quelle zone intervenez-vous ?",
    answer:
      "Principalement dans la Broye, et ponctuellement dans les régions de Fribourg et de Neuchâtel.",
  },
  {
    question: "Travaillez-vous aussi en sous-traitance pour des entreprises de paysagisme ?",
    answer:
      "Oui, ponctuellement, sur des projets qui demandent un renfort supplémentaire. Contactez directement pour en discuter.",
  },
];
