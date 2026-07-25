export type ProjectType = "interior-design" | "architecture";

export type ProjectCategory =
  | "bathroom"
  | "bedroom"
  | "diningroom"
  | "office"
  | "elevation"
  | "architecturalplan"
  | "livingroom"
  | "kitchen"
  | "commercial"
  | "landscape";

export type PortfolioFilter = "all" | ProjectType | ProjectCategory;

/** How much visual weight a project should get in the grid — a size tier. */
export type ProjectImportance = "primary" | "secondary" | "standard";

/** The crop/shape a project should render at — independent of size. */
export type ProjectAspect = "wide" | "landscape" | "square" | "portrait";

/**
 * Rendering decisions, kept separate from project content. The grid
 * interprets these; it never hardcodes per-project CSS. Changing how
 * "secondary + landscape" looks, for example, means editing the resolver
 * in lib/portfolio.ts once — not touching any project data.
 */
export interface ProjectPresentation {
  importance: ProjectImportance;
  aspect: ProjectAspect;
  /** Optional manual ordering hint; lower shows earlier. Unset = array order. */
  priority?: number;
  /** Flags projects worth cross-referencing elsewhere (e.g. a detail-page badge). */
  featured?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  projectType: ProjectType;
  presentation: ProjectPresentation;
  drawingType: string;
  style: string;
  heroImage: string;
  galleryImages?: string[];
  overview: string;
  designConcept: string;
  spacePlanning: string;
  materialPalette: string[];
  colorPalette: string[];
  features: string[];
  lightingFeatures: string[];
  decorativeElements: string[];
  keyFeatures: string[];
  visualIdentity: string;
  keywords: string[];
}
