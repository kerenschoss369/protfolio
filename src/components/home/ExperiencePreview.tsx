import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Surface } from "@/components/ui/Surface";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import type { ProfessionalWork } from "@/data/content-types";

type ExperiencePreviewProps = {
  experience: ProfessionalWork;
};

export function ExperiencePreview({ experience }: ExperiencePreviewProps) {
  return (
    <Section
      className="border-border-subtle border-t bg-[color-mix(in_srgb,var(--surface-1)_55%,var(--background))]"
      aria-labelledby="experience-heading"
    >
      <Container>
        <div className="editorial-grid gap-y-8">
          <div className="col-span-full space-y-4 lg:col-span-4">
            <Text variant="meta" className="text-steel">
              Professional experience
            </Text>
            <Heading as="h2" variant="section" id="experience-heading">
              Production frontend work in a complex booking platform
            </Heading>
            <Text variant="muted" className="max-w-[28rem] text-pretty">
              High-level product context only. Proprietary systems stay
              proprietary.
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
                {[
                  "Angular",
                  "TypeScript",
                  "RxJS",
                  "SCSS",
                  "Nx",
                  "REST APIs",
                  "Responsive UI",
                ].map((item) => (
                  <li key={item}>
                    <Tag variant="default">{item}</Tag>
                  </li>
                ))}
              </ul>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Text variant="meta" className="text-muted">
                    Focus areas
                  </Text>
                  <ul className="space-y-2 text-[length:var(--text-sm)]">
                    {experience.workAreas.slice(0, 6).map((area) => (
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
                    Practice
                  </Text>
                  <ul className="space-y-2 text-[length:var(--text-sm)]">
                    <li>Production debugging</li>
                    <li>Complex booking and passenger-management flows</li>
                    <li>Cross-functional collaboration</li>
                    <li>Pixel-precise responsive interfaces</li>
                  </ul>
                </div>
              </div>

              <p className="border-border-subtle text-muted border-t pt-4 text-[length:var(--text-sm)] text-pretty">
                {experience.confidentialityNote}
              </p>

              <TextLink href="/about" muted>
                More about the background
              </TextLink>
            </Surface>
          </div>
        </div>
      </Container>
    </Section>
  );
}
