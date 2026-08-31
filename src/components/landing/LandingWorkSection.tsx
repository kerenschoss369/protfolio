"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Fragment, useRef, useSyncExternalStore } from "react";

import { FadeIn } from "@/components/landing/FadeIn";
import { LiveProjectButton } from "@/components/landing/LiveProjectButton";
import {
  landingEducation,
  landingExperience,
  landingProjects,
  type LandingProject,
} from "@/components/landing/landing-data";
import { AcademEaseCardVisual } from "@/components/landing/visuals/AcademEaseCardVisual";
import { ClinicalCardVisual } from "@/components/landing/visuals/ClinicalCardVisual";
import { RealtimeCardVisual } from "@/components/landing/visuals/RealtimeCardVisual";
import { TapTapCardVisual } from "@/components/landing/visuals/TapTapCardVisual";
import { ConfidentialityNotice } from "@/components/case-study/ConfidentialityNotice";
import type { ProjectSlug } from "@/data/content-types";
import { scroll as scrollConfig } from "@/lib/animation-config";
import { cn } from "@/lib/cn";

const STICKY_MEDIA = `(min-width: ${scrollConfig.stickyMinWidthPx}px)`;

function subscribeStickyDesktop(onStoreChange: () => void) {
  const media = window.matchMedia(STICKY_MEDIA);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getStickyDesktopSnapshot() {
  return window.matchMedia(STICKY_MEDIA).matches;
}

function useStickyProjectStack() {
  const reducedMotion = useReducedMotion();
  const desktop = useSyncExternalStore(
    subscribeStickyDesktop,
    getStickyDesktopSnapshot,
    () => false,
  );
  return Boolean(!reducedMotion && desktop);
}

function ProjectVisual({ slug }: { slug: ProjectSlug }) {
  switch (slug) {
    case "clinical-follow-up-detector":
      return <ClinicalCardVisual />;
    case "realtime-gpt-cli":
      return <RealtimeCardVisual />;
    case "academease":
      return <AcademEaseCardVisual />;
    case "taptap-avengers":
      return <TapTapCardVisual />;
    case "overthewire-bandit":
    case "atlas-research":
      return null;
  }
}

function StickyProjectCard({
  project,
  index,
  total,
  sticky,
}: {
  project: LandingProject;
  index: number;
  total: number;
  sticky: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const stackPeek = 18;

  return (
    <div
      ref={ref}
      className={cn(
        "relative mb-5 last:mb-0",
        sticky && "sticky top-0 mb-0 flex h-[100svh] items-start pt-5",
      )}
      style={{ zIndex: index + 1 }}
      data-sticky-stack={sticky ? "on" : "off"}
    >
      <m.article
        style={
          sticky
            ? {
                scale,
                top: index * stackPeek,
                transformOrigin: "top center",
              }
            : undefined
        }
        className={cn(
          "landing-project-card border-foreground bg-background relative flex h-[36rem] w-full flex-col overflow-hidden rounded-[var(--landing-radius-card)] border-2 p-4 sm:h-[40rem] sm:rounded-[var(--landing-radius-card-lg)] sm:p-8 md:h-[42rem] md:p-10",
          sticky && "h-[calc(100svh-5.5rem)]",
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1 space-y-1.5 sm:space-y-2">
            <p className="font-mono text-3xl font-black tracking-tight text-[var(--landing-number)] sm:text-5xl md:text-6xl">
              {project.number}
            </p>
            <p className="text-muted text-xs font-medium tracking-widest uppercase sm:text-sm">
              {project.category}
            </p>
            <h3 className="text-foreground max-w-xl text-xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {project.title}
            </h3>
          </div>
          <LiveProjectButton href={project.href} label="View Project ↗" />
        </div>

        <div className="mt-5 grid min-h-0 flex-1 gap-5 overflow-hidden sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-10">
          <div className="min-h-0 space-y-3 overflow-hidden sm:space-y-5">
            <p className="text-accent text-base font-medium sm:text-xl">
              {project.statement}
            </p>
            <p className="text-foreground text-sm leading-relaxed sm:text-base">
              {project.description}
            </p>
            {project.teamNote ? (
              <p className="text-muted text-xs tracking-wider uppercase">
                {project.teamNote}
              </p>
            ) : null}
            <div className="hidden sm:block">
              <p className="text-muted mb-2 text-xs tracking-widest uppercase">
                What I built
              </p>
              <ul className="text-foreground space-y-2 text-sm">
                {project.built.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="text-muted">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="text-muted hidden space-y-1.5 text-sm sm:block">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {project.safetyNote ? (
              <p className="text-muted text-xs leading-relaxed">
                {project.safetyNote}
                {project.simulationLabel
                  ? ` ${project.simulationLabel}.`
                  : null}
              </p>
            ) : null}
          </div>

          <div className="min-h-0 overflow-hidden sm:min-h-[220px] lg:min-h-0">
            <ProjectVisual slug={project.slug} />
          </div>
        </div>

        <p className="border-border-subtle text-muted mt-auto border-t pt-3 text-xs leading-relaxed tracking-[0.12em] break-words uppercase sm:pt-4 sm:tracking-[0.2em]">
          {project.technologies.join(" / ")}
        </p>
        </m.article>
    </div>
  );
}

function ExperienceBlock() {
  return (
    <section
      className="landing-experience px-5 pt-12 pb-24 sm:px-8 md:px-10 md:pt-16"
      aria-labelledby="experience-heading"
    >
      <FadeIn y={40}>
        <div id="experience" className="landing-section-anchor">
          <p className="landing-kicker">02 — Experience</p>
          <h2
            id="experience-heading"
            className="hero-heading landing-section-title mt-4 max-w-4xl leading-none font-black tracking-tight uppercase"
          >
            Technical
            <br />
            experience
          </h2>
        </div>
      </FadeIn>

      <ul className="mt-16 space-y-0 md:mt-24">
        {landingExperience.map((role, index) => (
          <Fragment key={role.id}>
            <FadeIn delay={0.08 * index} y={28} as="li">
              <div className="border-border-subtle border-t py-10 md:py-14">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-16">
                  <div>
                    <p className="text-muted text-xs tracking-widest uppercase">
                      {role.dates}
                    </p>
                    <h3 className="text-foreground mt-3 text-2xl font-bold md:text-3xl">
                      {role.role}
                    </h3>
                    <p className="text-muted mt-2 text-sm md:text-base">
                      {role.org}
                    </p>
                  </div>
                  <div className="space-y-5">
                    <p className="text-accent text-lg md:text-xl">
                      {role.statement}
                    </p>
                    {role.areas.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {role.areas.map((area) => (
                          <li
                            key={area}
                            className="border-border-subtle text-muted rounded-full border px-3 py-1 text-xs tracking-widest uppercase"
                          >
                            {area}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {role.technologies.length > 0 ? (
                      <p className="text-muted text-xs tracking-[0.18em] uppercase">
                        {role.technologies.join(" / ")}
                      </p>
                    ) : null}
                    {role.confidentialityNote ? (
                      <ConfidentialityNotice note={role.confidentialityNote} />
                    ) : null}
                  </div>
                </div>
              </div>
            </FadeIn>
            {index === 0 && landingEducation ? (
              <FadeIn delay={0.16} y={28} as="li">
                <div className="border-border-subtle border-t py-10 md:py-14">
                  <p className="text-muted text-sm md:text-base">
                    Took 3 years to complete my
                  </p>
                  <h3 className="text-foreground mt-3 flex flex-wrap items-baseline gap-x-2 text-2xl font-bold md:text-3xl">
                    Computer Science degree
                    <span className="text-muted text-sm font-normal md:text-base">
                      ({landingEducation.dates})
                    </span>
                  </h3>
                </div>
              </FadeIn>
            ) : null}
          </Fragment>
        ))}
      </ul>
    </section>
  );
}

export function LandingWorkSection() {
  const total = landingProjects.length;
  const sticky = useStickyProjectStack();

  return (
    <section aria-labelledby="work-heading" className="landing-measure relative">
      <div className="px-5 pt-10 sm:px-8 md:px-10 md:pt-32">
        <FadeIn y={40}>
          <div id="work" className="landing-section-anchor">
            <p className="landing-kicker">01 — Projects</p>
            <h2
              id="work-heading"
              className="hero-heading landing-section-title mt-4 leading-none font-black tracking-tight uppercase"
            >
              Projects
            </h2>
          </div>
        </FadeIn>
      </div>

      <div
        className="landing-project-stack relative mt-12 px-3 sm:px-6 md:mt-16 md:px-8"
        data-sticky-stack={sticky ? "on" : "off"}
      >
        {landingProjects.map((project, index) => (
          <StickyProjectCard
            key={project.slug}
            project={project}
            index={index}
            total={total}
            sticky={sticky}
          />
        ))}
      </div>

      <ExperienceBlock />
    </section>
  );
}
