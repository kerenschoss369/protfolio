import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getConfiguredExternalLinks } from "@/data/links";

export function ContactCtaSection() {
  const links = getConfiguredExternalLinks();
  const hasAnyAction =
    Boolean(links.email) ||
    Boolean(links.linkedinUrl) ||
    Boolean(links.githubUrl) ||
    Boolean(links.cvPath);

  return (
    <Section
      className="border-border-subtle border-t"
      aria-labelledby="contact-cta-heading"
    >
      <Container>
        <div className="border-border-subtle rounded-[var(--radius-lg)] border bg-[linear-gradient(135deg,var(--surface-1),color-mix(in_srgb,var(--accent)_8%,var(--background)))] px-6 py-10 sm:px-10 sm:py-12">
          <div className="max-w-3xl space-y-5">
            <Text variant="meta" className="text-steel">
              Contact
            </Text>
            <Heading as="h2" variant="section" id="contact-cta-heading">
              Conversations about frontend, full-stack, and complex UI work
            </Heading>
            <Text variant="muted" className="max-w-[40rem] text-pretty">
              Open to discussing frontend development, full-stack product
              engineering, and interfaces that need careful state and boundary
              design.
            </Text>

            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/contact" variant="primary">
                Open contact
              </ButtonLink>
              {links.email ? (
                <ButtonLink href={`mailto:${links.email}`} variant="secondary">
                  Email
                </ButtonLink>
              ) : null}
              {links.linkedinUrl ? (
                <ButtonLink href={links.linkedinUrl} variant="ghost" external>
                  LinkedIn
                </ButtonLink>
              ) : null}
              {links.githubUrl ? (
                <ButtonLink href={links.githubUrl} variant="ghost" external>
                  GitHub
                </ButtonLink>
              ) : null}
              {links.cvPath ? (
                <ButtonLink href={links.cvPath} variant="ghost">
                  Download CV
                </ButtonLink>
              ) : null}
            </div>

            {!hasAnyAction ? (
              <Text variant="small" className="text-steel">
                External contact actions appear here once configured.
              </Text>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
