"use client";

import { useId, useState } from "react";

import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import { cn } from "@/lib/cn";
import {
  filterProjects,
  WORK_FILTERS,
  type WorkFilterId,
} from "@/lib/project-utils";

import { WorkProjectCard } from "@/components/work/WorkProjectCard";

type WorkFiltersProps = {
  projects: readonly Project[];
};

export function WorkFilters({ projects }: WorkFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<WorkFilterId>("all");
  const labelId = useId();
  const filtered = filterProjects(projects, activeFilter);
  const featured = filtered.filter((project) => project.featured);
  const additional = filtered.filter((project) => !project.featured);

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p
          id={labelId}
          className="text-muted font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase"
        >
          Filter projects
        </p>
        <div
          role="group"
          aria-labelledby={labelId}
          className="flex flex-wrap gap-2"
        >
          {WORK_FILTERS.map((filter) => {
            const selected = activeFilter === filter.id;
            const count =
              filter.id === "all"
                ? projects.length
                : filterProjects(projects, filter.id).length;

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "inline-flex min-h-[var(--touch-target)] items-center gap-2 rounded-[var(--radius-md)] border px-3 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase transition-[background-color,border-color,color] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                  "focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
                  selected
                    ? "border-accent bg-accent-muted text-accent"
                    : "border-border-subtle text-muted hover:border-border-strong hover:text-foreground",
                )}
              >
                <span>{filter.label}</span>
                <span className="text-steel" aria-hidden>
                  {count}
                </span>
                <span className="sr-only">
                  {selected ? ", selected" : ""}, {count} projects
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          role="status"
          className="border-border-subtle rounded-[var(--radius-md)] border px-4 py-8"
        >
          <Text className="text-pretty">
            No projects match this filter. Try another category or choose All.
          </Text>
        </div>
      ) : (
        <div className="space-y-12">
          {featured.length > 0 ? (
            <section
              aria-labelledby="featured-work-heading"
              className="space-y-6"
            >
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2
                  id="featured-work-heading"
                  className="font-sans text-[length:var(--text-section)] font-medium tracking-tight"
                >
                  Featured work
                </h2>
                <Tag variant="steel">{featured.length} projects</Tag>
              </div>
              <ul className="space-y-0">
                {featured.map((project) => (
                  <li key={project.slug}>
                    <WorkProjectCard project={project} emphasis="featured" />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {additional.length > 0 ? (
            <section
              aria-labelledby="additional-work-heading"
              className="space-y-6"
            >
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2
                  id="additional-work-heading"
                  className="font-sans text-[length:var(--text-section)] font-medium tracking-tight"
                >
                  Additional engineering practice
                </h2>
                <Tag variant="steel">{additional.length} entries</Tag>
              </div>
              <ul className="space-y-0">
                {additional.map((project) => (
                  <li key={project.slug}>
                    <WorkProjectCard project={project} emphasis="compact" />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}
