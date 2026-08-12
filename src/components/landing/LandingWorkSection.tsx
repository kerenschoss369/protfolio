"use client";

import { m, useScroll, useTransform } from "motion/react";
import { CornerRightUp } from "lucide-react";
import { useRef } from "react";

import { FadeIn } from "@/components/landing/FadeIn";
import { LiveProjectButton } from "@/components/landing/LiveProjectButton";
import {
  landingExperience,
  landingProjects,
  type LandingProject,
} from "@/components/landing/landing-data";
import { AcademEaseCardVisual } from "@/components/landing/visuals/AcademEaseCardVisual";
import { ClinicalCardVisual } from "@/components/landing/visuals/ClinicalCardVisual";
import { RealtimeCardVisual } from "@/components/landing/visuals/RealtimeCardVisual";
import { TapTapCardVisual } from "@/components/landing/visuals/TapTapCardVisual";

function ProjectVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "clinical-follow-up-detector":
      return <ClinicalCardVisual />;
    case "realtime-gpt-cli":
      return <RealtimeCardVisual />;
    case "academease":
      return <AcademEaseCardVisual />;
    case "taptap-avengers":
      return <TapTapCardVisual />;
    default:
      return null;
  }
}

function StickyProjectCard({
  project,
  index,
  total,
}: {
  project: LandingProject;
  index: number;
  total: number;
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
      className="relative h-[80vh] md:h-[85vh]"
      style={{ zIndex: index + 1 }}
    >
      <m.article
        style={{
          scale,
          ["--stack-offset" as string]: `${index * 28}px`,
        }}
        className="sticky top-[calc(6rem+var(--stack-offset,0px))] flex h-[min(72vh,46rem)] flex-col overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:rounded-[50px] sm:p-8 md:top-[calc(8rem+var(--stack-offset,0px))] md:rounded-[60px] md:p-10"
      >

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="font-mono text-5xl font-black tracking-tight text-[#D7E2EA]/30 md:text-6xl">
              {project.number}
            </p>
            <p className="text-xs font-medium tracking-widest text-[#D7E2EA]/60 uppercase sm:text-sm">
              {project.category}
            </p>
            <h3 className="max-w-xl text-2xl font-semibold tracking-tight text-[#D7E2EA] sm:text-3xl md:text-4xl">
              {project.title}
            </h3>
          </div>
          <LiveProjectButton href={project.href} label="View Project ↗" />
        </div>

        <div className="mt-8 grid min-h-0 flex-1 gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-10">
          <div className="space-y-5 overflow-y-auto pe-1">
            <p className="text-lg font-medium text-[#BBCCD7] sm:text-xl">
              {project.statement}
            </p>
            <p className="text-sm leading-relaxed text-[#D7E2EA]/80 sm:text-base">
              {project.description}
            </p>
            {project.teamNote ? (
              <p className="text-xs tracking-wider text-[#D7E2EA]/55 uppercase">
                {project.teamNote}
              </p>
            ) : null}
            <div>
              <p className="mb-2 text-[10px] tracking-widest text-[#D7E2EA]/45 uppercase">
                What I built
              </p>
              <ul className="space-y-2 text-sm text-[#D7E2EA]/85">
                {project.built.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="text-[#D7E2EA]/35">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="space-y-1.5 text-sm text-[#D7E2EA]/70">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {project.safetyNote ? (
              <p className="text-xs leading-relaxed text-[#D7E2EA]/50">
                {project.safetyNote}
              </p>
            ) : null}
          </div>

          <div className="min-h-[220px] lg:min-h-0">
            <ProjectVisual slug={project.slug} />
          </div>
        </div>

        <m.p
          className="mt-6 border-t border-[#D7E2EA]/15 pt-4 text-[10px] tracking-[0.2em] text-[#D7E2EA]/55 uppercase sm:text-xs"
          initial={{ opacity: 0.55 }}
          whileInView={{ opacity: 1 }}
        >
          {project.technologies.join(" / ")}
        </m.p>
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
        <p className="text-xs font-light tracking-widest text-[#D7E2EA]/60 uppercase sm:text-sm">
          02 — Experience
        </p>
        <h2
          id="experience-heading"
          className="hero-heading mt-4 max-w-4xl font-black tracking-tight uppercase leading-none"
          style={{ fontSize: "clamp(2.5rem, 8vw, 96px)" }}
        >
          Technical
          <br />
          experience
        </h2>
      </FadeIn>

      <ul className="mt-16 space-y-0 md:mt-24">
        {landingExperience.map((role, index) => (
          <FadeIn key={role.id} delay={0.08 * index} y={28}>
            <>
              <li className="border-t border-[#D7E2EA]/20 py-10 md:py-14">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-16">
                  <div>
                    <p className="text-xs tracking-widest text-[#D7E2EA]/50 uppercase">
                      {role.dates}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#D7E2EA] md:text-3xl">
                      {role.role}
                    </h3>
                    <p className="mt-2 text-sm text-[#D7E2EA]/70 md:text-base">
                      {role.org}
                    </p>
                  </div>
                  <div className="space-y-5">
                    <p className="text-lg text-[#BBCCD7] md:text-xl">
                      {role.statement}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {role.areas.map((area) => (
                        <li
                          key={area}
                          className="rounded-full border border-[#D7E2EA]/20 px-3 py-1 text-[10px] tracking-widest text-[#D7E2EA]/75 uppercase"
                        >
                          {area}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[10px] tracking-[0.18em] text-[#D7E2EA]/45 uppercase">
                      {role.technologies.join(" / ")}
                    </p>
                  </div>
                </div>
              </li>

              {role.id === "abra" ? (
                <li className="border-t border-[#D7E2EA]/15 py-8 md:py-10">
                  <p
                    className="font-bold tracking-wide text-[#D7E2EA] sm:inline-flex sm:items-center sm:gap-2 sm:whitespace-nowrap"
                    style={{ fontSize: "clamp(0.85rem, 1.85vw, 1.125rem)" }}
                  >
                    <span className="block whitespace-nowrap sm:inline">
                      Took a 3-year &quot;break&quot; to get a Computer Science
                      degree
                    </span>{" "}
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      (Oct 2021 – Oct 2024) to become a
                      <CornerRightUp
                        aria-hidden
                        className="-translate-y-1 size-[1.35em] text-[#BBCCD7] sm:size-[1.75em]"
                        strokeWidth={2.5}
                      />
                    </span>
                  </p>
                </li>
              ) : null}
            </>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}

export function LandingWorkSection() {
  const total = landingProjects.length;

  return (
    <section id="work" aria-labelledby="work-heading" className="relative">
      <div className="px-5 pt-24 sm:px-8 md:px-10 md:pt-32">
        <FadeIn y={40}>
          <p className="text-xs font-light tracking-widest text-[#D7E2EA]/60 uppercase sm:text-sm">
            01 — Selected Projects
          </p>
          <h2
            id="work-heading"
            className="hero-heading mt-4 font-black tracking-tight uppercase leading-none"
            style={{ fontSize: "clamp(2.75rem, 9vw, 120px)" }}
          >
            Selected
            <br />
            Projects
          </h2>
        </FadeIn>
      </div>

      <div className="relative mt-12 px-3 sm:px-6 md:mt-16 md:px-8">
        {landingProjects.map((project, index) => (
          <StickyProjectCard
            key={project.slug}
            project={project}
            index={index}
            total={total}
          />
        ))}
      </div>

      <div className="h-24 md:h-40" aria-hidden />
      <ExperienceBlock />
    </section>
  );
}
