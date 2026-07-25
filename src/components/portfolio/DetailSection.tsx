interface DetailSectionProps {
  label: string;
  text?: string;
  items?: string[];
}

/**
 * A labeled block for a single metadata field. Renders nothing when the
 * field is empty — the detail page must never show placeholders for
 * content that hasn't been provided yet.
 */
export function DetailSection({ label, text, items }: DetailSectionProps) {
  const hasText = Boolean(text && text.trim().length > 0);
  const hasItems = Boolean(items && items.length > 0);

  if (!hasText && !hasItems) return null;

  return (
    <div
      data-detail-section
      className="translate-y-3 border-t border-ink/10 py-10 opacity-0"
    >
      <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
        {label}
      </h3>

      {hasText ? (
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-ink/80">
          {text}
        </p>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
          {items!.map((item) => (
            <li key={item} className="font-sans text-base text-ink/80">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
