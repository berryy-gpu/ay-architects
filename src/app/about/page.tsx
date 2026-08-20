import type { Metadata } from "next";

import { AboutApproach } from "@/components/sections/AboutApproach";
import { AboutArchitect } from "@/components/sections/AboutArchitect";
import { AboutDesign } from "@/components/sections/AboutDesign";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutLocation } from "@/components/sections/AboutLocation";
import { AboutPractice } from "@/components/sections/AboutPractice";
import { AboutPrinciples } from "@/components/sections/AboutPrinciples";
import { AboutProcess } from "@/components/sections/AboutProcess";
import { AboutStats } from "@/components/sections/AboutStats";
import { AboutWork } from "@/components/sections/AboutWork";
import { CtaSection } from "@/components/ui/CtaSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "AY Architects is a Lahore-based architecture and interior design practice led by Araiz Ahmed Khan — architecture, interiors, and 3D visualization under one roof.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutPractice />
      <AboutArchitect />
      <AboutPrinciples />
      <AboutWork />
      <AboutStats />
      <AboutLocation />
      <AboutProcess />
      <AboutDesign />
      <AboutApproach />
      <CtaSection
        heading="have a space in mind?"
        copy="Whether you're planning a new home, developing an interior, designing a commercial space, or need professional 3D visualization for an architectural project, we'd like to understand what you're working on. Tell us about the project, the space, and what you're trying to achieve."
        buttonLabel="Start a conversation →"
        buttonHref="/contact"
        footerNote="AY ARCHITECTS — Architecture · Interior Design · 3D Visualization — Lahore, Pakistan"
      />
    </main>
  );
}
