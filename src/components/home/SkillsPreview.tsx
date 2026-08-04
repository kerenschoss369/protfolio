import { Reveal } from "@/components/interactions/Reveal";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { SkillGroup } from "@/data/content-types";

type SkillsPreviewProps = {
  groups: SkillGroup[];
};

export function SkillsPreview({ groups }: SkillsPreviewProps) {
  return (
    <Section
      className="border-border-subtle border-t bg-[color-mix(in_srgb,var(--surface-1)_40%,var(--background))]"
      aria-labelledby="skills-heading"
    >
      <Container>
        <Reveal>
          <div className="mb-10 max-w-3xl space-y-4">
            <Text variant="meta" className="text-steel">
              Skills
            </Text>
            <Heading as="h2" variant="section" id="skills-heading">
              Practical application, not self-ratings
            </Heading>
            <Text variant="muted" className="max-w-[40rem] text-pretty">
              Grouped by how the work shows up—production frontend, full-stack
              systems, AI engineering, additional languages, and delivery
              workflow.
            </Text>
          </div>
        </Reveal>

        <div className="space-y-8">
          {groups.map((group, index) => (
            <Reveal key={group.id} stagger={Math.min(index, 2)}>
              <div className="border-border-subtle grid gap-4 border-t pt-6 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
                <Heading
                  as="h3"
                  variant="project"
                  className="text-[length:var(--text-body)]"
                >
                  {group.label}
                </Heading>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <Tag variant="default">{skill}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
