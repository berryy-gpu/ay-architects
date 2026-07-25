import { createProject } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";

// Descriptive fields (style, overview, designConcept, materialPalette,
// lightingStrategy, keyFeatures, visualIdentity, keywords) are intentionally
// left empty — no real content has been provided yet for these projects.
//
// "Executive Office" stands in for office-01.jpeg: it's the same image
// originally curated into the Featured Projects section, given a real name
// instead of a generic one. featured.ts imports this same object rather
// than duplicating it.

export const executiveOffice: Project = createProject({
  slug: "executive-office",
  title: "Executive Office",
  category: "office",
  projectType: "interior-design",
  presentation: { importance: "secondary", aspect: "wide", featured: true },
  heroImage: "/images/interiors/office/office-01.jpeg",
});

export const OFFICES: Project[] = [
  executiveOffice,
  createProject({
    slug: "office-02",
    title: "Office 02",
    category: "office",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/interiors/office/office-02.jpeg",
  }),
  createProject({
    slug: "office-03",
    title: "Office 03",
    category: "office",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/interiors/office/office-03.jpeg",
  }),
  createProject({
    slug: "office-04",
    title: "Office 04",
    category: "office",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "landscape" },
    heroImage: "/images/interiors/office/office-04.jpeg",
  }),
  createProject({
    slug: "office-05",
    title: "Office 05",
    category: "office",
    projectType: "interior-design",
    presentation: { importance: "secondary", aspect: "landscape" },
    heroImage: "/images/interiors/office/office-05.jpeg",
  }),
  createProject({
    slug: "office-06",
    title: "Office 06",
    category: "office",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/interiors/office/office-06.jpeg",
  }),
  createProject({
    slug: "office-07",
    title: "Office 07",
    category: "office",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/interiors/office/office-07.jpeg",
  }),
  createProject({
    slug: "office-08",
    title: "Office 08",
    category: "office",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "landscape" },
    heroImage: "/images/interiors/office/office-08.jpeg",
  }),
];
