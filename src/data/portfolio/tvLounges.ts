import { createProject } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";

// Descriptive fields (style, overview, designConcept, materialPalette,
// lightingStrategy, keyFeatures, visualIdentity, keywords) are intentionally
// left empty — no real content has been provided yet for these projects.

export const TV_LOUNGES: Project[] = [
  createProject({
    slug: "tvlounge-01",
    title: "TV Lounge 01",
    category: "tvlounge",
    projectType: "interior-design",
    presentation: { importance: "primary", aspect: "wide" },
    heroImage: "/images/interiors/tvlounge/tvlounge-01.jpeg",
  }),
  createProject({
    slug: "tvlounge-02",
    title: "TV Lounge 02",
    category: "tvlounge",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/interiors/tvlounge/tvlounge-02.jpeg",
  }),
  createProject({
    slug: "tvlounge-03",
    title: "TV Lounge 03",
    category: "tvlounge",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/interiors/tvlounge/tvlounge-03.jpeg",
  }),
  createProject({
    slug: "tvlounge-04",
    title: "TV Lounge 04",
    category: "tvlounge",
    projectType: "interior-design",
    presentation: { importance: "secondary", aspect: "landscape" },
    heroImage: "/images/interiors/tvlounge/tvlounge-04.jpeg",
  }),
  createProject({
    slug: "tvlounge-05",
    title: "TV Lounge 05",
    category: "tvlounge",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/interiors/tvlounge/tvlounge-05.jpeg",
  }),
  createProject({
    slug: "tvlounge-06",
    title: "TV Lounge 06",
    category: "tvlounge",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/interiors/tvlounge/tvlounge-06.jpeg",
  }),
  createProject({
    slug: "tvlounge-07",
    title: "TV Lounge 07",
    category: "tvlounge",
    projectType: "interior-design",
    presentation: { importance: "secondary", aspect: "wide" },
    heroImage: "/images/interiors/tvlounge/tvlounge-07.jpeg",
  }),
  createProject({
    slug: "tvlounge-08",
    title: "TV Lounge 08",
    category: "tvlounge",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/interiors/tvlounge/tvlounge-08.jpeg",
  }),
  createProject({
    slug: "tvlounge-09",
    title: "TV Lounge 09",
    category: "tvlounge",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "landscape" },
    heroImage: "/images/interiors/tvlounge/tvlounge-09.jpeg",
  }),
  createProject({
    slug: "tvlounge-10",
    title: "TV Lounge 10",
    category: "tvlounge",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/interiors/tvlounge/tvlounge-10.jpeg",
  }),
  createProject({
    slug: "tvlounge-11",
    title: "TV Lounge 11",
    category: "tvlounge",
    projectType: "interior-design",
    presentation: { importance: "standard", aspect: "landscape" },
    heroImage: "/images/interiors/tvlounge/tvlounge-11.jpeg",
  }),
];
