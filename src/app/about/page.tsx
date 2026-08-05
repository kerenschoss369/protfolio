import { AboutPortraitComposition } from "@/components/about/AboutPortraitComposition";
import { ConfidentialityNotice } from "@/components/case-study/ConfidentialityNotice";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { engineeringPrinciples } from "@/data/engineering-approach";
import { experience } from "@/data/experience";
import { educationAndResearch, portfolio } from "@/data/portfolio";
import { skillGroups } from "@/data/skills";
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
        <div className="grid items-start gap-[var(--space-section-sm)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
          <AboutPortraitComposition
            statement={editorialStatement}
            className="order-1 min-h-[22rem] sm:min-h-[26rem] lg:sticky lg:top-24 lg:order-none lg:min-h-[32rem]"
          />

          <header className="order-2 max-w-[var(--prose-max)] space-y-5 lg:order-none lg:pt-2">
            <Text variant="meta" className="text-steel">
              Profile
            </Text>
            <Heading as="h1" variant="page" id="about-heading">
              About
            </Heading>
            <Text
              variant="body-lg"
              className="font-serif text-pretty text-[length:var(--text-project)] leading-[var(--leading-snug)] lg:hidden"
            >
              {editorialStatement}
            </Text>
            <Text variant="body-lg" className="text-pretty">
              {portfolio.name} is a {portfolio.title} based in{" "}
              {portfolio.location}.
            </Text>
            <Text variant="muted" className="text-pretty">
              {portfolio.about.summary}
            </Text>
            {portfolio.about.paragraphs.map((paragraph) => (
              <Text key={paragraph} variant="muted" className="text-pretty">
                {paragraph}
              </Text>
            ))}
          </header>
        </div>

        {primaryExperience ? (
          <section
            className="border-border-subtle mt-[var(--space-section-sm)] max-w-[var(--prose-max)] space-y-5 border-t pt-[var(--space-section-sm)]"
            aria-labelledby="about-experience-heading"
          >
            <Heading as="h2" variant="section" id="about-experience-heading">
              Professional experience
            </Heading>
            <div className="space-y-2">
              <Text as="p" className="font-medium">
                {primaryExperience.role} — {primaryExperience.organization}
              </Text>
              <Text variant="small" className="text-muted">
                {primaryExperience.productContext} ·{" "}
                {primaryExperience.dates.display}
              </Text>
            </div>
            <ul className="space-y-2 text-[length:var(--text-sm)]">
              {primaryExperience.workAreas.map((area) => (
                <li key={area} className="flex gap-2">
                  <span aria-hidden className="text-steel">
                    —
                  </span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
            <ConfidentialityNotice
              note={primaryExperience.confidentialityNote}
            />
          </section>
        ) : null}

        <section
          className="border-border-subtle mt-[var(--space-section-sm)] max-w-[var(--prose-max)] space-y-5 border-t pt-[var(--space-section-sm)]"
          aria-labelledby="about-background-heading"
        >
          <Heading as="h2" variant="section" id="about-background-heading">
            Background
          </Heading>
          <ul className="space-y-5">
            {educationAndResearch.map((item) => (
              <li key={item.id} className="space-y-1">
                <Text as="p" className="font-medium">
                  {item.title}
                  {item.dates ? ` · ${item.dates}` : null}
                </Text>
                <Text variant="small" className="text-muted text-pretty">
                  {item.organization}. {item.summary}
                </Text>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="border-border-subtle mt-[var(--space-section-sm)] max-w-[var(--prose-max)] space-y-5 border-t pt-[var(--space-section-sm)]"
          aria-labelledby="about-approach-heading"
        >
          <Heading as="h2" variant="section" id="about-approach-heading">
            Engineering approach
          </Heading>
          <ul className="space-y-5">
            {engineeringPrinciples.map((principle) => (
              <li key={principle.id} className="space-y-1">
                <Text as="p" className="font-medium">
                  {principle.title}
                </Text>
                <Text variant="small" className="text-muted text-pretty">
                  {principle.summary}
                </Text>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="border-border-subtle mt-[var(--space-section-sm)] space-y-8 border-t pt-[var(--space-section-sm)]"
          aria-labelledby="about-skills-heading"
        >
          <Heading as="h2" variant="section" id="about-skills-heading">
            Skills
          </Heading>
          {skillGroups.map((group) => (
            <div key={group.id} className="max-w-[var(--prose-max)] space-y-3">
              <Heading
                as="h3"
                variant="section"
                className="text-[length:var(--text-body-lg)]"
              >
                {group.label}
              </Heading>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Tag variant="default">{skill}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </Container>
    </Section>
  );
}
