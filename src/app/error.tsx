"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section spacing="default" aria-labelledby="error-heading">
      <Container>
        <div className="max-w-[var(--prose-max)] space-y-6 py-[var(--space-8)]">
          <Text variant="meta" className="text-steel">
            Error
          </Text>
          <Heading as="h1" variant="page" id="error-heading">
            Something went wrong
          </Heading>
          <Text variant="muted" className="text-pretty">
            The page could not be rendered. Try again, or return to a known
            route. No personal data is submitted from this screen.
          </Text>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="primary" onClick={reset}>
              Try again
            </Button>
            <ButtonLink href="/" variant="secondary">
              Home
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              Work
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
