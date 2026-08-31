import type { Metadata } from "next";

import { HomeSectionLink } from "@/components/navigation/HomeSectionLink";
import { NotFoundReconnect } from "@/components/motion/NotFoundReconnect";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Page not found",
    description:
      "The requested page was not found. Return home or browse selected work by Keren Schoss.",
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <Section spacing="default" aria-labelledby="not-found-heading">
      <Container>
        <div className="max-w-[var(--prose-max)] space-y-6 py-[var(--space-8)]">
          <Text variant="meta" className="text-steel">
            404
          </Text>
          <NotFoundReconnect />
          <Heading as="h1" variant="page" id="not-found-heading">
            Page not found
          </Heading>
          <Text variant="muted" className="text-pretty">
            The page you requested does not exist. The system could not resolve
            this route — return home or browse selected work.
          </Text>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/" variant="primary">
              Home
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              Work
            </ButtonLink>
            <HomeSectionLink
              section="contact"
              className="pressable inline-flex min-h-[var(--touch-target)] items-center justify-center rounded-[var(--radius-md)] bg-transparent px-4 text-[length:var(--text-body)] font-medium text-foreground hover:bg-surface-1 active:bg-surface-2 focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
            >
              Contact
            </HomeSectionLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
