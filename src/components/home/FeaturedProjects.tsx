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
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import { CLINICAL_SAFETY_COMPACT } from "@/data/projects";
import { cn } from "@/lib/cn";
import { projectTitleTransitionName } from "@/lib/view-transitions";

type FeaturedCardProps = {
  project: Project;
  index: number;
  stack?: readonly string[];
  note?: string;
  noteVariant?: "warning" | "steel";
};

const FEATURED_STACK: Record<string, readonly string[]> = {
  "clinical-follow-up-detector": [
    "React",
    "Node.js",
    "FastAPI",
    "SQLite",
    "OpenAI",
  ],
  academease: ["React", "TypeScript", "FastAPI", "MongoDB"],
  "realtime-gpt-cli": ["Go", "WebSockets", "Goroutines", "Channels"],
  "taptap-avengers": ["Unity", "C#", "ShaderLab", "HLSL"],
};

function FeaturedPreview({ slug }: { slug: string }) {
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
      return null;
  }
}

export function FeaturedProjectCard({
  project,
  index,
  stack,
  note,
  noteVariant = "steel",
}: FeaturedCardProps) {
  const techs =
    stack ??
    FEATURED_STACK[project.slug] ??
    project.technologyStack.slice(0, 5);
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className={cn(
        "featured-project-card border-border-subtle relative overflow-hidden border",
        "bg-background px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12",
        `project-preview-${
          project.slug === "clinical-follow-up-detector"
            ? "clinical"
            : project.slug === "academease"
              ? "academease"
              : project.slug === "realtime-gpt-cli"
                ? "terminal"
                : project.slug === "taptap-avengers"
                  ? "taptap"
                  : "default"
        }`,
      )}
      data-project={project.slug}
    >
      <div className="editorial-grid items-center gap-y-8">
        <div className="col-span-full space-y-5 lg:col-span-5">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span
              aria-hidden
              className="text-accent font-mono text-[length:var(--text-section)] tracking-tight"
            >
              {number}
            </span>
            <Text variant="meta" className="text-steel">
              {project.category}
            </Text>
          </div>

          <Heading as="h3" variant="project" className="text-balance">
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

          <Text className="max-w-[32rem] text-pretty">
            {project.shortDescription}
          </Text>

          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {techs.map((tech) => (
              <li key={tech}>
                <Tag variant="steel">{tech}</Tag>
              </li>
            ))}
          </ul>

          {note ? (
            <p
              className={cn(
                "max-w-[32rem] text-[length:var(--text-sm)] text-pretty",
                noteVariant === "warning" ? "text-warning" : "text-muted",
              )}
            >
              {note}
            </p>
          ) : null}

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
          <DeviceMockup
            variant={deviceVariantForSlug(project.slug)}
            caption={`Conceptual preview of ${project.title}`}
          >
            <FeaturedPreview slug={project.slug} />
          </DeviceMockup>
        </div>
      </div>
    </article>
  );
}

export function FeaturedClinical({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <FeaturedProjectCard
      project={project}
      index={index}
      note={CLINICAL_SAFETY_COMPACT}
      noteVariant="warning"
    />
  );
}

export function FeaturedAcademEase({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return <FeaturedProjectCard project={project} index={index} />;
}

export function FeaturedRealtimeCli({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <FeaturedProjectCard
      project={project}
      index={index}
      note="Offline portfolio simulation"
    />
  );
}

export function FeaturedTapTap({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <FeaturedProjectCard
      project={project}
      index={index}
      note="Team project · silent preview"
    />
  );
}
