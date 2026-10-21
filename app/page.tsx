import { ContactSection } from "@/components/sections/ContactSection";
import { About } from "@/components/sections/home/About";
import { Faq } from "@/components/sections/home/Faq";
import { Hero } from "@/components/sections/home/Hero";
import { Problems } from "@/components/sections/home/Problems";
import { Process } from "@/components/sections/home/Process";
import { Services } from "@/components/sections/home/Services";
import { Testimonial } from "@/components/sections/home/Testimonial";
import { HOME_DESCRIPTION, HOME_TITLE, pageMetadata } from "@/lib/seo";

// Every page sets its own canonical. None is set in the root layout: a
// layout-level "/" is inherited by any page that forgets its own (and by the
// 404 page), which would tell search engines they are all the homepage.
export const metadata = pageMetadata({
  path: "/",
  absoluteTitle: HOME_TITLE,
  description: HOME_DESCRIPTION,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Testimonial />
      <Problems />
      <Services />
      <Process />
      <Faq />
      <ContactSection
        title="Un jardin qui reste beau, même quand vous n'y pensez plus."
        subtitle="Quelques infos, et Nicolas s'occupe du reste."
        submitLabel="Envoyer ma demande"
      />
    </>
  );
}
