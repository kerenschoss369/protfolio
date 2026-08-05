import { Reveal } from "@/components/interactions/Reveal";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { ProfessionalWork } from "@/data/content-types";

type ExperiencePreviewProps = {
  experience: ProfessionalWork;
};

const STRIP_TECHS = ["Angular", "TypeScript", "RxJS", "Nx"] as const;

export function ExperiencePreview({ experience }: ExperiencePreviewProps) {
  return (
    <Section
      className="border-border-subtle border-t"
      aria-labelledby="experience-heading"
      spacing="compact"
    >
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-end lg:gap-16">
            <div className="space-y-3">
              <Text variant="meta" className="text-steel">
                Professional experience
              </Text>
              <Heading as="h2" variant="section" id="experience-heading">
                {experience.role} · {experience.organization}
              </Heading>
              <Text variant="muted" className="text-pretty">
                {experience.productContext} · {experience.dates.display}
              </Text>
            </div>

            <div className="space-y-4">
              <Text className="max-w-[36rem] text-pretty">
                Production features in a large Angular/Nx platform—responsive
                booking and passenger flows, reactive state, and careful API
                integration.
              </Text>
              <ul className="flex flex-wrap gap-2">
                {STRIP_TECHS.map((item) => (
                  <li key={item}>
                    <Tag variant="steel">{item}</Tag>
                  </li>
                ))}
              </ul>
              <p className="text-muted max-w-[40rem] text-[length:var(--text-sm)] text-pretty">
                {experience.confidentialityNote}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
