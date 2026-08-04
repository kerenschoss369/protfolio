import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";
import {
  getAllProjects,
  getCollaborationLabel,
  isTeamAttributed,
} from "@/lib/project-utils";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Selected software projects by Keren Schoss spanning full-stack, AI, and production frontend work.",
  path: "/work",
});

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-3">
        <h1 className="font-serif text-4xl tracking-tight">Work</h1>
        <p className="text-[var(--muted)]">
          Case studies and engineering practice. Detailed narratives and
          interactive demonstrations will be added in later phases.
        </p>
      </header>

      <ul className="mt-12 space-y-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              className="block border-b border-[var(--border-subtle)] py-5"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="text-xl font-medium">{project.title}</h2>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {project.category}
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                {project.shortDescription}
              </p>
              <p className="mt-2 text-xs text-[var(--muted)]">
                {getCollaborationLabel(project.collaboration)}
                {isTeamAttributed(project.collaboration)
                  ? " — not sole authorship"
                  : null}
              </p>
              {project.safetyNote ? (
                <p className="mt-2 text-xs text-[var(--muted)]">
                  Includes mandatory safety disclaimer
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
