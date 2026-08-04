import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { EngineeringPrinciple } from "@/data/content-types";

const stateLabels = [
  { label: "Loading", variant: "steel" as const },
  { label: "Empty", variant: "default" as const },
  { label: "Error", variant: "danger" as const },
  { label: "Validation", variant: "warning" as const },
  { label: "Success", variant: "success" as const },
  { label: "Recovery", variant: "accent" as const },
];

type EngineeringApproachSectionProps = {
  principles: EngineeringPrinciple[];
};

export function EngineeringApproachSection({
  principles,
}: EngineeringApproachSectionProps) {
  return (
    <Section
      className="border-border-subtle border-t"
      aria-labelledby="approach-heading"
    >
      <Container>
        <div className="mb-10 max-w-3xl space-y-4">
          <Text variant="meta" className="text-steel">
            Engineering approach
          </Text>
          <Heading as="h2" variant="section" id="approach-heading">
            Build for real flows, not just happy paths
          </Heading>
          <Text variant="muted" className="max-w-[40rem] text-pretty">
            Interfaces inherit the quality of their contracts. Loading, empty,
            error, validation, success, and recovery states are part of the
            product—not afterthoughts.
          </Text>
        </div>

        <ol className="editorial-grid gap-y-6">
          {principles.map((principle, index) => (
            <li
              key={principle.id}
              className="border-border-subtle col-span-full space-y-3 border-t pt-6 sm:col-span-4 lg:col-span-3"
            >
              <p className="text-steel font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <Heading
                as="h3"
                variant="project"
                className="text-[length:var(--text-body-lg)]"
              >
                {principle.title}
              </Heading>
              <Text variant="small" className="text-muted text-pretty">
                {principle.summary}
              </Text>
            </li>
          ))}
        </ol>

        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Product states">
          {stateLabels.map((state) => (
            <li key={state.label}>
              <Tag variant={state.variant}>{state.label}</Tag>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
