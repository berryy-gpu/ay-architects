"use client";

import type { PortfolioFilter } from "@/types/portfolio";

export type { PortfolioFilter };

export interface CategoryFilterOption {
  value: PortfolioFilter;
  label: string;
  count: number;
}

interface CategoryFilterProps {
  options: CategoryFilterOption[];
  value: PortfolioFilter;
  onChange: (value: PortfolioFilter) => void;
}

export function CategoryFilter({
  options,
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <nav aria-label="Filter projects by category">
      <ul className="flex items-baseline gap-x-6 overflow-x-auto whitespace-nowrap pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:gap-x-7 sm:gap-y-3 sm:whitespace-normal [&::-webkit-scrollbar]:hidden">
        {options.map((option) => {
          const isActive = value === option.value;

          return (
            <li key={option.value} className="shrink-0">
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(option.value)}
                className={`relative pb-1.5 font-sans text-[10px] font-light uppercase tracking-[0.16em] transition-colors duration-300 ${
                  isActive
                    ? "text-foreground"
                    : "text-foreground/45 hover:text-foreground/75"
                }`}
              >
                {option.label}
                <span
                  className={`absolute bottom-0 left-0 h-px w-full origin-left bg-foreground/60 transition-transform duration-300 ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden="true"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
