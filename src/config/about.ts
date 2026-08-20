import { contactInfo } from "@/config/contact";
import type { PortfolioFilter } from "@/types/portfolio";

export interface Principle {
  title: string;
  body: string;
}

export const PRINCIPLES: Principle[] = [
  {
    title: "function comes before decoration",
    body: "A beautiful space still needs to work. We begin with circulation, proportions, zoning, furniture placement, and the practical requirements of the project before adding decorative layers.",
  },
  {
    title: "materials should have a reason",
    body: "Stone, wood, glass, metal, fabric, and lighting should work together rather than compete for attention. We use materials to create contrast, warmth, texture, and depth while keeping the overall composition controlled.",
  },
  {
    title: "light is part of the architecture",
    body: "Lighting isn't something added at the end. Natural daylight, concealed LEDs, cove lighting, spotlights, pendant fixtures, and accent illumination all contribute to how a space is experienced.",
  },
  {
    title: "details create the character",
    body: "Feature walls, custom cabinetry, ceiling treatments, furniture proportions, architectural lines, and carefully selected finishes can completely change the feeling of a space. We pay attention to those details because they are often what make a project memorable.",
  },
  {
    title: "design should outlast trends",
    body: "We don't design spaces simply to follow whatever is popular. Our aim is to create contemporary, refined, and timeless environments where materials, proportions, lighting, and functionality continue to work together long after the initial reveal.",
  },
];

export interface WorkArea {
  name: string;
  body: string;
  ctaLabel: string;
  /** Filter value the existing /portfolio archive understands ("all" links unfiltered). */
  filter: PortfolioFilter;
}

export const WORK_AREAS: WorkArea[] = [
  {
    name: "Architecture",
    body: "Residential and commercial architecture shaped around proportion, function, context, and a clear architectural identity.",
    ctaLabel: "Explore Architecture →",
    filter: "architecture",
  },
  {
    name: "Interior Design",
    body: "Contemporary and luxury interiors designed through space planning, materials, furniture, lighting, and architectural detailing.",
    ctaLabel: "Explore Interiors →",
    filter: "all",
  },
  {
    name: "3D Visualization",
    body: "High-quality architectural visualization that translates design ideas into realistic spatial experiences before they are built.",
    ctaLabel: "Explore Visualization →",
    filter: "all",
  },
  {
    name: "Architectural Planning",
    body: "Plans, elevations, spatial studies, and architectural drawings developed to communicate the project clearly and accurately.",
    ctaLabel: "Explore Projects →",
    filter: "architecturalplan",
  },
];

export interface DesignArea {
  name: string;
  body: string;
}

export const DESIGN_AREAS: DesignArea[] = [
  {
    name: "Residential Architecture",
    body: "Contemporary homes, luxury villas, urban residences, and private architectural projects.",
  },
  {
    name: "Interior Design",
    body: "Bedrooms, living spaces, dining rooms, kitchens, offices, entertainment spaces, and complete residential interiors.",
  },
  {
    name: "Commercial Architecture",
    body: "Office buildings, commercial developments, and contemporary architectural concepts.",
  },
  {
    name: "Office Interiors",
    body: "Executive offices, workspaces, storage systems, feature walls, and professional environments.",
  },
  {
    name: "Architectural Visualization",
    body: "Photorealistic 3D interiors, exterior elevations, architectural concepts, and presentation imagery.",
  },
];

export interface AboutProcessStep {
  name: string;
  body: string;
}

export const ABOUT_PROCESS_STEPS: AboutProcessStep[] = [
  {
    name: "Understand",
    body: "We study the brief, site, requirements, lifestyle, functionality, and architectural context.",
  },
  {
    name: "Plan",
    body: "Space planning, circulation, zoning, proportions, and architectural relationships establish the foundation.",
  },
  {
    name: "Design",
    body: "Materials, forms, furniture, lighting, finishes, and architectural details are developed into a cohesive design language.",
  },
  {
    name: "Visualize",
    body: "3D visualization brings the design into focus, allowing materials, lighting, proportions, and atmosphere to be experienced before the project is built.",
  },
  {
    name: "Refine",
    body: "The strongest designs often come from refinement. Details are reviewed, balanced, simplified, and brought together into one coherent composition.",
  },
  {
    name: "Present",
    body: "The final design is communicated through architectural drawings, elevations, interior perspectives, and high-quality visualizations.",
  },
];

/** Real facts only — sourced from src/config/contact.ts, not invented for this table. */
export const STUDIO_FACTS: { label: string; value: string }[] = [
  { label: "Studio Location", value: contactInfo.location },
  { label: "Studio Hours", value: contactInfo.hours },
  { label: "Practice Areas", value: "Residential · Commercial" },
  {
    label: "Core Disciplines",
    value: "Architecture · Interior Design · Visualization · Planning",
  },
];
