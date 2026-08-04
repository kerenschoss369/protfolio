import { notFound } from "next/navigation";

import { CaseStudyArticle } from "@/components/case-study/CaseStudyArticle";
import { createPageMetadata } from "@/lib/metadata";
import { getProjectBySlug, getProjectSlugs } from "@/lib/project-utils";

type WorkProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/** Only known project slugs are valid; unknown paths use the not-found page. */
export const dynamicParams = false;

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
    description:
      project.slug === "clinical-follow-up-detector"
        ? `${project.shortDescription} Demonstration only—not clinically validated, not for medical decision-making, not for real patient data, and not HIPAA compliant.`
        : project.shortDescription,
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
