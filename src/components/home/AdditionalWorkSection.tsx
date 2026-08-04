import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ProjectMeta } from "@/components/ui/ProjectMeta";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/content-types";
import { getCollaborationLabel } from "@/lib/project-utils";

type AdditionalWorkSectionProps = {
  projects: Project[];
};

export function AdditionalWorkSection({
  projects,
}: AdditionalWorkSectionProps) {
  return (
    <Section
      className="border-border-subtle border-t"
      aria-labelledby="additional-work-heading"
    >
      <Container>
        <div className="mb-8 max-w-3xl space-y-4">
          <Text variant="meta" className="text-steel">
            Additional engineering work
          </Text>
          <Heading as="h2" variant="section" id="additional-work-heading">
            Practice and research, kept compact
          </Heading>
          <Text variant="muted" className="max-w-[40rem] text-pretty">
            These entries support the story without competing with the featured
            product case studies.
          </Text>
        </div>

        <ul className="divide-border-subtle divide-y border-y border-[var(--border-subtle)]">
          {projects.map((project) => (
            <li key={project.slug} className="py-6">
              <article className="editorial-grid gap-y-3">
                <div className="col-span-full space-y-3 md:col-span-8">
                  <ProjectMeta
                    category={project.category}
                    dates={project.dates.display}
                  />
                  <Heading
                    as="h3"
                    variant="project"
                    className="text-[length:var(--text-body-lg)]"
                  >
                    <Link
                      href={`/work/${project.slug}`}
                      className="hover:text-accent transition-colors"
                    >
                      {project.title}
                    </Link>
                  </Heading>
                  <Text
                    variant="small"
                    className="text-muted max-w-[40rem] text-pretty"
                  >
                    {project.shortDescription}
                  </Text>
                  {project.slug === "overthewire-bandit" ? (
                    <Text variant="small" className="text-steel">
                      Solutions, passwords, and flags are intentionally omitted.
                    </Text>
                  ) : null}
                  {project.slug === "atlas-research" ? (
                    <Text variant="small" className="text-steel">
                      Educational research context—no discovery credit implied.
                    </Text>
                  ) : null}
                </div>
                <div className="col-span-full md:col-span-4 md:justify-self-end md:text-right">
                  <Text variant="meta" className="text-steel">
                    {getCollaborationLabel(project.collaboration)}
                  </Text>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
