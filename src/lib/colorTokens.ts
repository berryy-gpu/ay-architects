/**
 * Maps the free-text color names used across `colorPalette` fields to a
 * concrete hex value for swatch rendering. Keyed case-insensitively/trimmed
 * via `resolveColorToken` — never index this map directly.
 */
const COLOR_TOKEN_GROUPS: Array<[string[], string]> = [
  [["White"], "#FFFFFF"],
  [["Soft White"], "#F7F7F5"],
  [["Warm White"], "#F5F0E8"],
  [["Cool White"], "#F0F4F8"],
  [["Ivory"], "#F7F3E9"],
  [["Ivory White"], "#FAF7F0"],
  [["Cream"], "#F3EADA"],
  [["Cream Beige"], "#EFE3CE"],
  [["Beige"], "#E5D9C3"],
  [["Warm Beige"], "#E8DCC8"],
  [["Soft Beige"], "#EFE6D6"],
  [["Sand Beige"], "#E3D5BB"],
  [["Ivory Beige"], "#EFE4D2"],
  [["Gloss Beige"], "#E7DCC9"],
  [["Champagne Beige"], "#E8DCC0"],
  [["Earth Beige"], "#D8C7A8"],
  [["Sand"], "#E0D3BC"],
  [["Sand Stone"], "#DCC9A8"],
  [["Taupe", "Soft Taupe", "Warm Taupe"], "#B8A894"],
  [["White Marble"], "#F4F2ED"],
  [["Gold Veined Marble"], "#EFE7D6"],
  [["Black Marble"], "#23201E"],
  [["Natural Stone"], "#B5AFA3"],
  [["Natural Stone Grey"], "#B0AAA0"],
  [["Gold"], "#C9A227"],
  [["Soft Gold Lighting"], "#E0B96A"],
  [["Bronze", "Bronze Accents"], "#8C6239"],
  [["Bronze Lighting", "Bronze Interior Lighting"], "#C08B4F"],
  [["Silver"], "#C0C4C8"],
  [["Warm LED"], "#F2C98A"],
  [["Walnut", "Walnut Brown"], "#6B4A2F"],
  [["Warm Walnut"], "#7A5335"],
  [["Dark Walnut"], "#4A3221"],
  [["Natural Wood", "Warm Wood"], "#B08A5E"],
  [["Natural Cane"], "#C9A66B"],
  [["Light Oak"], "#C9A97A"],
  [["Brown", "Dark Brown"], "#5C4231"],
  [["Chocolate Brown"], "#4B3425"],
  [["Terracotta"], "#C1694F"],
  [["Black"], "#111111"],
  [["Matte Black", "Black Accents"], "#1A1A1A"],
  [["Charcoal"], "#2E2E2E"],
  [["Charcoal Black"], "#242424"],
  [["Charcoal Grey"], "#3A3A3A"],
  [["Graphite", "Graphite Grey"], "#383A3C"],
  [["Grey"], "#8C8C8C"],
  [["Warm Grey"], "#8C8577"],
  [["Soft Grey"], "#A8A8A8"],
  [["Light Grey"], "#C4C4C4"],
  [["Stone Grey"], "#9A958C"],
  [["Concrete Grey"], "#A3A3A0"],
  [["Light Concrete Grey"], "#C6C4BE"],
  [["Asphalt Grey"], "#4F5052"],
  [["Roof Grey"], "#6E7379"],
  [["Navy Blue"], "#1B2A4A"],
  [["Midnight Blue"], "#16233F"],
  [["Aqua Blue"], "#4FA8C5"],
  [["Crystal Blue"], "#BCD8E6"],
  [["Glass Blue"], "#A8C6D8"],
  [["Green", "Natural Green", "Green Accents", "Landscape Green"], "#4F7A3F"],
  [["Forest Green"], "#2F4F3A"],
  [["Soft Green"], "#8CA98A"],
  [["Olive Green"], "#6B7043"],
];

const COLOR_TOKEN_LOOKUP: Record<string, string> = {};
for (const [names, hex] of COLOR_TOKEN_GROUPS) {
  for (const name of names) {
    COLOR_TOKEN_LOOKUP[name.trim().toLowerCase()] = hex;
  }
}

/** Neutral stand-in for any color name not yet in the token map. */
export const FALLBACK_COLOR_TOKEN = "#B5AFA3";

/**
 * Resolves a free-text color name (e.g. "Warm Walnut") to a hex value.
 * Case-insensitive and whitespace-trimmed. Never throws — an unrecognized
 * name falls back to a neutral swatch rather than crashing the page.
 */
export function resolveColorToken(name: string): string {
  return COLOR_TOKEN_LOOKUP[name.trim().toLowerCase()] ?? FALLBACK_COLOR_TOKEN;
}

/**
 * True if `name` has a real entry in the token map. Checks map presence
 * directly rather than comparing the resolved hex against
 * `FALLBACK_COLOR_TOKEN` — a real token can legitimately share the
 * fallback's hex value, which would otherwise read as a false miss.
 */
export function hasColorToken(name: string): boolean {
  return name.trim().toLowerCase() in COLOR_TOKEN_LOOKUP;
}

/** Very light tokens need a hairline border to stay visible on a light background. */
export function isLightColorToken(hex: string): boolean {
  const lightHexes = new Set([
    "#FFFFFF",
    "#F7F7F5",
    "#F5F0E8",
    "#F0F4F8",
    "#F7F3E9",
    "#FAF7F0",
    "#F3EADA",
  ]);
  return lightHexes.has(hex.toUpperCase());
}

/** Every unique color name referenced across `ALL_PROJECTS`, for the coverage check in scripts/verify-color-tokens.ts. */
export function getAllColorTokenGroupNames(): string[] {
  return COLOR_TOKEN_GROUPS.flatMap(([names]) => names);
}
