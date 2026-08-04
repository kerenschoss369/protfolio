import { HeroVisual } from "@/components/home/HeroVisual";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getConfiguredExternalLinks } from "@/data/links";
import { portfolio } from "@/data/portfolio";

const heroTechnologies = [
  "Angular",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Go",
] as const;

export function HeroSection() {
  const links = getConfiguredExternalLinks();

  return (
    <Section
      spacing="compact"
      className="relative overflow-hidden pt-[clamp(2.5rem,6vw,4.5rem)]"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_60%)]"
      />

      <Container>
        <div className="editorial-grid items-center gap-y-10">
          <div className="col-span-full space-y-6 lg:col-span-6 xl:col-span-5">
            <Text variant="meta" className="text-steel">
              {portfolio.location}
            </Text>

            <div className="space-y-3">
              <Heading as="h1" variant="hero" id="hero-heading">
                {portfolio.name}
              </Heading>
              <Text variant="body-lg" className="text-muted">
                {portfolio.title}
              </Text>
            </div>

            <Text
              variant="body-lg"
              className="text-foreground max-w-[38rem] text-pretty"
            >
              {portfolio.heroStatement}
            </Text>

            <Text variant="muted" className="max-w-[36rem] text-pretty">
              {portfolio.supportingStatement}
            </Text>

            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/work">View selected work</ButtonLink>
              {links.cvPath ? (
                <ButtonLink href={links.cvPath} variant="secondary">
                  Download CV
                </ButtonLink>
              ) : null}
            </div>

            {(links.githubUrl || links.linkedinUrl || links.email) && (
              <ul className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                {links.githubUrl ? (
                  <li>
                    <a
                      href={links.githubUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-muted hover:text-foreground inline-flex min-h-11 items-center text-[length:var(--text-sm)] underline-offset-4 hover:underline"
                    >
                      GitHub
                    </a>
                  </li>
                ) : null}
                {links.linkedinUrl ? (
                  <li>
                    <a
                      href={links.linkedinUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-muted hover:text-foreground inline-flex min-h-11 items-center text-[length:var(--text-sm)] underline-offset-4 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </li>
                ) : null}
                {links.email ? (
                  <li>
                    <a
                      href={`mailto:${links.email}`}
                      className="text-muted hover:text-foreground inline-flex min-h-11 items-center text-[length:var(--text-sm)] underline-offset-4 hover:underline"
                    >
                      Email
                    </a>
                  </li>
                ) : null}
              </ul>
            )}

            <ul className="flex flex-wrap gap-x-3 gap-y-2 pt-2">
              {heroTechnologies.map((tech) => (
                <li
                  key={tech}
                  className="text-steel font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-full lg:col-span-6 xl:col-span-7">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </Section>
  );
}
