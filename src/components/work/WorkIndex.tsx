import { WorkFilters } from "@/components/work/WorkFilters";
import { ProfessionalWorkSection } from "@/components/work/ProfessionalWorkSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { ProfessionalWork, Project } from "@/data/content-types";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data";

type WorkIndexProps = {
  projects: readonly Project[];
  experience: ProfessionalWork;
};

export function WorkIndex({ projects, experience }: WorkIndexProps) {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <div className="pt-[var(--space-section-sm)] pb-[var(--space-section)]">
        <Container className="space-y-12">
          <header className="max-w-[36rem] space-y-4">
            <Text variant="meta" className="text-steel">
              Selected work
            </Text>
            <Heading as="h1" variant="page">
              Work
            </Heading>
            <Text variant="body-lg" className="text-pretty">
              Case studies, practice, and research—with production work kept
              separate for confidentiality.
            </Text>
          </header>

          <WorkFilters projects={projects} />
        </Container>
      </div>

      <ProfessionalWorkSection experience={experience} />
    </>
  );
}
