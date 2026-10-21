import type { Testimonial } from "@/lib/data/testimonials";
import { StarRating } from "./StarRating";

// White only. The moss and translucent-moss variants were removed: white body
// text on moss is 3.31:1, under the 4.5:1 WCAG AA asks, and over a photo it was
// lower still. The author line uses moss-dark (4.54:1 on white), not moss.
export function TestimonialCard({
  testimonial,
  className = "",
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <figure className={`flex flex-col gap-2 rounded-card bg-bg p-6 text-ink shadow-card-strong sm:p-8 ${className}`}>
      <StarRating />
      <blockquote className="text-body">{testimonial.quote}</blockquote>
      <figcaption className="flex flex-col gap-0.5 text-moss-dark">
        <span className="text-body leading-[1.3]">{testimonial.author}</span>
        <span className="text-caption">{testimonial.location}</span>
      </figcaption>
    </figure>
  );
}
