import { X } from "lucide-react";
import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Heading } from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import { ProjectMeta } from "@/components/ui/ProjectMeta";
import { Section } from "@/components/ui/Section";
import { Surface } from "@/components/ui/Surface";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";

const typeScale = [
  {
    name: "Display",
    className:
      "font-serif text-[length:var(--text-display)] leading-[var(--leading-tight)]",
  },
  {
    name: "Hero",
    className:
      "font-serif text-[length:var(--text-hero)] leading-[var(--leading-tight)]",
  },
  {
    name: "Page",
    className:
      "font-serif text-[length:var(--text-page)] leading-[var(--leading-tight)]",
  },
  {
    name: "Section",
    className:
      "font-sans text-[length:var(--text-section)] font-medium leading-[var(--leading-snug)]",
  },
  {
    name: "Project",
    className:
      "font-serif text-[length:var(--text-project)] leading-[var(--leading-snug)]",
  },
  {
    name: "Body large",
    className:
      "text-[length:var(--text-body-lg)] leading-[var(--leading-relaxed)]",
  },
  {
    name: "Body",
    className: "text-[length:var(--text-body)] leading-[var(--leading-normal)]",
  },
  { name: "Small", className: "text-[length:var(--text-sm)]" },
  {
    name: "Metadata",
    className:
      "font-mono text-[length:var(--text-meta)] uppercase tracking-[var(--tracking-meta)]",
  },
  { name: "Code", className: "font-mono text-[length:var(--text-code)]" },
] as const;

const colorRoles = [
  {
    name: "background",
    swatch: "bg-background border border-border-subtle",
    fg: "text-foreground",
  },
  { name: "foreground", swatch: "bg-foreground", fg: "text-background" },
  {
    name: "surface-1",
    swatch: "bg-surface-1 border border-border-subtle",
    fg: "text-foreground",
  },
  {
    name: "surface-2",
    swatch: "bg-surface-2 border border-border-subtle",
    fg: "text-foreground",
  },
  { name: "muted", swatch: "bg-muted", fg: "text-background" },
  { name: "accent", swatch: "bg-accent", fg: "text-accent-contrast" },
  { name: "success", swatch: "bg-success", fg: "text-success-contrast" },
  { name: "warning", swatch: "bg-warning", fg: "text-warning-contrast" },
  { name: "danger", swatch: "bg-danger", fg: "text-danger-contrast" },
  { name: "steel", swatch: "bg-steel", fg: "text-background" },
  { name: "border-subtle", swatch: "bg-border-subtle", fg: "text-foreground" },
  { name: "border-strong", swatch: "bg-border-strong", fg: "text-background" },
] as const;

function PreviewBlock({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="max-w-[var(--prose-max)] space-y-2">
        <Heading as="h2" variant="section">
          {title}
        </Heading>
        <Text variant="muted">{description}</Text>
      </div>
      {children}
    </section>
  );
}

export function DesignSystemPreview() {
  return (
    <Container className="pt-[var(--space-section-sm)] pb-[var(--space-section)]">
      <header className="max-w-[var(--prose-max)] space-y-4">
        <Text variant="meta">Development only</Text>
        <Heading as="h1" variant="page">
          Design system
        </Heading>
        <Text variant="body-lg">
          Internal preview of typography, color roles, surfaces, controls, and
          interaction foundations. Not part of the public portfolio.
        </Text>
        <div className="flex flex-wrap items-center gap-3">
          <ThemeToggle />
          <Text variant="small" className="text-muted">
            Theme respects system preference, persists overrides, and avoids
            flash via the boot script.
          </Text>
        </div>
      </header>

      <Divider className="my-12" tone="steel" />

      <div className="space-y-16">
        <PreviewBlock
          title="Typography"
          description="Geist for UI and body, Source Serif 4 for editorial titles, Geist Mono for metadata and technical labels. Fluid sizes use clamp()."
        >
          <ul className="space-y-6">
            {typeScale.map((item) => (
              <li
                key={item.name}
                className="border-border-subtle border-b pb-4"
              >
                <Text variant="meta" className="text-muted mb-2">
                  {item.name}
                </Text>
                <p className={item.className}>
                  Precise systems with editorial clarity
                </p>
              </li>
            ))}
          </ul>
        </PreviewBlock>

        <PreviewBlock
          title="Color roles"
          description="Warm off-white light theme and deep graphite dark theme share one accent family. Status is never color-only."
        >
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {colorRoles.map((role) => (
              <li key={role.name}>
                <div
                  className={`flex h-20 items-end rounded-[var(--radius-md)] p-3 ${role.swatch}`}
                >
                  <span
                    className={`font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase ${role.fg}`}
                  >
                    {role.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </PreviewBlock>

        <PreviewBlock
          title="Buttons and links"
          description="Primary uses accent; secondary stays quiet. Touch targets stay near 44px. Tab through for focus-visible rings."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <IconButton label="Example icon action">
              <span aria-hidden className="font-mono text-sm">
                KS
              </span>
            </IconButton>
          </div>
          <div className="mt-6 space-y-2">
            <p>
              <TextLink href="/work">Internal text link to work</TextLink>
            </p>
            <p>
              <TextLink href="/about" muted>
                Muted text link
              </TextLink>
            </p>
          </div>
        </PreviewBlock>

        <PreviewBlock
          title="Tags, status, and project metadata"
          description="Monospace metadata and review states keep technical labels distinct from body copy."
        >
          <div className="flex flex-wrap gap-2">
            <Tag>Default</Tag>
            <Tag variant="accent">Accent</Tag>
            <Tag variant="steel">Steel</Tag>
            <Tag variant="success">Confirmed</Tag>
            <Tag variant="warning">Needs review</Tag>
            <Tag variant="danger">Rejected</Tag>
          </div>

          <Surface border="steel" padded className="mt-6 space-y-3">
            <ProjectMeta
              category="Full-Stack AI Application"
              dates="Demonstration"
              stack={["React", "Node.js", "FastAPI", "SQLite"]}
            />
            <Text>
              Structured note-to-action extraction with human review required.
            </Text>
          </Surface>

          <ul className="mt-6 space-y-3">
            <li>
              <Surface padded className="flex flex-wrap items-center gap-3">
                <Tag variant="warning">Needs review</Tag>
                <Text variant="small">
                  Evidence incomplete — human confirmation required before
                  completion.
                </Text>
              </Surface>
            </li>
            <li>
              <Surface padded className="flex flex-wrap items-center gap-3">
                <Tag variant="success">Confirmed</Tag>
                <Text variant="small">
                  Action reviewed and accepted; eligible to mark complete.
                </Text>
              </Surface>
            </li>
          </ul>
        </PreviewBlock>

        <PreviewBlock
          title="Surfaces and borders"
          description="Thin borders, soft tonal layers, and restrained steel highlights. Cards are not the default composition unit."
        >
          <div className="editorial-grid">
            <Surface
              variant="flat"
              border="subtle"
              padded
              className="col-span-full sm:col-span-4 lg:col-span-4"
            >
              <Text variant="meta" className="mb-2">
                Flat
              </Text>
              <Text variant="small">Background-aligned surface.</Text>
            </Surface>
            <Surface
              variant="raised"
              border="subtle"
              padded
              className="col-span-full sm:col-span-4 lg:col-span-4"
            >
              <Text variant="meta" className="mb-2">
                Raised
              </Text>
              <Text variant="small">Soft elevated tone.</Text>
            </Surface>
            <Surface
              variant="inset"
              border="steel"
              padded
              className="col-span-full sm:col-span-4 lg:col-span-4"
            >
              <Text variant="meta" className="mb-2">
                Inset + steel
              </Text>
              <Text variant="small">Subtle metallic edge treatment.</Text>
            </Surface>
          </div>
          <div className="mt-6 space-y-4">
            <Divider tone="subtle" />
            <Divider tone="strong" />
            <Divider tone="steel" />
          </div>
        </PreviewBlock>

        <PreviewBlock
          title="Architecture node sample"
          description="Keyboard-focusable node shell for later architecture diagrams. Responsibilities stay readable without motion."
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            {(
              [
                ["React", "UI and interaction boundary"],
                ["Node API", "Validation, workflow, persistence"],
                ["Python AI", "Prompting and structured extraction"],
              ] as const
            ).map(([title, detail]) => (
              <button
                key={title}
                type="button"
                className="border-border-subtle bg-surface-1 hover:border-border-strong focus-visible:outline-focus-ring min-h-[var(--touch-target)] flex-1 rounded-[var(--radius-md)] border px-4 py-3 text-left transition-[border-color,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
              >
                <Text as="span" variant="meta" className="text-accent">
                  {title}
                </Text>
                <Text as="span" variant="small" className="mt-1 block">
                  {detail}
                </Text>
              </button>
            ))}
          </div>
        </PreviewBlock>

        <PreviewBlock
          title="Terminal row sample"
          description="Monospace terminal vocabulary for the realtime CLI simulation later."
        >
          <Surface
            variant="inset"
            border="strong"
            className="overflow-x-auto p-4 font-mono text-[length:var(--text-code)]"
          >
            <div className="space-y-2">
              <p>
                <span className="text-steel">$</span> <span>6*7</span>
              </p>
              <p className="text-muted">→ function_call multiply(a=6, b=7)</p>
              <p className="text-success">→ local result 42</p>
              <p>assistant: 42</p>
            </div>
          </Surface>
        </PreviewBlock>

        <PreviewBlock
          title="Mobile navigation sample"
          description="Large targets and clear hierarchy for the future mobile panel. Escape, focus trap, and scroll lock arrive with navigation work."
        >
          <Surface border="subtle" className="max-w-sm overflow-hidden">
            <div className="border-border-subtle flex items-center justify-between border-b px-4 py-3">
              <Text as="span" className="font-medium">
                Keren Schoss
              </Text>
              <IconButton label="Close menu sample">
                <X size={18} aria-hidden />
              </IconButton>
            </div>
            <nav aria-label="Mobile sample" className="flex flex-col p-2">
              {["Work", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="hover:bg-surface-1 inline-flex min-h-[var(--touch-target)] items-center rounded-[var(--radius-md)] px-3 text-[length:var(--text-body-lg)]"
                >
                  {item}
                </a>
              ))}
            </nav>
          </Surface>
        </PreviewBlock>

        <PreviewBlock
          title="Focus and motion"
          description="Focus rings use --focus-ring. Motion durations collapse under prefers-reduced-motion."
        >
          <Surface padded border="subtle" className="max-w-[var(--prose-max)]">
            <Text>
              Tab through buttons and architecture nodes above. Essential
              content never depends on hover or animation. Durations: fast{" "}
              <code className="text-accent">120ms</code>, base{" "}
              <code className="text-accent">200ms</code>, slow{" "}
              <code className="text-accent">320ms</code>.
            </Text>
          </Surface>
        </PreviewBlock>
      </div>

      <Section spacing="compact" className="mt-8">
        <Text variant="meta" className="text-muted">
          Preview route is development-only and returns 404 in production.
        </Text>
      </Section>
    </Container>
  );
}
