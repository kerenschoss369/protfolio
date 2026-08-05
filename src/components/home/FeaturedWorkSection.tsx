"use client";

import {
  FeaturedAcademEase,
  FeaturedClinical,
  FeaturedRealtimeCli,
  FeaturedTapTap,
} from "@/components/home/FeaturedProjects";
import { StickyFeaturedStack } from "@/components/home/StickyFeaturedStack";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Project } from "@/data/content-types";

type FeaturedWorkSectionProps = {
  projects: Project[];
};

function renderFeatured(project: Project, index: number) {
  switch (project.slug) {
    case "clinical-follow-up-detector":
      return (
        <FeaturedClinical key={project.slug} project={project} index={index} />
      );
    case "academease":
      return (
        <FeaturedAcademEase
          key={project.slug}
          project={project}
          index={index}
        />
      );
    case "realtime-gpt-cli":
      return (
        <FeaturedRealtimeCli
          key={project.slug}
          project={project}
          index={index}
        />
      );
    case "taptap-avengers":
      return (
        <FeaturedTapTap key={project.slug} project={project} index={index} />
      );
    default:
      return null;
  }
}

export function FeaturedWorkSection({ projects }: FeaturedWorkSectionProps) {
  const cards = projects
    .map((project, index) => renderFeatured(project, index))
    .filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <Section
      spacing="none"
      className="pb-[var(--space-section)]"
      aria-label="Featured projects"
    >
      <Container>
        <StickyFeaturedStack>{cards}</StickyFeaturedStack>
      </Container>
    </Section>
  );
}
