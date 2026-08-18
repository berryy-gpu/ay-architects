import { Contact } from "@/components/sections/Contact";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Portfolio />
      <ServicesTeaser />
      <Contact />
    </>
  );
}
