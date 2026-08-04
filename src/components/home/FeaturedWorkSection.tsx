import {
  FeaturedAcademEase,
  FeaturedClinical,
  FeaturedRealtimeCli,
  FeaturedTapTap,
} from "@/components/home/FeaturedProjects";
import { Reveal } from "@/components/interactions/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Project } from "@/data/content-types";

type FeaturedWorkSectionProps = {
  projects: Project[];
};

export function FeaturedWorkSection({ projects }: FeaturedWorkSectionProps) {
  return (
    <Section
      spacing="none"
      className="pb-[var(--space-section)]"
      aria-label="Featured projects"
    >
      <Container>
        {projects.map((project) => {
          const content = (() => {
            switch (project.slug) {
              case "clinical-follow-up-detector":
                return <FeaturedClinical project={project} />;
              case "academease":
                return <FeaturedAcademEase project={project} />;
              case "realtime-gpt-cli":
                return <FeaturedRealtimeCli project={project} />;
              case "taptap-avengers":
                return <FeaturedTapTap project={project} />;
              default:
                return null;
            }
          })();

          if (!content) {
            return null;
          }

          return (
            <Reveal key={project.slug} as="div">
              {content}
            </Reveal>
          );
        })}
      </Container>
    </Section>
  );
}
