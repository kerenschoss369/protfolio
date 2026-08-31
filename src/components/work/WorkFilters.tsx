"use client";

import { LayoutGroup, m } from "motion/react";
import { useId, useState } from "react";

import { WorkProjectCard } from "@/components/work/WorkProjectCard";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import type { Project } from "@/data/content-types";
import { springs } from "@/lib/animation-config";
import { cn } from "@/lib/cn";
import {
  filterProjects,
  WORK_FILTERS,
  type WorkFilterId,
} from "@/lib/project-utils";

type WorkFiltersProps = {
  projects: readonly Project[];
};

export function WorkFilters({ projects }: WorkFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<WorkFilterId>("all");
  const labelId = useId();
  const reducedMotion = useReducedMotionPreference();
  const filtered = filterProjects(projects, activeFilter);
  const featured = filtered.filter((project) => project.featured);
  const additional = filtered.filter((project) => !project.featured);

  return (
    <div className="space-y-12 md:space-y-16">
      <div className="space-y-4">
        <p
          id={labelId}
          className="text-muted text-xs tracking-widest uppercase"
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
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-1 text-xs tracking-widest uppercase transition-colors",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
                  selected
                    ? "border-foreground text-foreground"
                    : "border-border-subtle text-muted hover:border-foreground hover:text-foreground",
                )}
              >
                <span>{filter.label}</span>
                <span className="text-[var(--landing-number)]" aria-hidden>
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

      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {filtered.length === 0
          ? "No projects match this filter. Try another category or choose All."
          : `Showing ${filtered.length} ${filtered.length === 1 ? "project" : "projects"}.`}
      </p>

      {filtered.length === 0 ? (
        <div className="border-border-subtle rounded-[var(--landing-radius-card)] border px-5 py-10">
          <p className="text-foreground text-pretty">
            No projects match this filter. Try another category or choose All.
          </p>
        </div>
      ) : (
        <LayoutGroup>
          <div className="space-y-14 md:space-y-20">
            {featured.length > 0 ? (
              <section aria-labelledby="featured-work-heading" className="space-y-6">
                <h2
                  id="featured-work-heading"
                  className="landing-case-section-title"
                >
                  Featured work
                </h2>
                <ul className="space-y-5">
                  {featured.map((project, index) =>
                    reducedMotion ? (
                      <li key={project.slug}>
                        <WorkProjectCard
                          project={project}
                          emphasis="featured"
                          index={index}
                        />
                      </li>
                    ) : (
                      <m.li
                        key={project.slug}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={springs.layout}
                      >
                        <WorkProjectCard
                          project={project}
                          emphasis="featured"
                          index={index}
                        />
                      </m.li>
                    ),
                  )}
                </ul>
              </section>
            ) : null}

            {additional.length > 0 ? (
              <section
                aria-labelledby="additional-work-heading"
                className="space-y-2"
              >
                <h2
                  id="additional-work-heading"
                  className="landing-case-section-title"
                >
                  Additional engineering practice
                </h2>
                <ul className="space-y-0">
                  {additional.map((project, index) =>
                    reducedMotion ? (
                      <li key={project.slug}>
                        <WorkProjectCard
                          project={project}
                          emphasis="compact"
                          index={featured.length + index}
                        />
                      </li>
                    ) : (
                      <m.li
                        key={project.slug}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={springs.layout}
                      >
                        <WorkProjectCard
                          project={project}
                          emphasis="compact"
                          index={featured.length + index}
                        />
                      </m.li>
                    ),
                  )}
                </ul>
              </section>
            ) : null}
          </div>
        </LayoutGroup>
      )}
    </div>
  );
}
