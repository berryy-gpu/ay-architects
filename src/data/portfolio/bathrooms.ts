import { createProject } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";

// Descriptive fields (style, overview, designConcept, materialPalette,
// lightingStrategy, keyFeatures, visualIdentity, keywords) are intentionally
// left empty — no real content has been provided yet for these projects.

export const BATHROOMS: Project[] = [
  createProject({
    slug: "bathroom-01",
    title: "Bathroom 01",
    category: "bathroom",
    projectType: "interior-design",
    presentation: { importance: "secondary", aspect: "wide" },
    heroImage: "/images/interiors/bathroom/bathroom-01.jpeg",
  }),
  createProject({
    slug: "bathroom-02",
    title: "Bathroom 02",
    category: "bathroom",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/interiors/bathroom/bathroom-02.jpeg",
  }),
  createProject({
    slug: "bathroom-03",
    title: "Bathroom 03",
    category: "bathroom",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/interiors/bathroom/bathroom-03.jpeg",
  }),
  createProject({
    slug: "bathroom-04",
    title: "Bathroom 04",
    category: "bathroom",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "landscape" },
    heroImage: "/images/interiors/bathroom/bathroom-04.jpeg",
  }),
  createProject({
    slug: "bathroom-05",
    title: "Bathroom 05",
    category: "bathroom",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/interiors/bathroom/bathroom-05.jpeg",
  }),
  createProject({
    slug: "bathroom-06",
    title: "Bathroom 06",
    category: "bathroom",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/interiors/bathroom/bathroom-06.jpeg",
  }),
];
