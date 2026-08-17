import { createProject } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";

// Descriptive fields (style, overview, designConcept, materialPalette,
// lightingStrategy, keyFeatures, visualIdentity, keywords) are intentionally
// left empty — no real content has been provided yet for these projects.

export const KITCHENS: Project[] = [
  createProject({
    slug: "kitchen-01",
    title: "Kitchen 01",
    category: "kitchen",
    projectType: "interior-design",
    presentation: { importance: "primary", aspect: "wide" },
    heroImage: "/images/interiors/kitchen/kitchen-01.jpeg",
  }),
  createProject({
    slug: "kitchen-02",
    title: "Kitchen 02",
    category: "kitchen",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/interiors/kitchen/kitchen-02.jpeg",
  }),
  createProject({
    slug: "kitchen-03",
    title: "Kitchen 03",
    category: "kitchen",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/interiors/kitchen/kitchen-03.jpeg",
  }),
  createProject({
    slug: "kitchen-04",
    title: "Kitchen 04",
    category: "kitchen",
    projectType: "interior-design",
    presentation: { importance: "secondary", aspect: "landscape" },
    heroImage: "/images/interiors/kitchen/kitchen-04.jpeg",
  }),
  createProject({
    slug: "kitchen-05",
    title: "Kitchen 05",
    category: "kitchen",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/interiors/kitchen/kitchen-05.jpeg",
  }),
  createProject({
    slug: "kitchen-06",
    title: "Kitchen 06",
    category: "kitchen",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/interiors/kitchen/kitchen-06.jpeg",
  }),
  createProject({
    slug: "kitchen-07",
    title: "Kitchen 07",
    category: "kitchen",
    projectType: "interior-design",
    presentation: { importance: "secondary", aspect: "wide" },
    heroImage: "/images/interiors/kitchen/kitchen-07.jpeg",
  }),
  createProject({
    slug: "kitchen-08",
    title: "Kitchen 08",
    category: "kitchen",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/interiors/kitchen/kitchen-08.jpeg",
  }),
  createProject({
    slug: "kitchen-09",
    title: "Kitchen 09",
    category: "kitchen",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "landscape" },
    heroImage: "/images/interiors/kitchen/kitchen-09.jpeg",
  }),
  createProject({
    slug: "kitchen-10",
    title: "Kitchen 10",
    category: "kitchen",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/interiors/kitchen/kitchen-10.jpeg",
  }),
];
