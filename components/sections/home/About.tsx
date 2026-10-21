import { Award, Calendar, UserCheck } from "lucide-react";
import Image from "next/image";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";

type ValueProp = {
  icon: typeof UserCheck;
  title: string;
  description: string;
};

const VALUE_PROPS: ValueProp[] = [
  {
    icon: UserCheck,
    title: "Un seul interlocuteur",
    description:
      "De la demande de devis à la réalisation, vous échangez directement avec Nicolas.",
  },
  {
    icon: Award,
    title: "Une expertise éprouvée",
    description: `${SITE.yearsIndependent} ans d'activité en tant qu'indépendant, consacrés à l'entretien de jardins et aux petits chantiers ponctuels.`,
  },
  {
    icon: Calendar,
    title: "Une disponibilité sur mesure",
    description:
      "Contrats à l'année pour un suivi régulier, ou interventions ponctuelles selon vos besoins.",
  },
];

export function About() {
  return (
    <section id="a-propos" className="bg-bg py-16 lg:py-[100px]">
      <div className="container-page flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
          <div className="flex max-w-[580px] flex-col gap-6">
            <AnimatedHeadline
              text="Un paysagiste, une signature: la vôtre."
              className="text-[2rem] font-bold uppercase leading-[1.25] sm:text-[2.25rem] lg:text-heading-sm"
            />
            <Reveal as="p" delay={0.1} className="text-body leading-[1.67]">
              Chez Ô Paysage, pas d&apos;équipe qui tourne, pas d&apos;intermédiaire, pas de
              surprise. <strong className="font-bold">Nicolas Descloux</strong> s&apos;occupe
              personnellement de chaque intervention, du premier échange jusqu&apos;à la dernière
              finition, pour un jardin entretenu avec la même exigence à chaque visite.
            </Reveal>
            <Reveal as="p" delay={0.18} className="text-body leading-[1.67]">
              Avec{" "}
              <strong className="font-bold">
                {SITE.yearsIndependent} ans d&apos;expérience en tant qu&apos;indépendant
              </strong>
              ,
              Nicolas a fait le choix de travailler seul, à taille humaine, pour offrir
              un service que les grandes entreprises ne peuvent plus garantir : la disponibilité, la
              régularité et un contact direct avec la personne qui s&apos;occupe de votre espace
              vert.
            </Reveal>
          </div>

          <Reveal delay={0.2} className="w-full lg:max-w-[576px]">
            <div className="group relative aspect-[576/396] w-full overflow-hidden rounded-card shadow-photo transition-shadow duration-500 hover:shadow-photo-strong">
              <Image
                src="/images/nicolas-portrait.webp"
                alt="Portrait de Nicolas Descloux, fondateur d'Ô Paysage, en montagne, avec casquette et lunettes de soleil, une vallée verte en arrière-plan"
                fill
                sizes="(max-width: 1024px) 100vw, 576px"
                className="object-cover object-[center_58%] transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>

        <hr className="border-t border-ink/10" />

        <ul className="grid gap-10 md:grid-cols-3 lg:gap-10">
          {VALUE_PROPS.map((prop, index) => {
            const Icon = prop.icon;

            return (
              <Reveal as="li" key={prop.title} delay={0.1 * index} className="flex flex-col gap-4">
                <span className="flex size-12 items-center justify-center rounded-lg bg-moss-soft">
                  <Icon aria-hidden className="size-6 text-moss" />
                </span>
                <h3 className="text-card-title font-bold uppercase leading-[1.6]">{prop.title}</h3>
                <p className="text-base leading-[1.625]">{prop.description}</p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="flex justify-center">
          <ButtonLink href="/contact">Confier mon jardin à Nicolas</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
