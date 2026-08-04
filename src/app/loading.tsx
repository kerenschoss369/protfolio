import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export default function Loading() {
  return (
    <Section spacing="compact" aria-busy="true" aria-live="polite">
      <Container>
        <div className="max-w-[var(--prose-max)] space-y-4 py-[var(--space-8)]">
          <Text variant="meta" className="text-steel">
            Loading
          </Text>
          <div
            className="bg-surface-2 h-3 w-40 rounded-[var(--radius-sm)]"
            aria-hidden
          />
          <div
            className="bg-surface-1 h-8 w-full max-w-md rounded-[var(--radius-sm)]"
            aria-hidden
          />
          <div
            className="bg-surface-1 h-4 w-full max-w-lg rounded-[var(--radius-sm)]"
            aria-hidden
          />
          <span className="sr-only">Loading page content</span>
        </div>
      </Container>
    </Section>
  );
}
