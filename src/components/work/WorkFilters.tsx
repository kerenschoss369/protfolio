"use client";

import { LayoutGroup, m } from "motion/react";
import { useId, useRef, useState } from "react";

import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
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
  const buttonRefs = useRef<Map<WorkFilterId, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    ready: false,
  });

  function updateIndicator(id: WorkFilterId) {
    const button = buttonRefs.current.get(id);
    const parent = button?.parentElement;
    if (!button || !parent) {
      return;
    }
    const parentRect = parent.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    setIndicator({
      left: buttonRect.left - parentRect.left,
      width: buttonRect.width,
      ready: true,
    });
  }

  function selectFilter(id: WorkFilterId) {
    setActiveFilter(id);
    requestAnimationFrame(() => updateIndicator(id));
  }

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
          className="relative flex flex-wrap gap-2"
          ref={(node) => {
            if (node && !indicator.ready) {
              requestAnimationFrame(() => updateIndicator(activeFilter));
            }
          }}
        >
          {!reducedMotion && indicator.ready ? (
            <m.span
              aria-hidden
              className="border-accent bg-accent-muted pointer-events-none absolute top-0 left-0 h-[var(--touch-target)] rounded-[var(--radius-md)] border"
              animate={{ x: indicator.left, width: indicator.width }}
              transition={springs.layout}
            />
          ) : null}
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
                ref={(node) => {
                  if (node) {
                    buttonRefs.current.set(filter.id, node);
                  } else {
                    buttonRefs.current.delete(filter.id);
                  }
                }}
                aria-pressed={selected}
                onClick={() => selectFilter(filter.id)}
                className={cn(
                  "pressable relative z-[1] inline-flex min-h-[var(--touch-target)] items-center gap-2 rounded-[var(--radius-md)] border px-3 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase",
                  "focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
                  selected
                    ? "text-accent border-transparent"
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
        <div className="border-border-subtle rounded-[var(--radius-md)] border px-4 py-8">
          <Text className="text-pretty">
            No projects match this filter. Try another category or choose All.
          </Text>
        </div>
      ) : (
        <LayoutGroup>
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
                  {featured.map((project) =>
                    reducedMotion ? (
                      <li key={project.slug}>
                        <WorkProjectCard
                          project={project}
                          emphasis="featured"
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
                  {additional.map((project) =>
                    reducedMotion ? (
                      <li key={project.slug}>
                        <WorkProjectCard project={project} emphasis="compact" />
                      </li>
                    ) : (
                      <m.li
                        key={project.slug}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={springs.layout}
                      >
                        <WorkProjectCard project={project} emphasis="compact" />
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
