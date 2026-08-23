import { luxuryVilla, obsidianHouse } from "@/data/portfolio/elevations";
import { executiveOffice } from "@/data/portfolio/offices";
import type { Project } from "@/types/portfolio";

// References the same master Project objects used in elevations.ts and
// offices.ts rather than duplicating their content. Obsidian House is slot
// 1 by explicit request (2026-08-24); The Threshold (commercialTower) was
// dropped from this section but is still a real elevation project on its
// own /portfolio page.

export const FEATURED_PROJECTS: Project[] = [
  obsidianHouse,
  luxuryVilla,
  executiveOffice,
];
