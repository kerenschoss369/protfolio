import Link from "next/link";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Heading } from "@/components/ui/Heading";
import { ProjectMeta } from "@/components/ui/ProjectMeta";
import { Surface } from "@/components/ui/Surface";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import { CLINICAL_SAFETY_NOTE } from "@/data/projects";
import { getCollaborationLabel } from "@/lib/project-utils";

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
          <Link
            href={`/work/${project.slug}`}
            className="hover:text-accent focus-visible:text-accent transition-colors"
          >
            {project.title}
          </Link>
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
          aria-hidden={false}
        >
          <div className="border-border-subtle flex items-center justify-between border-b px-4 py-3">
            <Text variant="meta" className="text-steel">
              Fictional note · review workflow
            </Text>
            <Tag variant="warning">Needs review</Tag>
          </div>
          <div className="grid gap-0 md:grid-cols-2">
            <div className="border-border-subtle space-y-3 border-b p-4 md:border-r md:border-b-0">
              <Text variant="meta" className="text-muted">
                Source note
              </Text>
              <p className="font-serif text-[length:var(--text-sm)] leading-[var(--leading-relaxed)]">
                Repeat CBC in seven days and schedule an oncology follow-up next
                month.
              </p>
              <Tag variant="steel">Static demonstration</Tag>
            </div>
            <div className="space-y-3 p-4">
              <Text variant="meta" className="text-muted">
                Extracted actions
              </Text>
              <ul className="space-y-3">
                <li className="border-border-subtle rounded-[var(--radius-md)] border p-3">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Tag variant="warning">Needs review</Tag>
                    <span className="font-mono text-[length:var(--text-meta)] uppercase">
                      Follow-up
                    </span>
                  </div>
                  <p className="text-[length:var(--text-sm)]">
                    Schedule oncology follow-up next month
                  </p>
                  <p className="text-muted mt-2 font-mono text-[length:var(--text-meta)]">
                    Evidence: “schedule an oncology follow-up next month”
                  </p>
                </li>
                <li className="border-border-subtle rounded-[var(--radius-md)] border p-3">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Tag variant="success">Pending</Tag>
                    <span className="font-mono text-[length:var(--text-meta)] uppercase">
                      Lab
                    </span>
                  </div>
                  <p className="text-[length:var(--text-sm)]">
                    Repeat CBC in seven days
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Surface>
      </div>
    </article>
  );
}

export function FeaturedAcademEase({ project }: FeaturedProjectProps) {
  const slots = [
    { day: "Sun", course: "Algorithms", time: "10:00" },
    { day: "Mon", course: "Databases", time: "12:00" },
    { day: "Tue", course: "HCI", time: "09:00" },
    { day: "Wed", course: "Networks", time: "14:00" },
  ] as const;

  return (
    <article className="editorial-grid items-stretch gap-y-6 border-b border-[var(--border-subtle)] py-10 lg:py-14">
      <div className="order-2 col-span-full space-y-5 lg:order-1 lg:col-span-7">
        <Surface
          variant="inset"
          border="subtle"
          className="project-preview-academease interactive-surface overflow-hidden"
        >
          <div className="border-border-subtle flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
            <Text variant="meta" className="text-steel">
              Schedule grid · EN / HE
            </Text>
            <div className="flex gap-2">
              <Tag variant="accent">LTR</Tag>
              <Tag variant="steel">RTL ready</Tag>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[var(--border-subtle)] sm:grid-cols-4">
            {slots.map((slot) => (
              <div
                key={slot.day}
                className="bg-background min-h-24 space-y-2 p-3"
              >
                <p className="text-muted font-mono text-[length:var(--text-meta)] uppercase">
                  {slot.day}
                </p>
                <p className="text-[length:var(--text-sm)] font-medium">
                  {slot.course}
                </p>
                <p className="text-steel font-mono text-[length:var(--text-meta)]">
                  {slot.time}
                </p>
              </div>
            ))}
          </div>
          <div className="border-border-subtle flex flex-wrap gap-2 border-t px-4 py-3">
            {["React", "FastAPI", "MongoDB", "RTL"].map((item) => (
              <Tag key={item} variant="default">
                {item}
              </Tag>
            ))}
          </div>
        </Surface>
      </div>

      <div className="order-1 col-span-full space-y-5 lg:order-2 lg:col-span-5">
        <ProjectMeta
          category={project.category}
          dates={project.dates.display}
          stack={["React", "TypeScript", "FastAPI", "MongoDB"]}
        />
        <Heading as="h3" variant="project">
          <Link
            href={`/work/${project.slug}`}
            className="hover:text-accent focus-visible:text-accent transition-colors"
          >
            {project.title}
          </Link>
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
  const lines = [
    { tone: "muted", text: "$ realtime-gpt-cli" },
    { tone: "user", text: "> 6*7" },
    { tone: "event", text: "event  function_call  multiply(a, b)" },
    { tone: "local", text: "local  multiply(6, 7) → 42" },
    { tone: "assistant", text: "assistant  42" },
  ] as const;

  return (
    <article className="editorial-grid items-stretch gap-y-6 border-b border-[var(--border-subtle)] py-10 lg:py-14">
      <div className="col-span-full space-y-5 lg:col-span-5">
        <ProjectMeta
          category={project.category}
          dates={project.dates.display}
          stack={["Go", "WebSockets", "Goroutines", "Channels"]}
        />
        <Heading as="h3" variant="project">
          <Link
            href={`/work/${project.slug}`}
            className="hover:text-accent focus-visible:text-accent transition-colors"
          >
            {project.title}
          </Link>
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
          className="project-preview-terminal interactive-surface overflow-hidden font-mono"
        >
          <div className="border-border-subtle flex items-center justify-between border-b px-4 py-3">
            <Text variant="meta" className="text-steel">
              Terminal · event loop
            </Text>
            <Tag variant="steel">Offline simulation</Tag>
          </div>
          <div className="space-y-2 p-4 text-[length:var(--text-code)] leading-relaxed">
            {lines.map((line) => (
              <p
                key={line.text}
                className={
                  line.tone === "muted"
                    ? "text-muted"
                    : line.tone === "event"
                      ? "text-steel"
                      : line.tone === "local"
                        ? "text-accent"
                        : "text-foreground"
                }
              >
                {line.text}
              </p>
            ))}
          </div>
          <div className="border-border-subtle flex flex-wrap gap-2 border-t px-4 py-3">
            {["function calling", "goroutines", "channels"].map((item) => (
              <Tag key={item} variant="default">
                {item}
              </Tag>
            ))}
          </div>
        </Surface>
      </div>
    </article>
  );
}

export function FeaturedTapTap({ project }: FeaturedProjectProps) {
  const hits = [
    { label: "Perfect", state: "success" as const, offset: "translate-y-0" },
    { label: "Good", state: "warning" as const, offset: "translate-y-1" },
    { label: "Miss", state: "danger" as const, offset: "translate-y-2" },
  ];

  return (
    <article className="editorial-grid items-stretch gap-y-6 py-10 lg:py-14">
      <div className="order-2 col-span-full space-y-5 lg:order-1 lg:col-span-7">
        <Surface
          variant="raised"
          border="subtle"
          className="project-preview-taptap interactive-surface overflow-hidden"
        >
          <div className="border-border-subtle flex items-center justify-between border-b px-4 py-3">
            <Text variant="meta" className="text-steel">
              Rhythm timing · silent preview
            </Text>
            <Tag variant="steel">No audio</Tag>
          </div>
          <div className="relative flex min-h-44 items-end justify-center gap-4 px-6 pt-10 pb-8 sm:gap-8">
            <div
              aria-hidden
              className="border-border-subtle absolute inset-x-6 top-1/2 border-t border-dashed"
            />
            {hits.map((hit, index) => (
              <div
                key={hit.label}
                className={`flex flex-col items-center gap-3 ${hit.offset}`}
              >
                <div
                  className="border-border-strong size-10 rounded-full border-2 bg-[color-mix(in_srgb,var(--accent)_18%,var(--background))] sm:size-12"
                  style={{ animationDelay: `${index * 80}ms` }}
                />
                <Tag variant={hit.state}>{hit.label}</Tag>
              </div>
            ))}
          </div>
          <div className="border-border-subtle flex flex-wrap gap-2 border-t px-4 py-3">
            {["Unity", "C#", "shaders", "synchronization"].map((item) => (
              <Tag key={item} variant="default">
                {item}
              </Tag>
            ))}
          </div>
        </Surface>
      </div>

      <div className="order-1 col-span-full space-y-5 lg:order-2 lg:col-span-5">
        <ProjectMeta
          category={project.category}
          dates={project.dates.display}
          stack={["Unity", "C#", "ShaderLab", "HLSL"]}
        />
        <Heading as="h3" variant="project">
          <Link
            href={`/work/${project.slug}`}
            className="hover:text-accent focus-visible:text-accent transition-colors"
          >
            {project.title}
          </Link>
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
