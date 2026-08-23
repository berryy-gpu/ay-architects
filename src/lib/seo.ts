import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

interface PageMetadataInput {
  /** Plain string — the root layout's title template ("%s — AY Architects") applies automatically. Omit to use the site default title as-is. */
  title?: string;
  description?: string;
  /** Path only, e.g. "/portfolio" or "/portfolio/casa-aurelia" — resolved against metadataBase for both the canonical tag and OG/Twitter URLs. "/" for the homepage. */
  path: string;
  /** Path or absolute URL to a real photo — falls back to the sitewide default OG image. Not force-cropped to 1200x630 here; see the report for why that's fine for per-project images. */
  image?: string;
  imageAlt?: string;
}

/**
 * One place that builds canonical + Open Graph + Twitter Card metadata, so
 * no page hand-rolls full https://www.ayarchitects.site/... URLs itself —
 * see the SEO audit report for why that matters (bare-domain vs www
 * duplicate-content risk). Next.js's metadata objects for fields like
 * `openGraph` are replaced wholesale by whichever segment defines them
 * (not deep-merged with the root layout's), so every call here is
 * self-sufficient rather than relying on the root layout to fill gaps.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
}: PageMetadataInput): Metadata {
  const resolvedDescription = description ?? siteConfig.description;
  const resolvedImage = image ?? siteConfig.defaultOgImage;
  const resolvedTitle = title ?? siteConfig.title;

  return {
    title,
    description: resolvedDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage],
    },
  };
}
