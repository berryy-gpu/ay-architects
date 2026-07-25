import { commercialTower, luxuryVilla } from "@/data/portfolio/elevations";
import { executiveOffice } from "@/data/portfolio/offices";
import type { Project } from "@/types/portfolio";

// References the same master Project objects used in elevations.ts and
// offices.ts rather than duplicating their content — see the comments there
// for why these three specifically stand in for elevation-06, elevation-07
// and office-01.

export const FEATURED_PROJECTS: Project[] = [
  commercialTower,
  luxuryVilla,
  executiveOffice,
];
