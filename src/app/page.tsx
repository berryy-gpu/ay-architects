import { Contact } from "@/components/sections/Contact";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Portfolio } from "@/components/sections/Portfolio";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { RotatingWordLine } from "@/components/ui/RotatingWordLine";

const HOME_ROTATING_WORDS = ["PURPOSE", "CHARACTER", "PRECISION", "LIGHT", "MATERIAL"];

export default function HomePage() {
  return (
    <>
      <Hero />
      <RotatingWordLine
        prefix="We shape spaces with"
        words={HOME_ROTATING_WORDS}
        suffix="Architecture · Interiors · Visualization"
        tone="dark"
      />
      <FeaturedProjects />
      <Portfolio />
      <LogoMarquee />
      <ServicesTeaser />
      <Contact />
    </>
  );
}
