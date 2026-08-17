import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

const HOMEPAGE_LIMIT = 8;

export function Portfolio() {
  return (
    <section
      id="projects"
      className="relative bg-paper px-8 py-24 sm:px-12 md:px-16 md:py-32"
    >
      <PortfolioGrid
        limit={HOMEPAGE_LIMIT}
        archiveHref="/portfolio"
        eyebrow="Portfolio"
      />
    </section>
  );
}
