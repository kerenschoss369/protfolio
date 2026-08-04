import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Surface } from "@/components/ui/Surface";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { ProfessionalWork } from "@/data/content-types";

type ProfessionalWorkSectionProps = {
  experience: ProfessionalWork;
};

/**
 * Professional Abra / EL AL work — never presented as a public repository case study.
 */
export function ProfessionalWorkSection({
  experience,
}: ProfessionalWorkSectionProps) {
  return (
    <section
      id="professional-work"
      aria-labelledby="professional-work-heading"
      className="border-border-subtle border-t bg-[color-mix(in_srgb,var(--surface-1)_50%,var(--background))] py-[var(--space-section)]"
    >
      <Container>
        <div className="editorial-grid gap-y-8">
          <div className="col-span-full space-y-4 lg:col-span-4">
            <Text variant="meta" className="text-steel">
              Professional experience
            </Text>
            <Heading as="h2" variant="section" id="professional-work-heading">
              Production frontend work
            </Heading>
            <Text variant="muted" className="max-w-[28rem] text-pretty">
              Represented separately from public portfolio repositories.
              Proprietary systems stay proprietary.
            </Text>
          </div>

          <div className="col-span-full lg:col-span-8">
            <Surface
              variant="raised"
              border="steel"
              padded
              className="space-y-6"
            >
              <div className="space-y-2">
                <Heading as="h3" variant="project">
                  {experience.role} at {experience.organization}
                </Heading>
                <Text variant="small" className="text-muted">
                  {experience.productContext} · {experience.dates.display}
                </Text>
              </div>

              <ul className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <li key={tech}>
                    <Tag variant="default">{tech}</Tag>
                  </li>
                ))}
              </ul>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Text variant="meta" className="text-muted">
                    Focus areas
                  </Text>
                  <ul className="space-y-2 text-[length:var(--text-sm)]">
                    {experience.workAreas.map((area) => (
                      <li key={area} className="flex gap-2">
                        <span aria-hidden className="text-steel">
                          —
                        </span>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <Text variant="meta" className="text-muted">
                    Responsibilities
                  </Text>
                  <ul className="space-y-2 text-[length:var(--text-sm)]">
                    {experience.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden className="text-steel">
                          —
                        </span>
                        <span className="text-pretty">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="border-border-subtle text-muted border-t pt-4 text-[length:var(--text-sm)] text-pretty">
                {experience.confidentialityNote}
              </p>
            </Surface>
          </div>
        </div>
      </Container>
    </section>
  );
}
