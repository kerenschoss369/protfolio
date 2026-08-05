import { AboutPortraitComposition } from "@/components/about/AboutPortraitComposition";
import { Reveal } from "@/components/interactions/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { portfolio } from "@/data/portfolio";

const PREVIEW_STATEMENT =
  "Composition becomes interface — hierarchy, spacing, and precise implementation.";

export function AboutPreview() {
  return (
    <Section
      className="border-border-subtle border-t"
      aria-labelledby="about-preview-heading"
    >
      <Container>
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
            <AboutPortraitComposition
              statement={PREVIEW_STATEMENT}
              className="min-h-[20rem] sm:min-h-[24rem] lg:min-h-[28rem]"
            />

            <div className="max-w-[32rem] space-y-5">
              <Text variant="meta" className="text-steel">
                About
              </Text>
              <Heading as="h2" variant="section" id="about-preview-heading">
                Visual precision, applied to software
              </Heading>
              <Text className="text-pretty">
                Fashion photography from 2014–2020 still shapes how interfaces
                are composed.
              </Text>
              <Text variant="muted" className="text-pretty">
                {portfolio.about.summary}
              </Text>
              <ButtonLink
                href="/about"
                variant="secondary"
                size="sm"
                className="group"
              >
                More about me
                <span aria-hidden className="link-arrow ms-1">
                  →
                </span>
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
