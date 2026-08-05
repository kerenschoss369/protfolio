import { Reveal } from "@/components/interactions/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getConfiguredExternalLinks } from "@/data/links";

export function ContactCtaSection() {
  const links = getConfiguredExternalLinks();

  return (
    <Section
      className="border-border-subtle border-t"
      aria-labelledby="contact-cta-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <Text variant="meta" className="text-steel">
              Contact
            </Text>
            <Heading as="h2" variant="section" id="contact-cta-heading">
              Let’s build something precise, useful, and memorable.
            </Heading>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <ButtonLink href="/contact" variant="primary">
                Get in touch
              </ButtonLink>
              {links.email ? (
                <ButtonLink href={`mailto:${links.email}`} variant="secondary">
                  Email
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
