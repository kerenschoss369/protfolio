import Link from "next/link";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProjectMeta } from "@/components/ui/ProjectMeta";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import { isConfiguredHttpUrl } from "@/lib/links";
import { getCollaborationLabel, isTeamAttributed } from "@/lib/project-utils";
import { cn } from "@/lib/cn";

type WorkProjectCardProps = {
  project: Project;
  emphasis: "featured" | "compact";
};

function previewClassForSlug(slug: string) {
  switch (slug) {
    case "clinical-follow-up-detector":
      return "project-preview-clinical";
    case "academease":
      return "project-preview-academease";
    case "realtime-gpt-cli":
      return "project-preview-terminal";
    case "taptap-avengers":
      return "project-preview-taptap";
    case "overthewire-bandit":
      return "project-preview-bandit";
    case "atlas-research":
      return "project-preview-atlas";
    default:
      return "";
  }
}

export function WorkProjectCard({ project, emphasis }: WorkProjectCardProps) {
  return (
    <article
      className={cn(
        "border-border-subtle interactive-surface border-b py-8",
        previewClassForSlug(project.slug),
        emphasis === "featured" && "lg:py-10",
      )}
    >
      <div
        className={cn(
          emphasis === "featured"
            ? "editorial-grid gap-y-5"
            : "grid gap-4 md:grid-cols-[1fr_auto] md:items-end",
        )}
      >
        <div
          className={cn(
            "space-y-4",
            emphasis === "featured" && "col-span-full lg:col-span-8",
          )}
        >
          <ProjectMeta
            category={project.category}
            dates={project.dates.display}
            stack={
              emphasis === "featured"
                ? project.technologyStack.slice(0, 5)
                : project.technologyStack.slice(0, 4)
            }
          />

          <h3 className="font-serif text-[length:var(--text-project)] tracking-tight text-balance">
            <Link
              href={`/work/${project.slug}`}
              className="hover:text-accent focus-visible:outline-focus-ring focus-visible:text-accent rounded-sm transition-colors focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
            >
              {project.title}
            </Link>
          </h3>

          <Text
            className={cn(
              "text-pretty",
              emphasis === "compact" && "text-[length:var(--text-sm)]",
            )}
          >
            {project.shortDescription}
          </Text>

          <div className="flex flex-wrap gap-2">
            <Tag
              variant={
                isTeamAttributed(project.collaboration) ? "warning" : "steel"
              }
            >
              {getCollaborationLabel(project.collaboration)}
            </Tag>
            {project.safetyNote ? (
              <Tag variant="warning">Safety notes</Tag>
            ) : null}
            {project.kind === "engineering-practice" ? (
              <Tag variant="default">Practice</Tag>
            ) : null}
            {project.kind === "educational-research" ? (
              <Tag variant="default">Research</Tag>
            ) : null}
          </div>

          {project.safetyNote ? (
            <Text
              variant="small"
              className="text-warning max-w-[40rem] text-pretty"
            >
              {project.safetyNote}
            </Text>
          ) : null}
        </div>

        <div
          className={cn(
            "flex flex-wrap gap-3",
            emphasis === "featured" &&
              "col-span-full lg:col-span-4 lg:justify-end lg:self-end",
          )}
        >
          <ButtonLink
            href={`/work/${project.slug}`}
            variant="secondary"
            size="md"
            className="group"
          >
            View case study
            <span aria-hidden className="link-arrow ms-1">
              →
            </span>
          </ButtonLink>
          {isConfiguredHttpUrl(project.repositoryUrl) ? (
            <ButtonLink
              href={project.repositoryUrl}
              external
              variant="ghost"
              size="md"
            >
              Repository
            </ButtonLink>
          ) : null}
          {isConfiguredHttpUrl(project.liveUrl) ? (
            <ButtonLink
              href={project.liveUrl}
              external
              variant="ghost"
              size="md"
            >
              Live demo
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
