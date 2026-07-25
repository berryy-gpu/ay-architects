const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "AY Architects",
  title: "AY Architects — Architecture & Interior Design",
  description:
    "AY Architects is an architecture and interior design studio crafting premium, editorial-grade spaces.",
  url: siteUrl,
} as const;
