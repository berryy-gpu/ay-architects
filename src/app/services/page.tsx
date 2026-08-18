import type { Metadata } from "next";

import { ServicesCTA } from "@/components/sections/ServicesCTA";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesList } from "@/components/sections/ServicesList";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential interior design, architectural documentation, master planning, commercial architecture, and 3D visualisation.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </main>
  );
}
