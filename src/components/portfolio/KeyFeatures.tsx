interface KeyFeaturesProps {
  items: string[];
}

/**
 * Key Features is always the ten-item summary — rendered as chips rather
 * than another spec-grid card so it reads as the takeaway, not one more
 * list among many.
 */
export function KeyFeatures({ items }: KeyFeaturesProps) {
  if (items.length === 0) return null;

  return (
    <div data-detail-section className="translate-y-3 opacity-0">
      <h3 className="font-sans text-[11px] uppercase tracking-[0.3em] text-stone">
        Key Features
      </h3>
      <div className="mt-5 flex flex-wrap gap-3">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-ink/15 px-4 py-1.5 font-sans text-xs text-ink/80"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
