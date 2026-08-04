import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import {
  AnimatedText,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/AnimatedText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { getConfiguredExternalLinks } from "@/data/links";
import { portfolio } from "@/data/portfolio";

const HeroVisual = dynamic(
  () =>
    import("@/components/home/HeroVisual").then(
      (mod) => mod.HeroVisual,
    ) as Promise<ComponentType>,
  {
    ssr: true,
    loading: () => (
      <div
        className="border-border-subtle bg-surface-1 aspect-[5/4] w-full rounded-[var(--radius-lg)] border max-md:aspect-[4/3]"
        aria-hidden
      />
    ),
  },
);

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
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, color-mix(in srgb, var(--border-subtle) 55%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in srgb, var(--border-subtle) 55%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 75%)",
          }}
        />
      </div>

      <Container>
        <div className="editorial-grid items-center gap-y-10">
          <div className="col-span-full space-y-6 lg:col-span-6 xl:col-span-5">
            <AnimatedText
              as="p"
              delay={0}
              masked={false}
              className="font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] text-[var(--steel)] uppercase"
            >
              {portfolio.location}
            </AnimatedText>

            <div className="space-y-3">
              <AnimatedText as="div" delay={0.06} masked>
                <Heading as="h1" variant="hero" id="hero-heading">
                  {portfolio.name}
                </Heading>
              </AnimatedText>
              <AnimatedText
                as="p"
                delay={0.14}
                masked={false}
                className="text-muted text-[length:var(--text-body-lg)]"
              >
                {portfolio.title}
              </AnimatedText>
            </div>

            <AnimatedText
              as="p"
              delay={0.22}
              masked={false}
              className="text-foreground max-w-[38rem] text-[length:var(--text-body-lg)] text-pretty"
            >
              {portfolio.heroStatement}
            </AnimatedText>

            <AnimatedText
              as="p"
              delay={0.3}
              masked={false}
              className="text-muted max-w-[36rem] text-pretty"
            >
              {portfolio.supportingStatement}
            </AnimatedText>

            <StaggerGroup
              className="flex flex-wrap gap-3 pt-2"
              delayChildren={0.36}
            >
              <StaggerItem>
                <ButtonLink href="/work">View selected work</ButtonLink>
              </StaggerItem>
              {links.cvPath ? (
                <StaggerItem>
                  <ButtonLink href={links.cvPath} variant="secondary">
                    Download CV
                  </ButtonLink>
                </StaggerItem>
              ) : null}
            </StaggerGroup>

            {(links.githubUrl || links.linkedinUrl || links.email) && (
              <ul className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                {links.githubUrl ? (
                  <li>
                    <TextLink href={links.githubUrl} external>
                      GitHub
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
                {links.email ? (
                  <li>
                    <TextLink href={`mailto:${links.email}`}>Email</TextLink>
                  </li>
                ) : null}
              </ul>
            )}

            <ul className="flex flex-wrap gap-2 pt-2">
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
