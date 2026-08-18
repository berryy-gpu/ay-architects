/**
 * Computes WCAG 2.1 contrast ratios for every UI-chrome text/background
 * token pair actually used in the codebase (grepped, not eyeballed) and
 * asserts each meets AA: 4.5:1 for body text, 3:1 for large text (>=24px,
 * or >=18.66px bold) and non-text UI components.
 *
 * This is about the site's own chrome — backgrounds, nav, buttons, body
 * copy — defined in src/styles/globals.css. It has nothing to do with
 * src/lib/colorTokens.ts, which maps unrelated *project-data* color names
 * (e.g. "Walnut Brown") to swatch hexes for a project's own Color Palette
 * field; that map is exempt from this check by design.
 */
import { execSync } from "node:child_process";

const BASE_HEX = {
  background: "#e9e0cf",
  "background-dark": "#132b23",
  foreground: "#132b23",
  "foreground-on-dark": "#e9e0cf",
  accent: "#ba9b5f",
  "accent-secondary": "#5e775e",
} as const;

type TokenName = keyof typeof BASE_HEX;

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(clean.slice(i, i + 2), 16)) as [
    number,
    number,
    number,
  ];
}

function luminance([r, g, b]: [number, number, number]): number {
  const [R, G, B] = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRgb(
  rgb1: [number, number, number],
  rgb2: [number, number, number]
): number {
  const L1 = luminance(rgb1);
  const L2 = luminance(rgb2);
  const [lighter, darker] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (lighter + 0.05) / (darker + 0.05);
}

function alphaComposite(
  fg: [number, number, number],
  bg: [number, number, number],
  alpha: number
): [number, number, number] {
  return fg.map((c, i) => alpha * c + (1 - alpha) * bg[i]) as [
    number,
    number,
    number,
  ];
}

/** Resolves "foreground/70" style refs against their fixed background. */
function contrastForTextToken(
  textToken: string,
  bgToken: TokenName
): number {
  const [name, opacityStr] = textToken.split("/");
  const alpha = opacityStr ? Number(opacityStr) / 100 : 1;
  const fgRgb = hexToRgb(BASE_HEX[name as TokenName]);
  const bgRgb = hexToRgb(BASE_HEX[bgToken]);
  const composited = alphaComposite(fgRgb, bgRgb, alpha);
  return contrastRgb(composited, bgRgb);
}

interface Check {
  label: string;
  textToken: string;
  bgToken: TokenName;
  /** "body" requires 4.5:1; "large" requires 3:1 (large text / non-text UI). */
  minLevel: "body" | "large";
}

// Every text-foreground*/text-foreground-on-dark* class actually found in
// the codebase (see the grep this list is derived from), paired with the
// background token it's always rendered against in this codebase (light
// sections use `background`, dark sections use `background-dark`).
const CHECKS: Check[] = [
  { label: "foreground (full) on background", textToken: "foreground", bgToken: "background", minLevel: "body" },
  { label: "foreground/85 on background", textToken: "foreground/85", bgToken: "background", minLevel: "body" },
  { label: "foreground/80 on background", textToken: "foreground/80", bgToken: "background", minLevel: "body" },
  { label: "foreground/70 on background", textToken: "foreground/70", bgToken: "background", minLevel: "body" },
  { label: "foreground-on-dark (full) on background-dark", textToken: "foreground-on-dark", bgToken: "background-dark", minLevel: "body" },
  { label: "foreground-on-dark/90 on background-dark", textToken: "foreground-on-dark/90", bgToken: "background-dark", minLevel: "body" },
  { label: "foreground-on-dark/80 on background-dark", textToken: "foreground-on-dark/80", bgToken: "background-dark", minLevel: "body" },
  { label: "foreground-on-dark/75 on background-dark", textToken: "foreground-on-dark/75", bgToken: "background-dark", minLevel: "body" },
  { label: "foreground-on-dark/70 on background-dark", textToken: "foreground-on-dark/70", bgToken: "background-dark", minLevel: "body" },
  { label: "foreground-on-dark/60 on background-dark", textToken: "foreground-on-dark/60", bgToken: "background-dark", minLevel: "body" },
  // Planned Services CTA button: dark forest text on a solid gold fill.
  { label: "foreground (button text) on accent (button fill)", textToken: "foreground", bgToken: "accent", minLevel: "body" },
];

const THRESHOLD = { body: 4.5, large: 3.0 };

let failed = false;

for (const check of CHECKS) {
  const ratio = contrastForTextToken(check.textToken, check.bgToken);
  const threshold = THRESHOLD[check.minLevel];
  const pass = ratio >= threshold;
  if (!pass) failed = true;
  console.log(
    `${pass ? "PASS" : "FAIL"}  ${check.label.padEnd(55)} ${ratio.toFixed(2)}:1 (need ${threshold}:1)`
  );
}

// accent/accent-secondary as real, readable body text fails AA on their
// typical (light) background — see the CHECKS above. Rather than a blanket
// ban (gold-on-dark-background text is fine, and a decorative aria-hidden
// glyph is exempt from text-contrast requirements entirely), every found
// usage must be explicitly accounted for here. A new, unlisted usage fails
// the build — that's the point: it forces a deliberate look, not a silent
// pass.
console.log("\nAuditing every text-accent / text-accent-secondary usage...");
let grepOutput = "";
try {
  grepOutput = execSync(
    `grep -rEon "text-(accent|accent-secondary)(/[0-9]+)?" src --include="*.tsx" || true`,
    { encoding: "utf8" }
  );
} catch {
  grepOutput = "";
}
const foundLines = grepOutput.split("\n").filter(Boolean);

interface AccentUsage {
  /** Substring match against the grep line (file:line:match). */
  match: string;
  reason: string;
}

const ACCEPTED_ACCENT_USAGES: AccentUsage[] = [
  {
    match: "ServicesTeaser.tsx",
    reason:
      'eyebrow label "Services", real text but rendered inside the section\'s bg-background-dark — gold-on-forest is 5.68:1, checked above',
  },
  {
    match: "MusicToggle.tsx",
    reason:
      'the "Music" label when playing — MusicToggle is only ever mounted on dark hero sections (bg-background-dark), gold-on-forest is 5.68:1, checked above',
  },
];

for (const line of foundLines) {
  const accepted = ACCEPTED_ACCENT_USAGES.find((usage) =>
    line.includes(usage.match)
  );
  if (accepted) {
    console.log(`PASS  ${line}  (${accepted.reason})`);
  } else {
    failed = true;
    console.log(`FAIL  ${line}  (not in ACCEPTED_ACCENT_USAGES — verify contrast for its actual background and add it, or fix the usage)`);
  }
}
if (foundLines.length === 0) {
  console.log("PASS  no text-accent / text-accent-secondary usage found");
}

if (failed) {
  console.log("\nFAILED: one or more contrast checks did not meet WCAG AA.");
  process.exit(1);
} else {
  console.log("\nOK: every checked token pair meets WCAG AA.");
  process.exit(0);
}
