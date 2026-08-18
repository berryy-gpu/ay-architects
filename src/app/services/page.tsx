import type { Metadata } from "next";

import { ServicesCapabilityList } from "@/components/sections/ServicesCapabilityList";
import { ServicesCaseStudyStrip } from "@/components/sections/ServicesCaseStudyStrip";
import { ServicesFAQ } from "@/components/sections/ServicesFAQ";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesProcess } from "@/components/sections/ServicesProcess";
import { CtaSection } from "@/components/ui/CtaSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential interior design, architectural documentation, master planning, commercial architecture, and 3D visualisation.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesCaseStudyStrip />
      <ServicesCapabilityList />
      <ServicesProcess />
      <ServicesFAQ />
      <CtaSection
        heading="Let's Discuss Your Project"
        copy="Tell us about your project and we'll get back to you shortly."
        buttonLabel="Get in Touch"
        buttonHref="/contact"
      />
    </main>
  );
}
