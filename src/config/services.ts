import type { ProjectCategory } from "@/types/portfolio";

export interface Service {
  slug: string;
  name: string;
  description: string;
  deliverables: string[];
  /** A real, existing project slug used as this category's dominant case-study image. */
  caseStudySlug: string;
  /** Which existing /portfolio archive filter "View [Category] Projects" reuses. */
  portfolioCategory: ProjectCategory;
}

// Content as drafted from the portfolio; not sacred — a future correction
// supersedes this. See src/config/contact.ts for the same "real data,
// nothing invented" posture applied here.
export const SERVICES: Service[] = [
  {
    slug: "residential-interior-design",
    name: "Residential Interior Design",
    description:
      "Full interior design for kitchens, bedrooms, bathrooms, dining rooms, and living spaces — from space planning through material and lighting selection.",
    deliverables: [
      "Concept design",
      "Material & finish palettes",
      "Lighting plans",
      "3D interior visualisation",
    ],
    caseStudySlug: "kitchen-01",
    portfolioCategory: "kitchen",
  },
  {
    slug: "architectural-design-working-drawings",
    name: "Architectural Design & Working Drawings",
    description:
      "Complete architectural documentation for residential and commercial buildings, from floor plans through construction-ready drawings.",
    deliverables: [
      "Floor plans",
      "Elevations & sections",
      "Working drawings",
      "Construction documentation",
    ],
    caseStudySlug: "architecturalplan-01",
    portfolioCategory: "architecturalplan",
  },
  {
    slug: "master-planning-landscape",
    name: "Master Planning & Landscape",
    description:
      "Site-wide planning for residential estates, resorts, and mixed-use developments, balancing built form with landscape and circulation.",
    deliverables: [
      "Site master plans",
      "Landscape planning",
      "Circulation & zoning strategy",
    ],
    caseStudySlug: "architecturalplan-02",
    portfolioCategory: "architecturalplan",
  },
  {
    slug: "commercial-mixed-use-architecture",
    name: "Commercial & Mixed-Use Architecture",
    description:
      "Architecture for office buildings, retail, and mixed-use developments, from façade design through corporate interiors.",
    deliverables: [
      "Building elevations",
      "Façade design",
      "Corporate interior design",
    ],
    caseStudySlug: "the-threshold",
    portfolioCategory: "office",
  },
  {
    slug: "3d-visualisation-rendering",
    name: "3D Visualisation & Rendering",
    description:
      "Photorealistic interior and exterior renders used for design review, client presentation, and marketing.",
    deliverables: [
      "Interior perspectives",
      "Day/night exterior elevations",
      "Walkthrough-ready visuals",
    ],
    caseStudySlug: "the-black-frame",
    portfolioCategory: "elevation",
  },
];

// Homepage teaser shows 3 of 5 as image tiles — the three that read most
// distinctly as categories at a glance (interiors / architecture / commercial).
export const TEASER_SERVICE_SLUGS = [
  "residential-interior-design",
  "architectural-design-working-drawings",
  "commercial-mixed-use-architecture",
];
export const TEASER_SERVICES = SERVICES.filter((service) =>
  TEASER_SERVICE_SLUGS.includes(service.slug)
);

/**
 * Capability list vocabulary — pulled from terms already present across the
 * 73+ projects' real data (materialPalette, lightingFeatures, drawingType,
 * spacePlanning/spatialOrganization, facadeComposition, etc.), grouped by
 * theme rather than invented as new marketing copy.
 */
export const CAPABILITIES: { group: string; items: string[] }[] = [
  {
    group: "Space Planning",
    items: [
      "Room layout & flow",
      "Furniture & fixture planning",
      "Circulation strategy",
      "Zoning & functional adjacency",
    ],
  },
  {
    group: "Materials & Finishes",
    items: [
      "Stone & marble palettes",
      "Timber & veneer selection",
      "Metal & hardware finishes",
      "Facade & cladding materials",
    ],
  },
  {
    group: "Lighting Design",
    items: [
      "Cove & accent lighting",
      "Architectural facade lighting",
      "Landscape uplighting",
      "Interior ambient lighting",
    ],
  },
  {
    group: "Documentation",
    items: [
      "Floor plans",
      "Elevations & sections",
      "Working drawings",
      "Construction documentation",
    ],
  },
  {
    group: "Site & Landscape",
    items: [
      "Site master planning",
      "Landscape planning",
      "Circulation & zoning",
      "Entrance & gateway design",
    ],
  },
  {
    group: "Visualisation",
    items: [
      "Interior perspectives",
      "Exterior day/night renders",
      "Walkthrough-ready visuals",
      "Presentation-ready imagery",
    ],
  },
];

export interface ProcessStep {
  name: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  { name: "Consultation" },
  { name: "Concept & Space Planning" },
  { name: "Design Development & Visualisation" },
  { name: "Working Drawings" },
  { name: "Execution Support" },
];

export interface FaqItem {
  question: string;
  /** Placeholder — pending the outstanding studio content brief. Never invented as a real answer. */
  answer: string;
}

// Drafted placeholders only — visibly marked as pending real content.
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What's a typical project timeline?",
    answer: "Answer pending — timeline specifics depend on project scope and haven't been provided yet.",
  },
  {
    question: "Do you handle execution and site supervision, or design only?",
    answer: "Answer pending — scope of execution/supervision services hasn't been confirmed yet.",
  },
  {
    question: "What areas do you work in?",
    answer: "Answer pending — service area beyond Lahore, Pakistan hasn't been confirmed yet.",
  },
];
