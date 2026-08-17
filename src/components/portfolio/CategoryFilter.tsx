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
      <ul className="flex items-baseline gap-x-8 overflow-x-auto whitespace-nowrap pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:gap-x-10 sm:gap-y-5 sm:whitespace-normal [&::-webkit-scrollbar]:hidden">
        {options.map((option) => {
          const isActive = value === option.value;

          return (
            <li key={option.value} className="shrink-0">
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(option.value)}
                className={`group relative pb-2 font-sans text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
                  isActive ? "text-ink" : "text-stone hover:text-ink/70"
                }`}
              >
                {option.label}
                <span className="ml-2 tracking-normal text-stone/60">
                  {option.count}
                </span>
                <span
                  className={`absolute bottom-0 left-0 h-px w-full origin-left bg-ink transition-transform duration-300 ease-out ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
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
