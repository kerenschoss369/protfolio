import Link from "next/link";

import { CaseStudyMetadata } from "@/components/case-study/CaseStudyMetadata";
import { ProjectLinkActions } from "@/components/case-study/ProjectLinkActions";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import { projectTitleTransitionName } from "@/lib/view-transitions";
import type { ReactNode } from "react";

type CaseStudyHeroProps = {
  project: Project;
  visual?: ReactNode;
};

export function CaseStudyHero({ project, visual }: CaseStudyHeroProps) {
  return (
    <header className="space-y-8">
      <p>
        <Link
          href="/work"
          className="text-muted hover:text-foreground focus-visible:outline-focus-ring group inline-flex min-h-[var(--touch-target)] items-center text-[length:var(--text-sm)] transition-colors focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
        >
          <span
            aria-hidden
            className="link-arrow me-1 inline-block -scale-x-100"
          >
            →
          </span>
          All work
        </Link>
      </p>

      <div
        className={
          visual
            ? "editorial-grid items-start gap-y-8"
            : "max-w-[44rem] space-y-6"
        }
      >
        <div
          className={
            visual ? "col-span-full space-y-6 lg:col-span-5" : "space-y-6"
          }
        >
          <CaseStudyMetadata project={project} />
          <Heading
            as="h1"
            variant="page"
            style={{
              viewTransitionName: projectTitleTransitionName(project.slug),
            }}
          >
            {project.title}
          </Heading>
          <Text variant="body-lg" className="max-w-[40rem] text-pretty">
            {project.shortDescription}
          </Text>
          <ProjectLinkActions
            repositoryUrl={project.repositoryUrl}
            liveUrl={project.liveUrl}
          />
        </div>

        {visual ? (
          <div className="col-span-full lg:col-span-7">{visual}</div>
        ) : null}
      </div>
    </header>
  );
}
