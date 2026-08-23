// Root cause of the localhost-in-production sitemap/robots bug: this used
// to be `process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"` — a
// fallback that silently wins whenever that env var isn't set, in *any*
// environment, including production. It was never confirmed set in the
// Vercel project's Production scope, so production was quietly falling
// through to the dev default. Fixed so the *default itself* is the real
// canonical domain — an env var can still override it (e.g. for a staging
// deploy on a different domain), but production no longer depends on one
// being configured correctly to avoid shipping localhost URLs. Confirm/set
// NEXT_PUBLIC_SITE_URL in Vercel (Production scope) anyway, for explicitness
// and so preview deploys can point at themselves if ever needed — see the
// SEO report for how to verify this.
const PRODUCTION_URL = "https://www.ayarchitects.site";
const DEV_URL = "http://localhost:3000";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "development" ? DEV_URL : PRODUCTION_URL);

export const siteConfig = {
  name: "AY Architects",
  title: "AY Architects — Architecture & Interior Design",
  description:
    "AY Architects is a Lahore-based architecture and interior design studio crafting premium, editorial-grade spaces — residential architecture, interiors, and 3D visualization.",
  url: siteUrl,
  /** 1200x630 (OG spec ratio), cropped from a real project photo — not stretched. */
  defaultOgImage: "/og-default.jpg",
} as const;
