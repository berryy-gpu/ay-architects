import { createProject } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";

// Descriptive fields (style, overview, designConcept, materialPalette,
// lightingStrategy, keyFeatures, visualIdentity, keywords) are intentionally
// left empty — no real content has been provided yet for these projects.

export const DINING_ROOMS: Project[] = [
  createProject({
    slug: "diningroom-01",
    title: "Dining Room 01",
    category: "diningroom",
    projectType: "interior-design",
    presentation: { importance: "secondary", aspect: "landscape" },
    heroImage: "/images/interiors/diningroom/diningroom-01.jpeg",
  }),
  createProject({
    slug: "diningroom-02",
    title: "Dining Room 02",
    category: "diningroom",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/interiors/diningroom/diningroom-02.jpeg",
  }),
  createProject({
    slug: "diningroom-03",
    title: "Dining Room 03",
    category: "diningroom",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/interiors/diningroom/diningroom-03.jpeg",
  }),
  createProject({
    slug: "diningroom-04",
    title: "Dining Room 04",
    category: "diningroom",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "landscape" },
    heroImage: "/images/interiors/diningroom/diningroom-04.jpeg",
  }),
  createProject({
    slug: "diningroom-05",
    title: "Dining Room 05",
    category: "diningroom",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/interiors/diningroom/diningroom-05.jpeg",
  }),
];
