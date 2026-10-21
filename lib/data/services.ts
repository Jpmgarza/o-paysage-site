export type ServiceImage = {
  src: string;
  /** Describes what the photo shows — not the service name, which is printed next to it. */
  alt: string;
};

export type Service = {
  /** Also the anchor of its panel on /services, which the home cards link to. */
  slug: string;
  /** Short name on the home card. */
  title: string;
  /** One line on the home card. */
  description: string;
  image: ServiceImage;
  /** Moss-filled home card — used as a visual accent in the row. */
  featured?: boolean;
  /** The service's panel on /services. */
  page: {
    title: string;
    paragraphs: string[];
    /** Sentence on the moss card laid over the photo. */
    highlight: string;
    ctaLabel: string;
    /** A wide second photo under the first; the panel then shows the two
     *  photos and the moss card as a mosaic instead of one overlaid photo. */
    wideImage?: ServiceImage;
  };
};

const PETITS_CHANTIERS: Service = {
  slug: "petits-chantiers-exterieurs",
  title: "Petits chantiers extérieurs",
  description:
    "Vos aménagements ponctuels réalisés par un seul professionnel, sans sous-traitance.",
  image: {
    src: "/images/service-petits-chantiers.webp",
    alt: "Coin repos circulaire en gravier avec table et chaises en fer forgé, bacs surélevés en bois et massifs plantés",
  },
  page: {
    title: "Petits chantiers extérieurs",
    paragraphs: [
      "Création de bordures, massifs, petits dallages ou aménagements ponctuels.",
      "Un seul professionnel du début à la fin, sans sous-traitance ni intermédiaire.",
    ],
    highlight:
      "Vos aménagements ponctuels réalisés par un seul professionnel, sans sous-traitance.",
    ctaLabel: "Parlons de mon chantier",
    wideImage: {
      src: "/images/service-petits-chantiers-piscine.webp",
      alt: "Abords de piscine aménagés en gravier clair, avec pas japonais, rochers et touffes de graminées",
    },
  },
};

const ENTRETIEN_JARDINS: Service = {
  slug: "entretien-jardins",
  title: "Entretien de jardins",
  description: "Tonte de pelouse, scarification, nettoyage des massifs et désherbage écologique.",
  image: {
    src: "/images/service-entretien-jardins.webp",
    alt: "Massif de lavande, marguerites et graminées au bord d'une pelouse, avec un arrosoir et un sécateur posés sur un muret en pierre",
  },
  featured: true,
  page: {
    title: "Entretien de jardins",
    paragraphs: [
      "Tonte de pelouse, taille des haies et arbustes, désherbage des massifs et ramassage des déchets verts.",
      "Passage régulier selon la fréquence choisie, avec un seul contact pour tout ajustement.",
    ],
    highlight: "Un jardin propre toute l'année, sans y penser.",
    ctaLabel: "Planifier mon entretien",
  },
};

const CONTRATS_ENTRETIEN: Service = {
  slug: "contrats-entretien-annuel",
  title: "Contrats d'entretien annuel",
  description:
    "La formule idéale pour s'assurer d'un jardin impeccable tout au long des quatre saisons.",
  image: {
    src: "/images/service-contrats-entretien.webp",
    alt: "Grande pelouse tondue traversée d'une allée de gravier courbe, bordée de massifs et d'arbres",
  },
  featured: true,
  page: {
    title: "Contrats d'entretien annuel",
    paragraphs: [
      "Tonte, scarification, nettoyage des massifs et désherbage, selon les saisons.",
      "Un passage régulier à fréquence fixe, avec un seul interlocuteur et un tarif annuel clair.",
    ],
    highlight:
      "La formule idéale pour s'assurer d'un jardin impeccable tout au long des quatre saisons.",
    ctaLabel: "Parler de mon contrat annuel",
  },
};

const REGIES_PROMOTEURS: Service = {
  slug: "regies-promoteurs",
  title: "Régies & Promoteurs",
  description:
    "Un interlocuteur unique pour tous vos biens, sans jongler entre plusieurs prestataires.",
  image: {
    src: "/images/service-regies-promoteurs.webp",
    alt: "Pelouse entretenue devant une maison, longée d'une haie taillée et d'une allée de gravier, avec le lac en arrière-plan",
  },
  page: {
    title: "Entretien pour régies et promoteurs",
    paragraphs: [
      "Entretien des espaces verts communs, taille et suivi régulier sur un ou plusieurs biens.",
      "Un contrat-cadre avec un seul interlocuteur, quel que soit le nombre de sites à gérer.",
    ],
    highlight:
      "Un prestataire fiable pour tous vos biens, sans jongler entre plusieurs entreprises.",
    ctaLabel: "Parlons de vos biens",
  },
};

const PETIT_DEBARRAS: Service = {
  slug: "petit-debarras-exterieur",
  title: "Petit débarras extérieur",
  description: "Un terrain dégagé rapidement, sans que vous ayez à vous en occuper.",
  image: {
    src: "/images/service-petit-debarras.webp",
    alt: "Cabanon en bois devant une cour en gravier, à côté d'une remorque chargée de déchets verts",
  },
  page: {
    title: "Petit débarras extérieur",
    paragraphs: [
      "Évacuation de déchets verts, branches, ou encombrants extérieurs légers.",
      "Une intervention ponctuelle, terrain nettoyé en une visite.",
    ],
    highlight: "Un terrain dégagé rapidement, sans que vous ayez à vous en occuper.",
    ctaLabel: "Planifier mon débarras",
  },
};

/** Order of the panels on /services, as in Figma. */
export const SERVICES: Service[] = [
  PETITS_CHANTIERS,
  ENTRETIEN_JARDINS,
  CONTRATS_ENTRETIEN,
  REGIES_PROMOTEURS,
  PETIT_DEBARRAS,
];

/** Order of the cards in the home page's scrolling row, as in Figma. */
export const HOME_SERVICES: Service[] = [
  CONTRATS_ENTRETIEN,
  PETITS_CHANTIERS,
  REGIES_PROMOTEURS,
  PETIT_DEBARRAS,
  ENTRETIEN_JARDINS,
];
