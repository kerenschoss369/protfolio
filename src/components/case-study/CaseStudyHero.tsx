import Link from "next/link";
import type { ReactNode } from "react";

import { CaseStudyMetadata } from "@/components/case-study/CaseStudyMetadata";
import { ProjectLinkActions } from "@/components/case-study/ProjectLinkActions";
import type { Project } from "@/data/content-types";
import { hasProductCaseStudyLayout } from "@/lib/project-utils";
import { projectTitleTransitionName } from "@/lib/view-transitions";

type CaseStudyHeroProps = {
  project: Project;
  visual?: ReactNode;
};

export function CaseStudyHero({ project, visual }: CaseStudyHeroProps) {
  const showMeta = hasProductCaseStudyLayout(project);

  return (
    <header className="relative z-20 space-y-8 md:space-y-10">
      <p>
        <Link
          href="/work"
          className="landing-nav-link relative z-30 inline-flex items-center"
        >
          <span aria-hidden className="me-2">
            ←
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
          {showMeta ? (
            <>
              <p className="landing-case-kicker">Case study</p>
              <CaseStudyMetadata project={project} />
            </>
          ) : null}
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
