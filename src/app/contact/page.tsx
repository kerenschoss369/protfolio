import { ContactConverge } from "@/components/motion/ContactConverge";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { getConfiguredExternalLinks } from "@/data/links";
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
        <div className="mx-auto max-w-2xl space-y-12 text-center">
          <header className="space-y-5">
            <Text variant="meta" className="text-steel">
              Contact
            </Text>
            <Heading as="h1" variant="page" id="contact-heading">
              Contact
            </Heading>
            <Text
              variant="body-lg"
              className="font-serif text-[length:var(--text-project)] leading-[var(--leading-snug)] text-pretty"
            >
              Let’s build something precise, useful, and memorable.
            </Text>
            <Text variant="muted" className="text-pretty">
              Frontend, full-stack, and complex UI work.
            </Text>
          </header>

          <section aria-label="Contact methods">
            <ContactConverge email={links.email}>
              {hasAnyLink ? (
                <ul className="flex flex-col items-center gap-4 text-[length:var(--text-body-lg)] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
                  {links.email ? (
                    <li>
                      <TextLink href={`mailto:${links.email}`}>
                        Email Keren Schoss
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
                  Contact methods appear here when configured.
                </Text>
              )}
            </ContactConverge>
          </section>
        </div>
      </Container>
    </Section>
  );
}
