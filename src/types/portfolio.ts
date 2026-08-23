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
  | "tvlounge"
  | "commercial"
  | "landscape"
  | "exclusive";

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
  /** Free-text top-level classification (e.g. "Residential Interior") — distinct from the `category`/`projectType` enums used for filtering and routing. */
  classification?: string;
  /** Free-text project subtype (e.g. "Wardrobe Design", "Feature Wall") — finer-grained than `category`, not used for filtering. */
  subtype?: string;
  presentation: ProjectPresentation;
  drawingType: string;
  style: string;
  heroImage: string;
  /** Set only when the cover photo (heroImage) is portrait — grid/tile rendering uses this to avoid force-cropping it into a landscape box. Undefined means landscape (the common case). */
  coverOrientation?: "portrait";
  galleryImages?: string[];
  overview: string;
  designConcept: string;
  spacePlanning: string[];
  materialPalette: string[];
  colorPalette: string[];
  features: string[];
  lightingFeatures: string[];
  decorativeElements: string[];
  keyFeatures: string[];
  visualIdentity: string;
  keywords: string[];

  // --- Site-plan-only fields (architecturalplan-*) ---------------------
  /** Site-plan counterpart to `designConcept` — the planning-level idea. */
  planningConcept?: string;
  /** Site-plan counterpart to `designConcept` — what the plan is meant to achieve. */
  designIntent?: string;
  /** Zones/uses across a site plan (e.g. "Residential Zone", "Central Plaza") — distinct from `spacePlanning`, which is interior-room planning. */
  spatialOrganization?: string[];
  architecturalHighlights?: string[];
  planningFeatures?: string[];
  circulationStrategy?: string;

  // --- Elevation-only fields (elevation-*) ------------------------------
  facadeComposition?: string[];
  /** Elevation counterpart to `features` — building/façade features rather than interior-room features. */
  architecturalFeatures?: string[];

  // --- Shared by site plans and elevations ------------------------------
  landscapeFeatures?: string[];
}
