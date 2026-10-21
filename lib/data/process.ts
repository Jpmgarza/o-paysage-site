import { SITE } from "@/lib/constants";

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Demande Initiale",
    description:
      "Vous décrivez vos besoins via notre formulaire en ligne ou simplement par un appel direct.",
  },
  {
    number: "02",
    title: "Prise de contact",
    description:
      `Nicolas vous recontacte personnellement ${SITE.replyTime} pour planifier une visite d'évaluation sur place.`,
  },
  {
    number: "03",
    title: "Chiffrage transparent",
    description:
      "Vous recevez un devis détaillé, clair, précis et totalement sans engagement de votre part.",
  },
  {
    number: "04",
    title: "Planification",
    description:
      "L'intervention est calée selon vos disponibilités et en tenant compte des saisons.",
  },
  {
    number: "05",
    title: "Espaces Verts Libérés",
    description:
      "Vous profitez d'un jardin magnifié avec un artisan dédié, garant d'un entretien impeccable.",
  },
];
