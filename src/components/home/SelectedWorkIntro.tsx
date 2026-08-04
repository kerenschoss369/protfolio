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
        <div className="editorial-grid items-end gap-y-6">
          <div className="col-span-full max-w-3xl space-y-4 lg:col-span-8">
            <Text variant="meta" className="text-steel">
              Selected work
            </Text>
            <Heading as="h2" variant="section" id="selected-work-heading">
              Projects that show how interfaces, systems, and AI boundaries meet
            </Heading>
            <Text variant="muted" className="max-w-[40rem] text-pretty">
              Four featured compositions—each with its own visual language.
              Detailed case studies and interactive demonstrations arrive in
              later phases.
            </Text>
          </div>
          <div className="col-span-full lg:col-span-4 lg:justify-self-end">
            <ButtonLink href="/work" variant="ghost" size="sm">
              Browse all work
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
