"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CornerRightUp } from "lucide-react";
import { useRef } from "react";

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
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={ref}
      className={
        sticky
          ? "relative mb-5 last:mb-0 md:mb-0 md:h-[85vh]"
          : "relative mb-5 last:mb-0"
      }
      style={{ zIndex: index + 1 }}
      data-sticky-stack={sticky ? "on" : "off"}
    >
      <m.article
        style={
          sticky
            ? {
                scale,
                ["--stack-offset" as string]: `${index * 28}px`,
              }
            : undefined
        }
        className="border-foreground bg-background relative flex h-auto flex-col rounded-[var(--landing-radius-card)] border-2 p-4 sm:rounded-[var(--landing-radius-card-lg)] sm:p-8 md:p-10"
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

        <div className="mt-5 grid flex-1 gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-10">
          <div className="space-y-3 sm:space-y-5">
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

          <div className="min-h-[140px] sm:min-h-[220px] lg:min-h-0">
            <ProjectVisual slug={project.slug} />
          </div>
        </div>

        <p className="border-border-subtle text-muted mt-4 border-t pt-3 text-xs leading-relaxed tracking-[0.12em] break-words uppercase sm:mt-6 sm:pt-4 sm:tracking-[0.2em]">
          {project.technologies.join(" / ")}
        </p>
      </m.article>
    </div>
  );
}

function ExperienceBlock() {
  return (
    <section
      className="px-5 pt-32 pb-24 sm:px-8 md:px-10 md:pt-48"
      aria-labelledby="experience-heading"
    >
      <FadeIn y={40}>
        <p className="landing-kicker">02 — Experience</p>
        <h2
          id="experience-heading"
          className="hero-heading mt-4 max-w-4xl leading-none font-black tracking-tight uppercase"
          style={{ fontSize: "clamp(2.25rem, 8vw, 96px)" }}
        >
          Technical
          <br />
          experience
        </h2>
      </FadeIn>

      <ul className="mt-16 space-y-0 md:mt-24">
        {landingExperience.map((role, index) => (
          <FadeIn key={role.id} delay={0.08 * index} y={28} as="li">
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
                  <p className="text-muted text-xs tracking-[0.18em] uppercase">
                    {role.technologies.join(" / ")}
                  </p>
                  <ConfidentialityNotice note={role.confidentialityNote} />
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
        {landingEducation ? (
          <FadeIn delay={0.16} y={28} as="li">
            <div className="border-border-subtle border-t py-8 md:py-10">
              <p
                className="text-foreground font-bold tracking-wide"
                style={{ fontSize: "clamp(0.8rem, 3.4vw, 1.125rem)" }}
              >
                <span>Took a break to complete a Computer Science degree</span>{" "}
                <span className="inline-flex flex-wrap items-center gap-1">
                  ({landingEducation.dates}) to become a
                  <CornerRightUp
                    aria-hidden
                    className="text-accent size-[1.2em] -translate-y-0.5 sm:size-[1.75em]"
                    strokeWidth={2.5}
                  />
                </span>
              </p>
            </div>
          </FadeIn>
        ) : null}
      </ul>
    </section>
  );
}

export function LandingWorkSection() {
  const total = landingProjects.length;
  const reducedMotion = useReducedMotion();
  const sticky = !reducedMotion;

  return (
    <section id="work" aria-labelledby="work-heading" className="relative">
      <div className="px-5 pt-24 sm:px-8 md:px-10 md:pt-32">
        <FadeIn y={40}>
          <p className="landing-kicker">01 — Selected Projects</p>
          <h2
            id="work-heading"
            className="hero-heading mt-4 leading-none font-black tracking-tight uppercase"
            style={{ fontSize: "clamp(2.35rem, 9vw, 120px)" }}
          >
            Selected
            <br />
            Projects
          </h2>
        </FadeIn>
      </div>

      <div
        className="relative mt-12 px-3 sm:px-6 md:mt-16 md:px-8"
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

      <div className="h-24 md:h-40" aria-hidden />
      <ExperienceBlock />
    </section>
  );
}
