import {
  AcademEasePreviewMotion,
  ClinicalPreviewMotion,
  TapTapPreviewMotion,
  TerminalPreviewMotion,
} from "@/components/motion/ProjectPreviewMotion";
import { ViewTransitionLink } from "@/components/motion/ViewTransitionLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Heading } from "@/components/ui/Heading";
import { ProjectMeta } from "@/components/ui/ProjectMeta";
import { Surface } from "@/components/ui/Surface";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import { CLINICAL_SAFETY_NOTE } from "@/data/projects";
import { getCollaborationLabel } from "@/lib/project-utils";
import { projectTitleTransitionName } from "@/lib/view-transitions";

type FeaturedProjectProps = {
  project: Project;
};

export function FeaturedClinical({ project }: FeaturedProjectProps) {
  return (
    <article className="editorial-grid items-stretch gap-y-6 border-b border-[var(--border-subtle)] py-10 lg:py-14">
      <div className="col-span-full space-y-5 lg:col-span-5">
        <ProjectMeta
          category={project.category}
          dates={project.dates.display}
          stack={["React", "Node.js", "FastAPI", "SQLite", "OpenAI SDK"]}
        />
        <Heading as="h3" variant="project">
          <ViewTransitionLink
            href={`/work/${project.slug}`}
            className="hover:text-accent focus-visible:text-accent transition-colors"
            style={{
              viewTransitionName: projectTitleTransitionName(project.slug),
            }}
          >
            {project.title}
          </ViewTransitionLink>
        </Heading>
        <Text className="max-w-[36rem] text-pretty">
          {project.shortDescription}
        </Text>
        <Text variant="small" className="text-muted max-w-[36rem] text-pretty">
          {CLINICAL_SAFETY_NOTE}
        </Text>
        <Text variant="small" className="text-steel">
          {getCollaborationLabel(project.collaboration)}
        </Text>
        <ButtonLink
          href={`/work/${project.slug}`}
          variant="secondary"
          size="sm"
          className="group"
        >
          View case study
          <span aria-hidden className="link-arrow ms-1">
            →
          </span>
        </ButtonLink>
      </div>

      <div className="col-span-full lg:col-span-7">
        <Surface
          variant="raised"
          border="steel"
          className="project-preview-clinical interactive-surface overflow-hidden"
        >
          <ClinicalPreviewMotion />
        </Surface>
      </div>
    </article>
  );
}

export function FeaturedAcademEase({ project }: FeaturedProjectProps) {
  return (
    <article className="editorial-grid items-stretch gap-y-6 border-b border-[var(--border-subtle)] py-10 lg:py-14">
      <div className="order-2 col-span-full space-y-5 lg:order-1 lg:col-span-7">
        <Surface
          variant="inset"
          border="subtle"
          className="project-preview-academease interactive-surface overflow-hidden"
        >
          <AcademEasePreviewMotion />
        </Surface>
      </div>

      <div className="order-1 col-span-full space-y-5 lg:order-2 lg:col-span-5">
        <ProjectMeta
          category={project.category}
          dates={project.dates.display}
          stack={["React", "TypeScript", "FastAPI", "MongoDB"]}
        />
        <Heading as="h3" variant="project">
          <ViewTransitionLink
            href={`/work/${project.slug}`}
            className="hover:text-accent focus-visible:text-accent transition-colors"
            style={{
              viewTransitionName: projectTitleTransitionName(project.slug),
            }}
          >
            {project.title}
          </ViewTransitionLink>
        </Heading>
        <Text className="max-w-[36rem] text-pretty">
          {project.shortDescription}
        </Text>
        <Text variant="small" className="text-muted max-w-[36rem]">
          Led frontend development after independently learning React, with
          contributions across interface flows, backend work, and deployment.
          Team project.
        </Text>
        <ButtonLink
          href={`/work/${project.slug}`}
          variant="secondary"
          size="sm"
          className="group"
        >
          View case study
          <span aria-hidden className="link-arrow ms-1">
            →
          </span>
        </ButtonLink>
      </div>
    </article>
  );
}

export function FeaturedRealtimeCli({ project }: FeaturedProjectProps) {
  return (
    <article className="editorial-grid items-stretch gap-y-6 border-b border-[var(--border-subtle)] py-10 lg:py-14">
      <div className="col-span-full space-y-5 lg:col-span-5">
        <ProjectMeta
          category={project.category}
          dates={project.dates.display}
          stack={["Go", "WebSockets", "Goroutines", "Channels"]}
        />
        <Heading as="h3" variant="project">
          <ViewTransitionLink
            href={`/work/${project.slug}`}
            className="hover:text-accent focus-visible:text-accent transition-colors"
            style={{
              viewTransitionName: projectTitleTransitionName(project.slug),
            }}
          >
            {project.title}
          </ViewTransitionLink>
        </Heading>
        <Text className="max-w-[36rem] text-pretty">
          {project.shortDescription}
        </Text>
        <Text variant="small" className="text-muted max-w-[36rem]">
          Deterministic portfolio preview only—no live AI connection and no API
          key exposure.
        </Text>
        <ButtonLink
          href={`/work/${project.slug}`}
          variant="secondary"
          size="sm"
          className="group"
        >
          View case study
          <span aria-hidden className="link-arrow ms-1">
            →
          </span>
        </ButtonLink>
      </div>

      <div className="col-span-full lg:col-span-7">
        <Surface
          variant="inset"
          border="steel"
          className="project-preview-terminal interactive-surface overflow-hidden"
        >
          <TerminalPreviewMotion />
        </Surface>
      </div>
    </article>
  );
}

export function FeaturedTapTap({ project }: FeaturedProjectProps) {
  return (
    <article className="editorial-grid items-stretch gap-y-6 py-10 lg:py-14">
      <div className="order-2 col-span-full space-y-5 lg:order-1 lg:col-span-7">
        <Surface
          variant="raised"
          border="subtle"
          className="project-preview-taptap interactive-surface overflow-hidden"
        >
          <TapTapPreviewMotion />
        </Surface>
      </div>

      <div className="order-1 col-span-full space-y-5 lg:order-2 lg:col-span-5">
        <ProjectMeta
          category={project.category}
          dates={project.dates.display}
          stack={["Unity", "C#", "ShaderLab", "HLSL"]}
        />
        <Heading as="h3" variant="project">
          <ViewTransitionLink
            href={`/work/${project.slug}`}
            className="hover:text-accent focus-visible:text-accent transition-colors"
            style={{
              viewTransitionName: projectTitleTransitionName(project.slug),
            }}
          >
            {project.title}
          </ViewTransitionLink>
        </Heading>
        <Text className="max-w-[36rem] text-pretty">
          {project.shortDescription}
        </Text>
        <Text variant="small" className="text-muted max-w-[36rem]">
          Team-built rhythm systems with audio synchronization, beat mapping,
          and shader work. No copyrighted imagery or audio in this preview.
        </Text>
        <ButtonLink
          href={`/work/${project.slug}`}
          variant="secondary"
          size="sm"
          className="group"
        >
          View case study
          <span aria-hidden className="link-arrow ms-1">
            →
          </span>
        </ButtonLink>
      </div>
    </article>
  );
}
