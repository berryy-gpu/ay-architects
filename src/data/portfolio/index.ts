import { ARCHITECTURAL_PLANS } from "@/data/portfolio/architecturalPlans";
import { BATHROOMS } from "@/data/portfolio/bathrooms";
import { BEDROOMS } from "@/data/portfolio/bedrooms";
import { DINING_ROOMS } from "@/data/portfolio/diningRooms";
import { ELEVATIONS } from "@/data/portfolio/elevations";
import { OFFICES } from "@/data/portfolio/offices";
import type { Project, ProjectCategory } from "@/types/portfolio";

export * from "@/data/portfolio/architecturalPlans";
export * from "@/data/portfolio/bathrooms";
export * from "@/data/portfolio/bedrooms";
export * from "@/data/portfolio/diningRooms";
export * from "@/data/portfolio/elevations";
export * from "@/data/portfolio/featured";
export * from "@/data/portfolio/offices";

// Featured projects are not spread in here — they're the same objects
// already included via ELEVATIONS/OFFICES above, not a separate category.
export const ALL_PROJECTS: Project[] = [
  ...BATHROOMS,
  ...BEDROOMS,
  ...DINING_ROOMS,
  ...OFFICES,
  ...ELEVATIONS,
  ...ARCHITECTURAL_PLANS,
];

export function getProjectBySlug(slug: string): Project | undefined {
  return ALL_PROJECTS.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return ALL_PROJECTS.filter((project) => project.category === category);
}

export function getRelatedProjects(project: Project, limit = 4): Project[] {
  return ALL_PROJECTS.filter(
    (candidate) =>
      candidate.category === project.category &&
      candidate.slug !== project.slug
  ).slice(0, limit);
}
