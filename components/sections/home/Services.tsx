"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HOME_SERVICES, type Service } from "@/lib/data/services";

/** Time for the row to drift by one full set of cards. */
const LOOP_SECONDS = 45;

function ServiceCard({ service, hidden }: { service: Service; hidden?: boolean }) {
  return (
    <li className="w-[272px] shrink-0 sm:w-[302px]">
      <Link
        href={`/services#${service.slug}`}
        tabIndex={hidden ? -1 : undefined}
        className={`group flex h-full flex-col overflow-hidden rounded-card border-2 border-moss transition-all duration-300 hover:-translate-y-1 hover:shadow-card-strong ${
          // Ink on the moss cards: white card text on moss is 3.31:1, under AA.
          service.featured ? "bg-moss text-ink" : "bg-bg text-ink"
        }`}
      >
        <span className="relative block h-[200px] w-full overflow-hidden sm:h-[220px]">
          <Image
            src={service.image.src}
            alt={hidden ? "" : service.image.alt}
            fill
            sizes="302px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </span>
        <span className="flex flex-1 flex-col gap-3 p-6">
          <span className="text-card-title font-bold uppercase">{service.title}</span>
          <span className="text-card-body">{service.description}</span>
        </span>
      </Link>
    </li>
  );
}

export function Services() {
  // The pause button, shown on touch screens only (a mouse pauses by hovering).
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const areaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLUListElement>(null);
  /** One small bar per service; refs to their fills and their buttons. */
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /** How far the row has drifted, as a share of one set of cards (0 to 1). */
  const progress = useRef(0);
  const hold = useRef({ focus: false });

  // Written straight to the DOM on every frame rather than through React
  // state, so the cards are not re-rendered sixty times a second.
  const render = useCallback(() => {
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!track || !copy) return;

    track.style.transform = `translateX(${-progress.current * copy.offsetWidth}px)`;
    // Story-style: bars before the current card are full, the current one
    // fills as its card passes, the ones after it are empty.
    const position = progress.current * HOME_SERVICES.length;
    const current = Math.min(Math.max(Math.floor(position), 0), HOME_SERVICES.length - 1);
    HOME_SERVICES.forEach((_, index) => {
      const fill = fillRefs.current[index];
      if (fill) fill.style.transform = `scaleX(${Math.min(Math.max(position - index, 0), 1)})`;
      const segment = segmentRefs.current[index];
      if (segment) {
        if (index === current) segment.setAttribute("aria-current", "true");
        else segment.removeAttribute("aria-current");
      }
    });
  }, []);

  const goTo = (index: number) => {
    progress.current = index / HOME_SERVICES.length;
    render();
  };

  useEffect(() => {
    // With reduced motion the row never drifts; the bars below still move it.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Hover is read from the browser's own :hover state on each frame, and only
    // where a mouse is the primary pointer: touch screens keep :hover stuck on
    // the last tapped element, which would freeze the row after any tap.
    const canHover = window.matchMedia("(hover: hover)");
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      // A frame's timestamp can predate the performance.now() taken when the
      // loop started; a negative step would push progress below 0 and break
      // the card lookup in render(), stopping the loop for good.
      const seconds = Math.max(0, now - last) / 1000;
      last = now;
      const hover = canHover.matches && !!areaRef.current?.matches(":hover");
      if (!reduceMotion.matches && !pausedRef.current && !hover && !hold.current.focus) {
        progress.current = (progress.current + seconds / LOOP_SECONDS) % 1;
        render();
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", render);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", render);
    };
  }, [render]);

  // Keyboard focus on a card or a bar pauses the row; a mouse click focuses
  // too, but that pause is already covered by the hover.
  const onFocus = (event: FocusEvent) => {
    hold.current.focus = (event.target as HTMLElement).matches(":focus-visible");
  };
  const onBlur = () => {
    hold.current.focus = false;
  };

  return (
    <section id="services" className="overflow-hidden bg-bg py-16 lg:py-[100px]">
      <div className="container-page">
        <AnimatedHeadline
          text="Un professionnel, tous vos besoins extérieurs"
          className="section-heading max-w-[720px]"
        />
      </div>

      {/* Full-bleed row that drifts sideways, as in Figma, where the cards run
       * off both edges. The track holds the list twice and moves by up to one
       * copy, so both copies must stay identical — the gutter is padding on the
       * clipping box, not on the lists, or the seam would be wider than the
       * gaps. A mouse over the row or the bars pauses it. */}
      <Reveal delay={0.1} className="mt-10 lg:mt-12">
        <div ref={areaRef} onFocus={onFocus} onBlur={onBlur}>
          <div className="overflow-hidden py-3 pl-5 sm:pl-8 lg:pl-12 xl:pl-20">
            <div ref={trackRef} className="flex w-max will-change-transform">
              <ul ref={copyRef} className="flex items-stretch gap-6 pr-6">
                {HOME_SERVICES.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </ul>
              <ul aria-hidden className="flex items-stretch gap-6 pr-6">
                {HOME_SERVICES.map((service) => (
                  <ServiceCard key={service.slug} service={service} hidden />
                ))}
              </ul>
            </div>
          </div>

          {/* One short bar per service, grouped in the centre. Each is a
           * button that jumps the row to its card; the 44px hit area wraps a
           * 4px line. The pause button (touch screens only) sits at the right
           * edge, so it does not pull the group off centre. */}
          <div className="container-page relative mt-3 flex items-center justify-center">
            <ul className="flex items-center">
              {HOME_SERVICES.map((service, index) => (
                <li key={service.slug}>
                  <button
                    type="button"
                    ref={(element) => {
                      segmentRefs.current[index] = element;
                    }}
                    onClick={() => goTo(index)}
                    aria-label={`Aller à : ${service.title}`}
                    className="group/segment flex h-11 w-11 cursor-pointer items-center justify-center sm:w-14"
                  >
                    {/* Outlined in moss rather than a pale moss/20 track (1.22:1 on
                     * white): each bar is a control, and AA asks 3:1 for its edge.
                     * The moss outline is 3.31:1; the fill shows progress inside it. */}
                    <span className="block h-1.5 w-8 overflow-hidden rounded-full border border-moss transition-colors group-hover/segment:bg-moss/25 sm:w-11">
                      <span
                        ref={(element) => {
                          fillRefs.current[index] = element;
                        }}
                        className="block h-full w-full origin-left scale-x-0 rounded-full bg-moss"
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
              aria-label={paused ? "Reprendre le défilement" : "Mettre en pause le défilement"}
              className="absolute right-5 flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-moss text-moss motion-reduce:hidden sm:right-8 [@media(hover:hover)]:hidden"
            >
              {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
            </button>
          </div>
        </div>
      </Reveal>

      <div className="container-page mt-6 lg:mt-8">
        <Reveal delay={0.15}>
          <ButtonLink href="/services" className="tracking-[1px]">
            Voir toutes les prestations
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
