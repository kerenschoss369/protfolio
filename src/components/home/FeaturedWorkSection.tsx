import {
  FeaturedAcademEase,
  FeaturedClinical,
  FeaturedRealtimeCli,
  FeaturedTapTap,
} from "@/components/home/FeaturedProjects";
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
          switch (project.slug) {
            case "clinical-follow-up-detector":
              return <FeaturedClinical key={project.slug} project={project} />;
            case "academease":
              return (
                <FeaturedAcademEase key={project.slug} project={project} />
              );
            case "realtime-gpt-cli":
              return (
                <FeaturedRealtimeCli key={project.slug} project={project} />
              );
            case "taptap-avengers":
              return <FeaturedTapTap key={project.slug} project={project} />;
            default:
              return null;
          }
        })}
      </Container>
    </Section>
  );
}
