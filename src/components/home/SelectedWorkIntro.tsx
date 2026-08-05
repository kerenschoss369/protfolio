import { Reveal } from "@/components/interactions/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export function SelectedWorkIntro() {
  return (
    <Section
      spacing="compact"
      className="border-border-subtle border-t"
      aria-labelledby="selected-work-heading"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-3">
              <Text variant="meta" className="text-steel">
                Selected work
              </Text>
              <Heading as="h2" variant="section" id="selected-work-heading">
                Interfaces, systems, and AI — presented visually
              </Heading>
            </div>
            <ButtonLink href="/work" variant="ghost" size="sm">
              Browse all work
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
