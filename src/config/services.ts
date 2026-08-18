export interface Service {
  slug: string;
  name: string;
  description: string;
  deliverables: string[];
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
  },
];

// Homepage teaser shows 4 of 5 — "3D Visualisation" reads more like a
// deliverable than a headline service, so it's the one dropped here. All
// five remain on the full /services page.
export const TEASER_SERVICES: Service[] = SERVICES.filter(
  (service) => service.slug !== "3d-visualisation-rendering"
);
