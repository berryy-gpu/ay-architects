import type { Metadata } from "next";
import Link from "next/link";

import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PORTFOLIO_FILTERS } from "@/lib/portfolio";
import { buildMetadata } from "@/lib/seo";
import type { PortfolioFilter } from "@/types/portfolio";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Browse the full AY Architects project gallery — Lahore-based interior design and architecture across bedrooms, kitchens, bathrooms, dining rooms, offices, elevations, and more.",
  path: "/portfolio",
});

interface PortfolioArchivePageProps {
  searchParams: Promise<{ category?: string }>;
}

function resolveFilter(category: string | undefined): PortfolioFilter {
  const match = PORTFOLIO_FILTERS.find((option) => option.value === category);
  return match?.value ?? "all";
}

export default async function PortfolioArchivePage({
  searchParams,
}: PortfolioArchivePageProps) {
  const { category } = await searchParams;
  const initialFilter = resolveFilter(category);

  return (
    <main className="bg-background px-8 pt-32 pb-24 sm:px-12 md:px-16 md:pt-40 md:pb-32">
      <Link
        href="/#projects"
        className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-foreground/70 transition-colors duration-300 hover:text-foreground"
      >
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-x-1"
        >
          ←
        </span>
        Portfolio
      </Link>

      <div className="mt-12 md:mt-16">
        <PortfolioGrid initialFilter={initialFilter} eyebrow="Full Archive" />
      </div>
    </main>
  );
}
