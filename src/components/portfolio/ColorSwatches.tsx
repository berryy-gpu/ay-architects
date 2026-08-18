import { isLightColorToken, resolveColorToken } from "@/lib/colorTokens";

interface ColorSwatchesProps {
  colors: string[];
}

/**
 * Renders a color palette as a row of named swatches rather than a text
 * list — the single highest-impact change for making each project page
 * feel visually distinct. Resolves through `resolveColorToken`, which
 * never throws, so an unmapped name still renders (as a neutral fallback)
 * rather than breaking the page.
 */
export function ColorSwatches({ colors }: ColorSwatchesProps) {
  if (colors.length === 0) return null;

  return (
    <div
      data-detail-section
      className="flex translate-y-3 flex-wrap gap-x-8 gap-y-5 opacity-0"
    >
      {colors.map((name) => {
        const hex = resolveColorToken(name);
        return (
          <div key={name} className="flex flex-col items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-9 w-9 rounded-full ${
                isLightColorToken(hex) ? "border border-accent-secondary/30" : ""
              }`}
              style={{ backgroundColor: hex }}
            />
            <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-foreground/70">
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
