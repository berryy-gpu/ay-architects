import { createProject } from "@/lib/portfolio";
import type { Project } from "@/types/portfolio";

// Descriptive fields (style, overview, designConcept, materialPalette,
// lightingStrategy, keyFeatures, visualIdentity, keywords) are intentionally
// left empty — no real content has been provided yet for these projects.
//
// "Commercial Tower" and "Luxury Villa" stand in for elevation-06.jpeg and
// elevation-07.jpeg: the same images originally curated into the Featured
// Projects section, given real names instead of generic ones. featured.ts
// imports these same objects rather than duplicating them.

export const commercialTower: Project = createProject({
  slug: "commercial-tower",
  title: "Commercial Tower",
  category: "elevation",
  projectType: "architecture",
  presentation: { importance: "primary", aspect: "wide", featured: true },
  heroImage: "/images/elevations/elevation-06.jpeg",
});

export const luxuryVilla: Project = createProject({
  slug: "luxury-villa",
  title: "Luxury Villa",
  category: "elevation",
  projectType: "architecture",
  presentation: { importance: "secondary", aspect: "wide", featured: true },
  heroImage: "/images/elevations/elevation-07.jpeg",
});

export const ELEVATIONS: Project[] = [
  createProject({
    slug: "elevation-01",
    title: "Elevation 01",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "secondary", aspect: "landscape" },
    heroImage: "/images/elevations/elevation-01.jpeg",
  }),
  createProject({
    slug: "elevation-02",
    title: "Elevation 02",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/elevations/elevation-02.jpeg",
  }),
  createProject({
    slug: "elevation-03",
    title: "Elevation 03",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/elevations/elevation-03.jpeg",
  }),
  createProject({
    slug: "elevation-04",
    title: "Elevation 04",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "landscape" },
    heroImage: "/images/elevations/elevation-04.jpeg",
  }),
  createProject({
    slug: "elevation-05",
    title: "Elevation 05",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/elevations/elevation-05.jpeg",
  }),
  commercialTower,
  luxuryVilla,
  createProject({
    slug: "elevation-08",
    title: "Elevation 08",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/elevations/elevation-08.jpeg",
  }),
  createProject({
    slug: "elevation-09",
    title: "Elevation 09",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/elevations/elevation-09.jpeg",
  }),
  createProject({
    slug: "elevation-10",
    title: "Elevation 10",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "landscape" },
    heroImage: "/images/elevations/elevation-10.jpeg",
  }),
  createProject({
    slug: "elevation-11",
    title: "Elevation 11",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "secondary", aspect: "landscape" },
    heroImage: "/images/elevations/elevation-11.jpeg",
  }),
  createProject({
    slug: "elevation-12",
    title: "Elevation 12",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/elevations/elevation-12.jpeg",
  }),
  createProject({
    slug: "elevation-13",
    title: "Elevation 13",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "portrait" },
    heroImage: "/images/elevations/elevation-13.jpeg",
  }),
  createProject({
    slug: "elevation-14",
    title: "Elevation 14",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "landscape" },
    heroImage: "/images/elevations/elevation-14.jpeg",
  }),
  createProject({
    slug: "elevation-15",
    title: "Elevation 15",
    category: "elevation",
    projectType: "architecture",
    presentation: { importance: "standard", aspect: "square" },
    heroImage: "/images/elevations/elevation-15.jpeg",
  }),
];
