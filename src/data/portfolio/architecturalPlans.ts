import { createProject } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";

// Descriptive fields (style, overview, designConcept, materialPalette,
// lightingStrategy, keyFeatures, visualIdentity, keywords) are intentionally
// left empty — no real content has been provided yet for these projects.

export const ARCHITECTURAL_PLANS: Project[] = [
  createProject({
    slug: "architecturalplan-01",
    title: "Architectural Plan 01",
    category: "architecturalplan",
    projectType: "architecture",
    presentation: { importance: "secondary", aspect: "wide" },
    heroImage: "/images/architectural-plans/architecturalplan-01.jpeg",
  }),
  createProject({
    slug: "architecturalplan-02",
    title: "Architectural Plan 02",
    category: "architecturalplan",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/architectural-plans/architecturalplan-02.jpeg",
  }),
  createProject({
    slug: "architecturalplan-03",
    title: "Architectural Plan 03",
    category: "architecturalplan",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/architectural-plans/architecturalplan-03.jpeg",
  }),
  createProject({
    slug: "architecturalplan-04",
    title: "Architectural Plan 04",
    category: "architecturalplan",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "landscape" },
    heroImage: "/images/architectural-plans/architecturalplan-04.jpeg",
  }),
  createProject({
    slug: "architecturalplan-05",
    title: "Architectural Plan 05",
    category: "architecturalplan",
    projectType: "architecture",
    presentation: { importance: "secondary", aspect: "landscape" },
    heroImage: "/images/architectural-plans/architecturalplan-05.jpeg",
  }),
  createProject({
    slug: "architecturalplan-06",
    title: "Architectural Plan 06",
    category: "architecturalplan",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/architectural-plans/architecturalplan-06.jpeg",
  }),
];
