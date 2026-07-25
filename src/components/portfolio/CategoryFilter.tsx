"use client";

import type { PortfolioFilter } from "@/types/portfolio";

export type { PortfolioFilter };

export interface CategoryFilterOption {
  value: PortfolioFilter;
  label: string;
}

interface CategoryFilterProps {
  options: CategoryFilterOption[];
  value: PortfolioFilter;
  onChange: (value: PortfolioFilter) => void;
}

export function CategoryFilter({ options, value, onChange }: CategoryFilterProps) {
  return (
    <div
      aria-label="Filter projects by category"
      className="flex flex-wrap items-center gap-y-3 divide-x divide-ink/15"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 first:pl-0 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
            value === option.value
              ? "text-ink"
              : "text-ink/40 hover:text-ink/70"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
