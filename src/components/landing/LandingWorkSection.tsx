"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useSyncExternalStore } from "react";

import { FadeIn } from "@/components/landing/FadeIn";
import { LiveProjectButton } from "@/components/landing/LiveProjectButton";
import {
  landingProjects,
  type LandingProject,
} from "@/components/landing/landing-data";
import { AcademEaseCardVisual } from "@/components/landing/visuals/AcademEaseCardVisual";
import { ClinicalCardVisual } from "@/components/landing/visuals/ClinicalCardVisual";
import { RealtimeCardVisual } from "@/components/landing/visuals/RealtimeCardVisual";
import { TapTapCardVisual } from "@/components/landing/visuals/TapTapCardVisual";
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
          <LiveProjectButton href={project.href} label="View Project" />
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

export function LandingWorkSection() {
  const total = landingProjects.length;
  const sticky = useStickyProjectStack();

  return (
    <section
      aria-labelledby="work-heading"
      className="landing-measure relative"
    >
      <div className="px-5 pt-10 sm:px-8 md:px-10 md:pt-32">
        <FadeIn y={40}>
          <div id="work" className="landing-section-anchor">
            <p className="landing-kicker">01 — Work</p>
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
    </section>
  );
}
