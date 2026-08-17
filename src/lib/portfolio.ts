import type {
  PortfolioFilter,
  Project,
  ProjectAspect,
  ProjectCategory,
  ProjectImportance,
  ProjectPresentation,
  ProjectType,
} from "@/types/portfolio";

interface CreateProjectInput {
  slug: string;
  title: string;
  category: ProjectCategory;
  projectType: ProjectType;
  heroImage: string;
  presentation?: ProjectPresentation;
  drawingType?: string;
  style?: string;
  galleryImages?: string[];
  overview?: string;
  designConcept?: string;
  spacePlanning?: string;
  materialPalette?: string[];
  colorPalette?: string[];
  features?: string[];
  lightingFeatures?: string[];
  decorativeElements?: string[];
  keyFeatures?: string[];
  visualIdentity?: string;
  keywords?: string[];
}

const DEFAULT_PRESENTATION: ProjectPresentation = {
  importance: "standard",
  aspect: "landscape",
};

/**
 * Builds a Project with every descriptive field defaulted to empty.
 * Only structural fields (slug/title/category/projectType/heroImage) are
 * required — this is the "one new object" entry point category files use.
 * Extending this input later with new fields never requires touching
 * existing createProject() calls.
 */
export function createProject(input: CreateProjectInput): Project {
  return {
    slug: input.slug,
    title: input.title,
    category: input.category,
    projectType: input.projectType,
    presentation: input.presentation ?? DEFAULT_PRESENTATION,
    heroImage: input.heroImage,
    drawingType: input.drawingType ?? "",
    style: input.style ?? "",
    galleryImages: input.galleryImages,
    overview: input.overview ?? "",
    designConcept: input.designConcept ?? "",
    spacePlanning: input.spacePlanning ?? "",
    materialPalette: input.materialPalette ?? [],
    colorPalette: input.colorPalette ?? [],
    features: input.features ?? [],
    lightingFeatures: input.lightingFeatures ?? [],
    decorativeElements: input.decorativeElements ?? [],
    keyFeatures: input.keyFeatures ?? [],
    visualIdentity: input.visualIdentity ?? "",
    keywords: input.keywords ?? [],
  };
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  bathroom: "Bathrooms",
  bedroom: "Bedrooms",
  diningroom: "Dining Rooms",
  office: "Offices",
  elevation: "Elevations",
  architecturalplan: "Architectural Plans",
  livingroom: "Living Rooms",
  kitchen: "Kitchens",
  tvlounge: "TV Lounges",
  commercial: "Commercial",
  landscape: "Landscape",
};

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  "interior-design": "Interior Design",
  architecture: "Architecture",
};

/**
 * A fixed, deliberately ordered editorial hierarchy — not derived from
 * whichever categories currently have data, so the full intended taxonomy
 * (including categories with no projects yet) is always visible. "Architecture"
 * stands in as the umbrella for elevations + architectural plans; individual
 * room categories cover interior work directly, so no separate "Interior
 * Design" umbrella filter is listed alongside them.
 */
export const PORTFOLIO_FILTERS: { value: PortfolioFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "architecture", label: PROJECT_TYPE_LABELS.architecture },
  { value: "bathroom", label: CATEGORY_LABELS.bathroom },
  { value: "bedroom", label: CATEGORY_LABELS.bedroom },
  { value: "diningroom", label: CATEGORY_LABELS.diningroom },
  { value: "office", label: CATEGORY_LABELS.office },
  { value: "kitchen", label: CATEGORY_LABELS.kitchen },
  { value: "tvlounge", label: CATEGORY_LABELS.tvlounge },
  { value: "livingroom", label: CATEGORY_LABELS.livingroom },
  { value: "elevation", label: CATEGORY_LABELS.elevation },
  { value: "architecturalplan", label: CATEGORY_LABELS.architecturalplan },
  { value: "landscape", label: CATEGORY_LABELS.landscape },
  { value: "commercial", label: CATEGORY_LABELS.commercial },
];

const IMPORTANCE_SPAN: Record<ProjectImportance, string> = {
  primary: "col-span-12",
  secondary: "col-span-12 sm:col-span-8 lg:col-span-7",
  standard: "col-span-12 sm:col-span-6 lg:col-span-4",
};

const ASPECT_RATIO: Record<ProjectAspect, string> = {
  wide: "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]",
  landscape: "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/3]",
  square: "aspect-[4/5] sm:aspect-[4/5] lg:aspect-[1/1]",
  portrait: "aspect-[4/5] lg:aspect-[3/4]",
};

/**
 * The only place that turns a presentation config into actual CSS. The grid
 * and tiles never hardcode span/aspect themselves — change the look of every
 * "secondary" or every "wide" project across the whole archive by editing
 * the two tables above, without touching any project's data.
 */
export function resolvePresentation(presentation: ProjectPresentation): {
  span: string;
  aspect: string;
} {
  return {
    span: IMPORTANCE_SPAN[presentation.importance],
    aspect: ASPECT_RATIO[presentation.aspect],
  };
}

// --- Editorial compositions -------------------------------------------------
// A small, fixed set of handcrafted multi-image spreads. The Portfolio grid
// consumes a project list by repeatedly taking the next composition's worth
// of items — never an independent per-project span computed from index or
// masonry packing. Composition sizes are deliberately {1, 2, 3} so any
// remaining tail (1, 2, or 3 projects) always resolves to an exact match.

interface CompositionSlot {
  span: string;
  aspect: string;
}

interface Composition {
  name: "feature" | "trio" | "banner" | "pair";
  size: number;
  slots: CompositionSlot[];
}

const FEATURE: Composition = {
  name: "feature",
  size: 2,
  slots: [
    {
      span: "col-span-12 lg:col-span-8",
      aspect: "aspect-[4/5] lg:aspect-[3/2]",
    },
    {
      span: "col-span-12 lg:col-span-4",
      aspect: "aspect-[4/5] lg:aspect-[3/4]",
    },
  ],
};

const TRIO: Composition = {
  name: "trio",
  size: 3,
  slots: [
    {
      span: "col-span-12 sm:col-span-6 lg:col-span-4",
      aspect: "aspect-[4/5] lg:aspect-[1/1]",
    },
    {
      span: "col-span-12 sm:col-span-6 lg:col-span-4",
      aspect: "aspect-[4/5] lg:aspect-[1/1]",
    },
    {
      span: "col-span-12 sm:col-span-6 lg:col-span-4",
      aspect: "aspect-[4/5] lg:aspect-[1/1]",
    },
  ],
};

const BANNER: Composition = {
  name: "banner",
  size: 1,
  slots: [{ span: "col-span-12", aspect: "aspect-[4/5] lg:aspect-[21/9]" }],
};

const PAIR: Composition = {
  name: "pair",
  size: 2,
  slots: [
    {
      span: "col-span-12 lg:col-span-5",
      aspect: "aspect-[4/5] lg:aspect-[3/4]",
    },
    {
      span: "col-span-12 lg:col-span-7",
      aspect: "aspect-[4/5] lg:aspect-[4/3]",
    },
  ],
};

const COMPOSITION_SEQUENCE: Composition[] = [FEATURE, TRIO, BANNER, PAIR];
const COMPOSITION_BY_SIZE: Record<number, Composition> = {
  1: BANNER,
  2: PAIR,
  3: TRIO,
};

const IMPORTANCE_WEIGHT: Record<ProjectImportance, number> = {
  primary: 2,
  secondary: 1,
  standard: 0,
};

export interface ComposedSlot {
  project: Project;
  span: string;
  aspect: string;
}

/**
 * Groups an ordered project list into a repeating sequence of handcrafted
 * compositions and returns a flat, render-ready slot list (project + the
 * span/aspect its position in that composition earns it). Within a
 * multi-item composition, the higher-importance project takes the more
 * prominent slot — placement is an art-directed decision, not array order.
 */
export function composeProjects(projects: Project[]): ComposedSlot[] {
  const result: ComposedSlot[] = [];
  let index = 0;
  let step = 0;

  while (index < projects.length) {
    const remaining = projects.length - index;
    let composition = COMPOSITION_SEQUENCE[step % COMPOSITION_SEQUENCE.length];

    if (composition.size > remaining) {
      composition = COMPOSITION_BY_SIZE[remaining] ?? BANNER;
    }

    const chunk = projects
      .slice(index, index + composition.size)
      .sort(
        (a, b) =>
          IMPORTANCE_WEIGHT[b.presentation.importance] -
          IMPORTANCE_WEIGHT[a.presentation.importance]
      );

    chunk.forEach((project, slotIndex) => {
      const slot = composition.slots[slotIndex] ?? composition.slots[0];
      result.push({ project, span: slot.span, aspect: slot.aspect });
    });

    index += composition.size;
    step++;
  }

  return result;
}
