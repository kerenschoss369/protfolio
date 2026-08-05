import {
  AcademEasePreviewMotion,
  ClinicalPreviewMotion,
  TapTapPreviewMotion,
  TerminalPreviewMotion,
} from "@/components/motion/ProjectPreviewMotion";
import { ViewTransitionLink } from "@/components/motion/ViewTransitionLink";
import {
  DeviceMockup,
  deviceVariantForSlug,
} from "@/components/projects/DeviceMockup";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProjectMeta } from "@/components/ui/ProjectMeta";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import { CLINICAL_SAFETY_COMPACT } from "@/data/projects";
import { cn } from "@/lib/cn";
import { isConfiguredHttpUrl } from "@/lib/links";
import { getCollaborationLabel, isTeamAttributed } from "@/lib/project-utils";
import { projectTitleTransitionName } from "@/lib/view-transitions";

type WorkProjectCardProps = {
  project: Project;
  emphasis: "featured" | "compact";
  index?: number;
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

function WorkPreview({ slug }: { slug: string }) {
  switch (slug) {
    case "clinical-follow-up-detector":
      return <ClinicalPreviewMotion />;
    case "academease":
      return <AcademEasePreviewMotion />;
    case "realtime-gpt-cli":
      return <TerminalPreviewMotion />;
    case "taptap-avengers":
      return <TapTapPreviewMotion />;
    default:
      return (
        <div
          className="bg-surface-1 flex h-full min-h-[10rem] items-center justify-center p-6"
          aria-hidden
        >
          <span className="text-steel font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
            {slug}
          </span>
        </div>
      );
  }
}

export function WorkProjectCard({
  project,
  emphasis,
  index = 0,
}: WorkProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const isFeatured = emphasis === "featured";

  return (
    <article
      className={cn(
        "border-border-subtle interactive-surface border-b py-10 lg:py-14",
        previewClassForSlug(project.slug),
      )}
    >
      <div
        className={cn(
          isFeatured
            ? "editorial-grid items-center gap-y-8"
            : "grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-end",
        )}
      >
        {isFeatured ? (
          <>
            <div className="col-span-full space-y-5 lg:col-span-5">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span
                  aria-hidden
                  className="text-accent font-mono text-[length:var(--text-section)]"
                >
                  {number}
                </span>
                <ProjectMeta
                  category={project.category}
                  dates={project.dates.display}
                  stack={project.technologyStack.slice(0, 4)}
                />
              </div>

              <h3 className="font-serif text-[length:var(--text-project)] tracking-tight text-balance">
                <ViewTransitionLink
                  href={`/work/${project.slug}`}
                  className="hover:text-accent focus-visible:outline-focus-ring focus-visible:text-accent rounded-sm transition-colors focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
                  style={{
                    viewTransitionName: projectTitleTransitionName(
                      project.slug,
                    ),
                  }}
                >
                  {project.title}
                </ViewTransitionLink>
              </h3>

              <Text className="max-w-[32rem] text-pretty">
                {project.shortDescription}
              </Text>

              <div className="flex flex-wrap gap-2">
                <Tag
                  variant={
                    isTeamAttributed(project.collaboration)
                      ? "warning"
                      : "steel"
                  }
                >
                  {getCollaborationLabel(project.collaboration)}
                </Tag>
                {project.safetyNote ? (
                  <Tag variant="warning">Safety notes</Tag>
                ) : null}
              </div>

              {project.safetyNote ? (
                <Text
                  variant="small"
                  className="text-warning max-w-[32rem] text-pretty"
                >
                  {CLINICAL_SAFETY_COMPACT}
                </Text>
              ) : null}

              <div className="flex flex-wrap gap-3 pt-1">
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
              </div>
            </div>

            <div className="col-span-full lg:col-span-7">
              <DeviceMockup
                variant={deviceVariantForSlug(project.slug)}
                caption={`Preview of ${project.title}`}
              >
                <WorkPreview slug={project.slug} />
              </DeviceMockup>
            </div>
          </>
        ) : (
          <>
            <span
              aria-hidden
              className="text-steel font-mono text-[length:var(--text-meta)]"
            >
              {number}
            </span>
            <div className="space-y-2">
              <Text variant="meta" className="text-steel">
                {project.category}
              </Text>
              <h3 className="font-serif text-[length:var(--text-body-lg)] tracking-tight">
                <ViewTransitionLink
                  href={`/work/${project.slug}`}
                  className="hover:text-accent focus-visible:text-accent transition-colors"
                  style={{
                    viewTransitionName: projectTitleTransitionName(
                      project.slug,
                    ),
                  }}
                >
                  {project.title}
                </ViewTransitionLink>
              </h3>
              <Text
                variant="small"
                className="text-muted max-w-[36rem] text-pretty"
              >
                {project.shortDescription}
              </Text>
            </div>
            <ButtonLink
              href={`/work/${project.slug}`}
              variant="ghost"
              size="sm"
              className="group"
            >
              View
              <span aria-hidden className="link-arrow ms-1">
                →
              </span>
            </ButtonLink>
          </>
        )}
      </div>
    </article>
  );
}
