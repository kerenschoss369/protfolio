import Link from "next/link";
import { notFound } from "next/navigation";

import { isConfiguredHttpUrl } from "@/lib/links";
import { createPageMetadata } from "@/lib/metadata";
import {
  getCollaborationLabel,
  getProjectBySlug,
  getProjectSlugs,
  isPendingCollaboration,
  isTeamAttributed,
} from "@/lib/project-utils";

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
    return createPageMetadata({
      title: "Project not found",
      path: `/work/${slug}`,
    });
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

  return (
    <article className="mx-auto w-full max-w-[1480px] px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-6">
        <Link
          href="/work"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          ← All work
        </Link>
      </p>

      <header className="max-w-3xl space-y-4">
        <p className="font-mono text-sm text-[var(--muted)]">
          {project.category}
          {project.dates.display ? ` · ${project.dates.display}` : null}
        </p>
        <h1 className="font-serif text-4xl tracking-tight">{project.title}</h1>
        <p className="text-base leading-7">{project.shortDescription}</p>
        <p className="text-sm text-[var(--muted)]">
          {getCollaborationLabel(project.collaboration)}
          {isTeamAttributed(project.collaboration)
            ? " — not sole authorship."
            : null}
          {isPendingCollaboration(project.collaboration)
            ? ` — ${project.collaboration.summary}`
            : null}
        </p>
      </header>

      {project.safetyNote ? (
        <aside
          className="mt-8 max-w-3xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-4 text-sm leading-6"
          aria-label="Safety notice"
        >
          {project.safetyNote}
        </aside>
      ) : null}

      {project.technologyStack.length > 0 ? (
        <section className="mt-10 max-w-3xl space-y-3">
          <h2 className="text-xl tracking-tight">Technology</h2>
          <ul className="flex flex-wrap gap-2">
            {project.technologyStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-[var(--border-subtle)] px-2 py-1 font-mono text-xs"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10 max-w-3xl space-y-3 text-sm text-[var(--muted)]">
        <h2 className="text-xl tracking-tight text-[var(--foreground)]">
          Links
        </h2>
        <ul className="space-y-2">
          {isConfiguredHttpUrl(project.repositoryUrl) ? (
            <li>
              <a
                href={project.repositoryUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Repository
              </a>
            </li>
          ) : null}
          {isConfiguredHttpUrl(project.liveUrl) ? (
            <li>
              <a
                href={project.liveUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Live demo
              </a>
            </li>
          ) : null}
          {!isConfiguredHttpUrl(project.repositoryUrl) &&
          !isConfiguredHttpUrl(project.liveUrl) ? (
            <li>No public links configured yet.</li>
          ) : null}
        </ul>
      </section>
    </article>
  );
}
