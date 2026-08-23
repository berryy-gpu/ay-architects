import Link from "next/link";

import { JustifiedGrid } from "@/components/portfolio/JustifiedGrid";
import { ALL_PROJECTS } from "@/data/portfolio";

// A glimpse, not a preview grid: one strongest/most-photogenic project from
// each of six different categories, for variety rather than repeating a
// category. Elevations (not Architectural Plans) represents "Architecture"
// here — Architectural Plans are technical line-drawings, all portrait-only
// with no landscape cover among them, weaker photography for this row.
// "casa-aurelia" and "the-threshold" were deliberately skipped for the
// Elevations pick even though they're strong covers — both already appear
// higher up this same page in the Featured Projects sticky sequence.
const GLIMPSE_SLUGS = [
  "bedroom-03",
  "bathroom-05",
  "tvlounge-06",
  "kitchen-01",
  "diningroom-03",
  "the-pavilion",
];

const GLIMPSE_PROJECTS = GLIMPSE_SLUGS.map((slug) =>
  ALL_PROJECTS.find((project) => project.slug === slug)
).filter((project): project is NonNullable<typeof project> => Boolean(project));

export function Portfolio() {
  return (
    <section
      id="projects"
      className="relative bg-background px-8 py-24 sm:px-12 md:px-16 md:py-32"
    >
      <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-foreground/70">
        Portfolio
      </p>
      <h2 className="font-display text-4xl text-foreground sm:text-5xl">
        A Glimpse of the Work
      </h2>

      <div className="mt-16 md:mt-20">
        <JustifiedGrid projects={GLIMPSE_PROJECTS} />
      </div>

      <div className="mt-16 flex justify-center md:mt-20">
        <Link
          href="/portfolio"
          className="group relative font-sans text-xs uppercase tracking-[0.3em] text-foreground"
        >
          See Full Work
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </Link>
      </div>
    </section>
  );
}
