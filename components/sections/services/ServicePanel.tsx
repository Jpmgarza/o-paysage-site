import Image from "next/image";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { Service } from "@/lib/data/services";

// Ink on moss (5.12:1): Figma's white is 3.31:1, under the 4.5:1 WCAG AA asks of
// 18px text, bold or not.
const highlightClass =
  "rounded-card bg-moss p-6 text-body font-black tracking-[0.5px] text-ink shadow-card-strong sm:p-8";

/** One photo with the moss card overlapping its bottom edge, centred. The
 *  overlap is a negative margin, not a transform, so it survives the noscript
 *  `transform:none` rule on the Reveal wrapper. */
function OverlaidPhoto({ service }: { service: Service }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative aspect-[737/539] w-full overflow-hidden rounded-card">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 64px), 737px"
          className="object-cover"
        />
      </div>
      <p className={`relative -mt-12 w-[calc(100%-2rem)] max-w-[410px] text-center sm:-mt-[76px] ${highlightClass}`}>
        {service.page.highlight}
      </p>
    </div>
  );
}

/** Petits chantiers: a small photo beside the moss card, a wide photo below. */
function PhotoMosaic({ service }: { service: Service }) {
  const wide = service.page.wideImage!;

  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6">
      <div className="grid gap-4 sm:grid-cols-[354fr_359fr] sm:gap-6">
        <div className="relative aspect-[354/215] overflow-hidden rounded-card">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            // Half the row from sm, less the page gutters and the 24px gap.
            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(50vw - 44px), 354px"
            className="object-cover"
          />
        </div>
        <p className={`flex items-center ${highlightClass}`}>{service.page.highlight}</p>
      </div>
      <div className="relative aspect-[737/319] overflow-hidden rounded-card">
        <Image
          src={wide.src}
          alt={wide.alt}
          fill
          sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 64px), 737px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function ServicePanel({ service, index }: { service: Service; index: number }) {
  // Figma alternates the sides, starting with the text on the left. On small
  // screens the text always comes first, then the photos.
  const photoFirst = index % 2 === 1;

  return (
    <section id={service.slug} className="bg-bg py-16 lg:py-[120px]">
      <div className="container-page flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-6">
        <div
          // 519px beside a 737px photo at 1440, as in Figma; a share of the row
          // at 1024, where 519px would leave the photo under 400px.
          className={`flex flex-col items-start gap-6 lg:w-[40%] lg:shrink-0 lg:gap-8 xl:w-[519px] ${
            photoFirst ? "lg:order-2" : ""
          }`}
        >
          <AnimatedHeadline text={service.page.title} className="section-heading" />
          <Reveal delay={0.1} className="flex max-w-[65ch] flex-col gap-4 lg:max-w-[411px]">
            {service.page.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-body">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <ButtonLink href="/contact">{service.page.ctaLabel}</ButtonLink>
          </Reveal>
        </div>

        <Reveal
          delay={0.1}
          className={`w-full lg:max-w-[737px] lg:flex-1 ${photoFirst ? "lg:order-1" : ""}`}
        >
          {service.page.wideImage ? (
            <PhotoMosaic service={service} />
          ) : (
            <OverlaidPhoto service={service} />
          )}
        </Reveal>
      </div>
    </section>
  );
}
