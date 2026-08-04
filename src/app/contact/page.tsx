import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { getConfiguredExternalLinks } from "@/data/links";
import { portfolio } from "@/data/portfolio";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Keren Schoss about frontend development, full-stack engineering, and complex UI work.",
  path: "/contact",
});

export default function ContactPage() {
  const links = getConfiguredExternalLinks();
  const hasAnyLink = Boolean(
    links.email || links.linkedinUrl || links.githubUrl || links.cvPath,
  );

  return (
    <Section spacing="default" aria-labelledby="contact-heading">
      <Container>
        <header className="max-w-[var(--prose-max)] space-y-5">
          <Text variant="meta" className="text-steel">
            Contact
          </Text>
          <Heading as="h1" variant="page" id="contact-heading">
            Contact
          </Heading>
          <Text variant="muted" className="text-pretty">
            Open to conversations about frontend development, full-stack
            development, product engineering, and complex UI work.
          </Text>
        </header>

        <section
          className="mt-10 max-w-[var(--prose-max)] space-y-4"
          aria-label="Contact methods"
        >
          {hasAnyLink ? (
            <ul className="space-y-3 text-[length:var(--text-body)]">
              {links.email ? (
                <li>
                  <TextLink href={`mailto:${links.email}`}>
                    Email {portfolio.name}
                  </TextLink>
                </li>
              ) : null}
              {links.linkedinUrl ? (
                <li>
                  <TextLink href={links.linkedinUrl} external>
                    LinkedIn
                  </TextLink>
                </li>
              ) : null}
              {links.githubUrl ? (
                <li>
                  <TextLink href={links.githubUrl} external>
                    GitHub
                  </TextLink>
                </li>
              ) : null}
              {links.cvPath ? (
                <li>
                  <TextLink href={links.cvPath}>Download CV</TextLink>
                </li>
              ) : null}
            </ul>
          ) : (
            <Text variant="small" className="text-muted text-pretty">
              Contact methods are not configured yet. Verified email, LinkedIn,
              GitHub, and CV links will appear here when available — no
              placeholder actions are shown.
            </Text>
          )}
        </section>
      </Container>
    </Section>
  );
}
