import Link from "next/link";

import { experience } from "@/data/experience";
import { portfolio } from "@/data/portfolio";
import { getFeaturedProjects } from "@/lib/project-utils";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata();

export default function HomePage() {
  const featured = getFeaturedProjects();
  const primaryExperience = experience[0];

  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 py-16 sm:px-6 lg:px-8">
      <section className="max-w-3xl space-y-6">
        <p className="font-mono text-sm text-[var(--muted)]">
          {portfolio.location}
        </p>
        <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          {portfolio.name}
        </h1>
        <p className="text-lg text-[var(--muted)]">{portfolio.title}</p>
        <p className="text-base leading-7 sm:text-lg">
          {portfolio.heroStatement}
        </p>
        <p className="text-[var(--muted)]">{portfolio.supportingStatement}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center rounded-md bg-[var(--accent)] px-4 text-[var(--accent-contrast)]"
          >
            View selected work
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-md border border-[var(--border-strong)] px-4"
          >
            Contact
          </Link>
        </div>
      </section>

      <section className="mt-20 space-y-6">
        <h2 className="text-2xl tracking-tight">Selected work</h2>
        <ul className="space-y-4">
          {featured.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="block border-b border-[var(--border-subtle)] py-4"
              >
                <p className="font-medium">{project.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {project.category}
                  {project.dates.display ? ` · ${project.dates.display}` : null}
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-6">
                  {project.shortDescription}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {primaryExperience ? (
        <section className="mt-20 max-w-3xl space-y-4">
          <h2 className="text-2xl tracking-tight">Professional experience</h2>
          <p className="font-medium">
            {primaryExperience.role} — {primaryExperience.organization}
          </p>
          <p className="text-sm text-[var(--muted)]">
            {primaryExperience.productContext} ·{" "}
            {primaryExperience.dates.display}
          </p>
          <p className="text-sm text-[var(--muted)]">
            {primaryExperience.confidentialityNote}
          </p>
        </section>
      ) : null}
    </div>
  );
}
