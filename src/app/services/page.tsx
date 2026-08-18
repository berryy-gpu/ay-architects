import type { Metadata } from "next";

import { ServicesCapabilityList } from "@/components/sections/ServicesCapabilityList";
import { ServicesCaseStudyStrip } from "@/components/sections/ServicesCaseStudyStrip";
import { ServicesCTA } from "@/components/sections/ServicesCTA";
import { ServicesFAQ } from "@/components/sections/ServicesFAQ";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesProcess } from "@/components/sections/ServicesProcess";

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
      <ServicesCTA />
    </main>
  );
}
