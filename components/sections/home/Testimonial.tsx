import Image from "next/image";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";
import { TESTIMONIAL_TERRASSE } from "@/lib/data/testimonials";

export function Testimonial() {
  return (
    <section className="bg-bg py-16 lg:py-[100px]">
      <div className="container-page flex flex-col gap-10 lg:gap-16">
        <AnimatedHeadline
          text="Ils lui confient déjà leur jardin"
          className="section-heading max-w-[543px]"
        />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[107px]">
          <figure className="flex max-w-[519px] flex-col gap-2">
            <StarRating animated />
            <blockquote className="text-[1.375rem] leading-[1.45] sm:text-[1.625rem] lg:text-quote">
              {TESTIMONIAL_TERRASSE.quote}
            </blockquote>
            <figcaption className="text-body text-moss-dark">
              {TESTIMONIAL_TERRASSE.author}
            </figcaption>
          </figure>

          <Reveal delay={0.15} className="w-full lg:max-w-[611px]">
            <div className="relative w-full pb-8 pr-8">
              <div
                aria-hidden
                className="absolute bottom-0 right-0 h-[calc(100%-2.25rem)] w-[calc(100%-2.5rem)] rounded-card bg-moss"
              />
              <div className="relative aspect-[576/396] w-full overflow-hidden rounded-card shadow-photo-strong transition-transform duration-300 ease-out hover:-translate-y-2">
                <Image
                  src="/images/terrasse-gres-cerame.webp"
                  alt="Terrasse en grès cérame posée par Ô Paysage devant une maison blanche à store banne, bordée d'une pelouse"
                  fill
                  sizes="(max-width: 1024px) 100vw, 576px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <ButtonLink href="/services">Voir nos services</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
