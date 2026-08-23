import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/portfolio/ProjectDetail";
import {
  ALL_PROJECTS,
  getProjectBySlug,
  getRelatedProjects,
} from "@/data/portfolio";
import { CATEGORY_LABELS } from "@/lib/portfolio";
import { buildMetadata } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  const description =
    project.overview || `${project.title} — ${CATEGORY_LABELS[project.category]}`;

  return buildMetadata({
    title: project.title,
    description,
    path: `/portfolio/${project.slug}`,
    // Projects with no matching photography yet have heroImage: "" — fall
    // through to the sitewide default OG image rather than an empty src.
    image: project.heroImage || undefined,
    imageAlt: project.title,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project);

  return <ProjectDetail project={project} relatedProjects={relatedProjects} />;
}
