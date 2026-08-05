import { AboutPortraitComposition } from "@/components/about/AboutPortraitComposition";
import { ConfidentialityNotice } from "@/components/case-study/ConfidentialityNotice";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { experience } from "@/data/experience";
import { educationAndResearch, portfolio } from "@/data/portfolio";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "About Keren Schoss — Frontend & Full-Stack Developer with production Angular experience and a photography background.",
  path: "/about",
});

export default function AboutPage() {
  const primaryExperience = experience[0];
  const editorialStatement =
    "Composition becomes interface — hierarchy, spacing, and precise implementation.";

  return (
    <Section spacing="default" aria-labelledby="about-heading">
      <Container>
        <div className="grid items-start gap-[var(--space-section-sm)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20">
          <AboutPortraitComposition
            statement={editorialStatement}
            className="order-1 min-h-[22rem] sm:min-h-[26rem] lg:sticky lg:top-24 lg:order-none lg:min-h-[32rem]"
          />

          <header className="order-2 max-w-[var(--prose-max)] space-y-6 lg:order-none lg:pt-4">
            <Text variant="meta" className="text-steel">
              Profile
            </Text>
            <Heading as="h1" variant="page" id="about-heading">
              About
            </Heading>
            <Text
              variant="body-lg"
              className="font-serif text-[length:var(--text-project)] leading-[var(--leading-snug)] text-pretty lg:hidden"
            >
              {editorialStatement}
            </Text>
            <Text variant="body-lg" className="text-pretty">
              {portfolio.name} is a {portfolio.title} based in{" "}
              {portfolio.location}.
            </Text>
            {portfolio.about.paragraphs.map((paragraph) => (
              <Text key={paragraph} variant="muted" className="text-pretty">
                {paragraph}
              </Text>
            ))}
            <ButtonLink href="/contact" variant="secondary" size="sm">
              Contact
            </ButtonLink>
          </header>
        </div>

        {primaryExperience ? (
          <section
            className="border-border-subtle mt-[var(--space-section)] max-w-[40rem] space-y-4 border-t pt-[var(--space-section-sm)]"
            aria-labelledby="about-experience-heading"
          >
            <Heading as="h2" variant="section" id="about-experience-heading">
              Experience
            </Heading>
            <Text as="p" className="font-medium">
              {primaryExperience.role} — {primaryExperience.organization}
            </Text>
            <Text variant="small" className="text-muted">
              {primaryExperience.productContext} ·{" "}
              {primaryExperience.dates.display}
            </Text>
            <Text variant="muted" className="text-pretty">
              Production Angular/Nx features across booking and passenger
              journeys, reactive flows, and API-integrated interfaces.
            </Text>
            <ConfidentialityNotice
              note={primaryExperience.confidentialityNote}
            />
          </section>
        ) : null}

        <section
          className="border-border-subtle mt-[var(--space-section-sm)] max-w-[40rem] space-y-6 border-t pt-[var(--space-section-sm)]"
          aria-labelledby="about-background-heading"
        >
          <Heading as="h2" variant="section" id="about-background-heading">
            Background
          </Heading>
          <ol className="space-y-5">
            {educationAndResearch.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1"
              >
                <span className="text-steel font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
                  {item.dates ?? "—"}
                </span>
                <div className="space-y-1">
                  <Text as="p" className="font-medium">
                    {item.title}
                  </Text>
                  <Text variant="small" className="text-muted text-pretty">
                    {item.organization}
                  </Text>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </Section>
  );
}
