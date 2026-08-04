import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { portfolio } from "@/data/portfolio";

export function VisualBackgroundSection() {
  return (
    <Section
      className="border-border-subtle border-t"
      aria-labelledby="visual-heading"
    >
      <Container>
        <div className="editorial-grid items-center gap-y-10">
          <div className="col-span-full space-y-5 lg:col-span-6">
            <Text variant="meta" className="text-steel">
              Visual background
            </Text>
            <Heading as="h2" variant="section" id="visual-heading">
              Visual precision, applied to software
            </Heading>
            <Text className="max-w-[36rem] text-pretty">
              Professional fashion photography from 2014–2020 still shapes how
              interfaces are composed: hierarchy before decoration, spacing as
              structure, and collaboration that respects design intent down to
              the pixel.
            </Text>
            <Text variant="muted" className="max-w-[36rem] text-pretty">
              This is not a photography portfolio. It is a reminder that visual
              judgment and engineering rigor can share the same craft.
            </Text>
          </div>

          <div className="col-span-full lg:col-span-6">
            <div
              className="border-border-subtle relative overflow-hidden rounded-[var(--radius-lg)] border bg-[linear-gradient(145deg,var(--surface-1),var(--background)_55%,color-mix(in_srgb,var(--steel)_12%,var(--surface-2)))] p-6 sm:p-8"
              aria-hidden={false}
            >
              <p className="sr-only">
                Editorial composition listing photography-to-software
                connections
              </p>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <ul className="relative columns-1 space-y-3 gap-x-8 sm:columns-2">
                {portfolio.about.photographyConnections.map((item, index) => (
                  <li
                    key={item}
                    className="border-border-subtle flex break-inside-avoid items-baseline gap-3 border-b pb-3"
                  >
                    <span className="text-steel font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[length:var(--text-sm)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
