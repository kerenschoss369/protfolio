import { notFound } from "next/navigation";

import { CaseStudyArticle } from "@/components/case-study/CaseStudyArticle";
import { createPageMetadata } from "@/lib/metadata";
import { getProjectBySlug, getProjectSlugs } from "@/lib/project-utils";

type WorkProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return createPageMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/work/${project.slug}`,
  });
}

export default async function WorkProjectPage({
  params,
}: WorkProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyArticle project={project} />;
}
