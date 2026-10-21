export type Problem = {
  number: string;
  title: string;
  description: string;
  /** Renders the offset moss plate behind the card. */
  highlighted?: boolean;
};

export const PROBLEMS: Problem[] = [
  {
    number: "01",
    title: "Le conflit de voisinage",
    description: "C'est une haie qui déborde chez le voisin.",
    highlighted: true,
  },
  {
    number: "02",
    title: "Le temps perdu",
    description: "Une pelouse qui jaunit pendant que vous cherchez du temps le week-end.",
  },
  {
    number: "03",
    title: "La facture qui grimpe",
    description:
      "Chaque mois sans entretien, la remise en état coûte plus cher. Un jardin à l'abandon fait aussi baisser la valeur perçue d'un bien.",
  },
  {
    number: "04",
    title: "Le manque de suivi",
    description:
      "Confier son jardin à plusieurs prestataires différents, ou changer d'entreprise chaque année, fait perdre du temps et de la cohérence dans le suivi.",
    highlighted: true,
  },
];
