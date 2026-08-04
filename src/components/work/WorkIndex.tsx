import { WorkFilters } from "@/components/work/WorkFilters";
import { ProfessionalWorkSection } from "@/components/work/ProfessionalWorkSection";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { ProfessionalWork, Project } from "@/data/content-types";

type WorkIndexProps = {
  projects: readonly Project[];
  experience: ProfessionalWork;
};

export function WorkIndex({ projects, experience }: WorkIndexProps) {
  return (
    <>
      <div className="pt-[var(--space-section-sm)] pb-[var(--space-section)]">
        <Container className="space-y-12">
          <header className="max-w-[42rem] space-y-4">
            <Text variant="meta" className="text-steel">
              Selected work
            </Text>
            <Heading as="h1" variant="page">
              Work
            </Heading>
            <Text variant="body-lg" className="text-pretty">
              Case studies across full-stack products, AI-integrated systems,
              game development, and engineering practice—alongside production
              frontend work presented separately for confidentiality.
            </Text>
          </header>

          <WorkFilters projects={projects} />
        </Container>
      </div>

      <ProfessionalWorkSection experience={experience} />
    </>
  );
}
