export interface SpecEntry {
  label: string;
  items?: string[];
}

interface SpecGridProps {
  entries: SpecEntry[];
}

/**
 * A responsive, height-agnostic card grid for the project's spec fields.
 * Uses CSS multi-column layout (not CSS grid) specifically so a 10-item
 * card and a 3-item card can sit in the same row without leaving a hole —
 * true masonry, not a fixed-row grid. Cards with no content are dropped
 * before rendering, so the page never shows an empty section.
 */
export function SpecGrid({ entries }: SpecGridProps) {
  const visible = entries.filter((entry) => entry.items && entry.items.length > 0);
  if (visible.length === 0) return null;

  return (
    <div
      data-detail-section
      className="translate-y-3 opacity-0 sm:columns-2 sm:gap-8 lg:columns-3"
    >
      {visible.map((entry) => (
        <div
          key={entry.label}
          className="mb-8 break-inside-avoid rounded-sm border border-ink/10 p-6"
        >
          <h3 className="font-sans text-[11px] uppercase tracking-[0.3em] text-stone">
            {entry.label}
          </h3>
          <ul className="mt-4 divide-y divide-ink/10">
            {entry.items!.map((item) => (
              <li
                key={item}
                className="py-2 font-sans text-sm text-ink/80 first:pt-0 last:pb-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
