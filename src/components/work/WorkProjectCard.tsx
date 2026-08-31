"use client";

import { LiveProjectButton } from "@/components/landing/LiveProjectButton";
import { AcademEaseCardVisual } from "@/components/landing/visuals/AcademEaseCardVisual";
import { ClinicalCardVisual } from "@/components/landing/visuals/ClinicalCardVisual";
import { RealtimeCardVisual } from "@/components/landing/visuals/RealtimeCardVisual";
import { TapTapCardVisual } from "@/components/landing/visuals/TapTapCardVisual";
import { ViewTransitionLink } from "@/components/motion/ViewTransitionLink";
import type { Project } from "@/data/content-types";
import { CLINICAL_SAFETY_COMPACT } from "@/data/projects";
import { cn } from "@/lib/cn";
import {
  getCollaborationLabel,
  hasPublicCaseStudyPage,
  isTeamAttributed,
} from "@/lib/project-utils";
import { projectTitleTransitionName } from "@/lib/view-transitions";

type WorkProjectCardProps = {
  project: Project;
  emphasis: "featured" | "compact";
  index?: number;
};

function ProjectVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "clinical-follow-up-detector":
      return <ClinicalCardVisual />;
    case "realtime-gpt-cli":
      return <RealtimeCardVisual />;
    case "academease":
      return <AcademEaseCardVisual />;
    case "taptap-avengers":
      return <TapTapCardVisual />;
    default:
      return null;
  }
}

export function WorkProjectCard({
  project,
  emphasis,
  index = 0,
}: WorkProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const isFeatured = emphasis === "featured";
  const visual = <ProjectVisual slug={project.slug} />;
  const teamNote = isTeamAttributed(project.collaboration)
    ? project.collaboration.summary
    : undefined;
  const hasPage = hasPublicCaseStudyPage(project);
  const title = hasPage ? (
    <ViewTransitionLink
      href={`/work/${project.slug}`}
      className="transition-opacity hover:opacity-80 focus-visible:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      style={{
        viewTransitionName: projectTitleTransitionName(project.slug),
      }}
    >
      {project.title}
    </ViewTransitionLink>
  ) : (
    project.title
  );

  if (!isFeatured) {
    return (
      <article className="border-border-subtle border-t py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-16">
          <div>
            <p className="text-muted text-xs tracking-widest uppercase">
              {project.category}
            </p>
            <h3 className="text-foreground mt-3 text-2xl font-bold md:text-3xl">
              {title}
            </h3>
          </div>
          <div className="space-y-5">
            <p className="text-accent text-lg md:text-xl">
              {project.shortDescription}
            </p>
            <p className="text-muted text-xs tracking-[0.18em] uppercase">
              {getCollaborationLabel(project.collaboration)}
            </p>
            {hasPage ? (
              <LiveProjectButton
                href={`/work/${project.slug}`}
                label="View Project ↗"
                className="px-5 sm:px-8"
              />
            ) : null}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "landing-project-card border-foreground relative overflow-hidden rounded-[var(--landing-radius-card)] border-2 p-5 sm:rounded-[var(--landing-radius-card-lg)] sm:p-8 md:p-10",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1 space-y-1.5 sm:space-y-2">
          <p className="font-mono text-3xl font-black tracking-tight text-[var(--landing-number)] sm:text-5xl md:text-6xl">
            {number}
          </p>
          <p className="text-muted text-xs font-medium tracking-widest uppercase sm:text-sm">
            {project.category}
          </p>
          <h3 className="text-foreground max-w-xl text-xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {title}
          </h3>
        </div>
        {hasPage ? (
          <LiveProjectButton
            href={`/work/${project.slug}`}
            label="View Project ↗"
          />
        ) : null}
      </div>

      <p className="text-accent mt-5 max-w-3xl text-base leading-relaxed sm:mt-6 sm:text-lg md:text-xl">
        {project.shortDescription}
      </p>

      {teamNote ? (
        <p className="text-muted mt-3 text-sm">{teamNote}</p>
      ) : null}

      {project.safetyNote ? (
        <p className="text-muted mt-3 max-w-3xl text-sm text-pretty">
          {CLINICAL_SAFETY_COMPACT}
        </p>
      ) : null}

      {visual ? (
        <div className="mt-6 min-h-[10rem] overflow-hidden sm:mt-8 sm:min-h-[14rem]">
          {visual}
        </div>
      ) : null}

      <p className="text-muted mt-6 text-xs tracking-[0.18em] uppercase">
        {project.technologyStack.slice(0, 8).join(" / ")}
      </p>
    </article>
  );
}
