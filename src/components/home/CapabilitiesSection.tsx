import { Reveal } from "@/components/interactions/Reveal";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { CapabilityGroup } from "@/data/capabilities";

type CapabilitiesSectionProps = {
  groups: readonly CapabilityGroup[];
};

export function CapabilitiesSection({ groups }: CapabilitiesSectionProps) {
  return (
    <Section
      className="border-border-subtle border-t"
      aria-labelledby="capabilities-heading"
    >
      <Container>
        <Reveal>
          <div className="mb-12 max-w-xl space-y-3">
            <Text variant="meta" className="text-steel">
              Capabilities
            </Text>
            <Heading as="h2" variant="section" id="capabilities-heading">
              How the work shows up
            </Heading>
          </div>
        </Reveal>

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {groups.map((group, index) => (
            <Reveal key={group.id} as="li" stagger={Math.min(index, 2)}>
              <div className="border-border-subtle space-y-3 border-t pt-5">
                <Heading
                  as="h3"
                  variant="project"
                  className="text-[length:var(--text-body)]"
                >
                  {group.title}
                </Heading>
                <Text variant="small" className="text-muted text-pretty">
                  {group.phrase}
                </Text>
                <ul className="flex flex-wrap gap-1.5 pt-1">
                  {group.technologies.map((tech) => (
                    <li key={tech}>
                      <Tag variant="default">{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
