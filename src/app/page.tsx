import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Process />
      {/* F3: sem přijde sekce galerie */}
      <Pricing />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
