"use client";

import { useId, useState } from "react";

import {
  clinicalDemoArchitecture,
  clinicalDemoSafetyMessages,
  clinicalExtractedActions,
  CLINICAL_FICTIONAL_NOTE,
  clinicalModeLabels,
  getNoteHighlightSegments,
  type ClinicalDemoMode,
} from "@/components/demos/clinical/clinical-data";
import {
  DemoControls,
  DemoDisclosure,
  DemoFrame,
  DemoHeader,
  DemoModeButton,
  DemoStatus,
  InteractiveArchitectureDiagram,
  SimulationNotice,
} from "@/components/demos/shared";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

const MODES: ClinicalDemoMode[] = [
  "source-note",
  "extracted-actions",
  "architecture",
];

export function ClinicalDemo() {
  const titleId = useId();
  const descriptionId = useId();
  const [mode, setMode] = useState<ClinicalDemoMode>("source-note");
  const [highlightEvidence, setHighlightEvidence] = useState(true);

  const evidenceSnippets = clinicalExtractedActions.map(
    (action) => action.evidence,
  );
  const segments = getNoteHighlightSegments(
    CLINICAL_FICTIONAL_NOTE,
    highlightEvidence ? evidenceSnippets : [],
  );

  return (
    <DemoFrame
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      minHeightClassName="min-h-[32rem]"
      className="bg-[linear-gradient(160deg,var(--surface-2),var(--background)_45%,color-mix(in_srgb,var(--accent)_6%,var(--background)))]"
    >
      <div className="space-y-4 p-4 sm:p-5">
        <SimulationNotice
          label="Static portfolio demonstration using fictional clinical text only."
          details={[
            "Not a live medical system",
            "No arbitrary note input",
            "Does not send data to OpenAI",
          ]}
        />

        <DemoHeader
          title="Clinical Follow-Up Detector simulation"
          titleId={titleId}
          description="Walk through a fixed fictional note, structured extraction, and system boundaries. Confirm and reject appear as explanatory workflow concepts only."
          descriptionId={descriptionId}
        />

        <aside
          className="border-warning/40 space-y-2 rounded-[var(--radius-md)] border bg-[color-mix(in_srgb,var(--warning)_10%,var(--background))] p-3"
          aria-label="Mandatory safety information"
        >
          <Text variant="meta" className="text-warning">
            Mandatory safety information
          </Text>
          <ul className="grid gap-1 sm:grid-cols-2">
            {clinicalDemoSafetyMessages.map((message) => (
              <li
                key={message}
                className="text-[length:var(--text-sm)] text-pretty"
              >
                {message}
              </li>
            ))}
          </ul>
        </aside>

        <DemoControls label="Simulation modes" className="gap-2">
          {MODES.map((item) => (
            <DemoModeButton
              key={item}
              label={clinicalModeLabels[item]}
              selected={mode === item}
              onSelect={() => setMode(item)}
            />
          ))}
        </DemoControls>

        <DemoStatus message={`Showing ${clinicalModeLabels[mode]}`} />

        <div className="min-h-[18rem]">
          {mode === "source-note" ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Tag variant="steel">Fictional note</Tag>
                <button
                  type="button"
                  aria-pressed={highlightEvidence}
                  onClick={() => setHighlightEvidence((value) => !value)}
                  className={cn(
                    "min-h-[var(--touch-target)] rounded-[var(--radius-md)] border px-3 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase",
                    "focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
                    highlightEvidence
                      ? "border-accent bg-accent-muted text-accent"
                      : "border-border-subtle bg-background",
                  )}
                >
                  Evidence highlight
                </button>
              </div>

              <blockquote className="border-border-strong bg-background rounded-[var(--radius-md)] border p-4 font-serif text-[length:var(--text-body-lg)] leading-[var(--leading-relaxed)] text-pretty">
                {segments.map((segment, index) =>
                  segment.highlighted ? (
                    <mark
                      key={`${segment.text}-${index}`}
                      className="text-foreground rounded-sm bg-[color-mix(in_srgb,var(--accent)_22%,transparent)] px-0.5"
                    >
                      {segment.text}
                    </mark>
                  ) : (
                    <span key={`${segment.text}-${index}`}>{segment.text}</span>
                  ),
                )}
              </blockquote>

              <DemoDisclosure summary="Evidence mapping">
                <ul className="space-y-2">
                  {clinicalExtractedActions.map((action) => (
                    <li key={action.id}>
                      <strong>{action.title}</strong> — “{action.evidence}”
                    </li>
                  ))}
                </ul>
              </DemoDisclosure>
            </div>
          ) : null}

          {mode === "extracted-actions" ? (
            <div className="space-y-4">
              <Text variant="small" className="text-muted text-pretty">
                Structured actions from the fictional note. Workflow chips show
                review concepts; they do not perform real medical actions.
              </Text>
              <ul className="grid gap-3 lg:grid-cols-2">
                {clinicalExtractedActions.map((action) => (
                  <li
                    key={action.id}
                    className="border-border-subtle bg-background space-y-3 rounded-[var(--radius-md)] border p-4"
                  >
                    <div className="flex flex-wrap gap-2">
                      <Tag variant={action.needsReview ? "warning" : "success"}>
                        {action.needsReview ? "Needs review" : "Evidence clear"}
                      </Tag>
                      <Tag variant="default">{action.type}</Tag>
                      <Tag variant="steel">Priority · {action.priority}</Tag>
                    </div>
                    <p className="font-sans text-[length:var(--text-body-lg)] font-medium">
                      {action.title}
                    </p>
                    <dl className="grid gap-2 text-[length:var(--text-sm)]">
                      <div>
                        <dt className="text-muted font-mono text-[length:var(--text-meta)] uppercase">
                          Deadline text
                        </dt>
                        <dd>{action.deadlineText}</dd>
                      </div>
                      <div>
                        <dt className="text-muted font-mono text-[length:var(--text-meta)] uppercase">
                          Normalized deadline
                        </dt>
                        <dd className="font-mono">
                          {action.normalizedDeadline ?? "null — ambiguous"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted font-mono text-[length:var(--text-meta)] uppercase">
                          Evidence
                        </dt>
                        <dd className="text-pretty">“{action.evidence}”</dd>
                      </div>
                      {action.needsReview && action.reviewReason ? (
                        <div>
                          <dt className="text-muted font-mono text-[length:var(--text-meta)] uppercase">
                            Why review is needed
                          </dt>
                          <dd className="text-pretty">{action.reviewReason}</dd>
                        </div>
                      ) : null}
                      <div>
                        <dt className="text-muted font-mono text-[length:var(--text-meta)] uppercase">
                          Workflow state
                        </dt>
                        <dd>Pending human review</dd>
                      </div>
                    </dl>
                    <div
                      className="border-border-subtle flex flex-wrap gap-2 border-t pt-3"
                      aria-label="Explanatory workflow concepts"
                    >
                      <Tag variant="default">Confirm · concept</Tag>
                      <Tag variant="default">Reject · concept</Tag>
                      <Text variant="small" className="text-muted w-full">
                        Shown as explanatory states only — not clinical
                        controls.
                      </Text>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {mode === "architecture" ? (
            <InteractiveArchitectureDiagram
              diagram={clinicalDemoArchitecture}
            />
          ) : null}
        </div>
      </div>
    </DemoFrame>
  );
}
