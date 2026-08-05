import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { ProfessionalWork } from "@/data/content-types";

type ProfessionalWorkSectionProps = {
  experience: ProfessionalWork;
};

const DISPLAY_TECHS = ["Angular", "TypeScript", "RxJS", "SCSS", "Nx"] as const;

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
      className="border-border-subtle border-t py-[var(--space-section)]"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <div className="space-y-3">
            <Text variant="meta" className="text-steel">
              Professional experience
            </Text>
            <Heading as="h2" variant="section" id="professional-work-heading">
              {experience.role} · {experience.organization}
            </Heading>
            <Text variant="muted" className="text-pretty">
              {experience.productContext} · {experience.dates.display}
            </Text>
          </div>

          <div className="space-y-5">
            <Text className="max-w-[36rem] text-pretty">
              Production features in a large Angular/Nx monorepo—responsive
              booking and passenger flows, reactive state, and API integration.
            </Text>
            <ul className="flex flex-wrap gap-2">
              {DISPLAY_TECHS.map((tech) => (
                <li key={tech}>
                  <Tag variant="steel">{tech}</Tag>
                </li>
              ))}
            </ul>
            <p className="text-muted max-w-[40rem] text-[length:var(--text-sm)] text-pretty">
              {experience.confidentialityNote}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
