import Link from "next/link";

import { CaseStudyMetadata } from "@/components/case-study/CaseStudyMetadata";
import { ProjectLinkActions } from "@/components/case-study/ProjectLinkActions";
import type { Project } from "@/data/content-types";
import { projectTitleTransitionName } from "@/lib/view-transitions";
import type { ReactNode } from "react";

type CaseStudyHeroProps = {
  project: Project;
  visual?: ReactNode;
};

export function CaseStudyHero({ project, visual }: CaseStudyHeroProps) {
  return (
    <header className="space-y-8 md:space-y-10">
      <p>
        <Link
          href="/work"
          className="text-muted inline-flex min-h-11 items-center text-xs tracking-[0.16em] uppercase transition-opacity hover:opacity-100 focus-visible:opacity-100 sm:text-sm"
        >
          <span aria-hidden className="me-2 inline-block -scale-x-100">
            →
          </span>
          All work
        </Link>
      </p>

      <div
        className={
          visual
            ? "editorial-grid items-start gap-y-8"
            : "max-w-[48rem] space-y-6"
        }
      >
        <div
          className={
            visual ? "col-span-full space-y-6 lg:col-span-5" : "space-y-6"
          }
        >
          <p className="landing-case-kicker">Case study</p>
          <CaseStudyMetadata project={project} />
          <h1
            className="hero-heading landing-case-title text-balance"
            style={{
              viewTransitionName: projectTitleTransitionName(project.slug),
            }}
          >
            {project.title}
          </h1>
          <p className="text-foreground max-w-[40rem] text-base leading-relaxed text-pretty sm:text-lg md:text-xl">
            {project.shortDescription}
          </p>
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
