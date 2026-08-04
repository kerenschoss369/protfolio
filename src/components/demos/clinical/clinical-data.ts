import type { ArchitectureDiagram } from "@/data/content-types";

/**
 * Fictional static extraction data for the Clinical Follow-Up Detector demo.
 * Dates are illustrative static values from the documented example — never
 * computed from "today".
 */

export const CLINICAL_FICTIONAL_NOTE =
  "Repeat CBC in seven days and schedule an oncology follow-up next month.";

export type ClinicalDemoMode =
  "source-note" | "extracted-actions" | "architecture";

export type ClinicalActionType = "Test" | "Appointment";

export type ClinicalExtractedAction = {
  id: string;
  title: string;
  type: ClinicalActionType;
  deadlineText: string;
  /** Illustrative static date or null when ambiguous. */
  normalizedDeadline: string | null;
  priority: "medium";
  evidence: string;
  needsReview: boolean;
  reviewReason: string | null;
  workflowState: "pending-human-review";
};

export const clinicalExtractedActions: readonly ClinicalExtractedAction[] = [
  {
    id: "action-cbc",
    title: "Repeat CBC",
    type: "Test",
    deadlineText: "in seven days",
    normalizedDeadline: "2026-06-13",
    priority: "medium",
    evidence: "Repeat CBC in seven days",
    needsReview: false,
    reviewReason: null,
    workflowState: "pending-human-review",
  },
  {
    id: "action-oncology",
    title: "Schedule oncology follow-up",
    type: "Appointment",
    deadlineText: "next month",
    normalizedDeadline: null,
    priority: "medium",
    evidence: "schedule an oncology follow-up next month",
    needsReview: true,
    reviewReason: "The timing is not precise enough to normalize safely",
    workflowState: "pending-human-review",
  },
] as const;

export const clinicalDemoSafetyMessages = [
  "Demonstration system only",
  "Not clinically validated",
  "Not for medical decision-making",
  "Not for real patient data",
  "Not HIPAA compliant",
  "All extracted actions require human review",
  "AI output is never automatically confirmed",
  "This portfolio simulation does not send data to OpenAI",
] as const;

/**
 * Demo architecture responsibilities aligned with the portfolio-spec demo.
 */
export const clinicalDemoArchitecture: ArchitectureDiagram = {
  id: "clinical-demo-architecture",
  title: "Clinical Follow-Up Detector architecture",
  nodes: [
    {
      id: "react",
      label: "React",
      responsibility:
        "Input, presentation, saved-note reload, and review / edit / complete interactions. Talks only to the Node API.",
    },
    {
      id: "node-api",
      label: "Node API",
      responsibility:
        "Public HTTP boundary, Zod validation, IDs, workflow rules, Python client, and SQLite persistence.",
    },
    {
      id: "python-ai",
      label: "Python AI service",
      responsibility:
        "Prompt construction, LLM call, structured parsing, Pydantic validation, and evidence checks.",
    },
    {
      id: "openai",
      label: "OpenAI",
      responsibility:
        "Extraction component only. Output is treated as untrusted.",
    },
    {
      id: "sqlite",
      label: "SQLite",
      responsibility: "Notes, actions, workflow state, and timestamps.",
    },
  ],
  edges: [
    { id: "react-node", from: "react", to: "node-api", label: "HTTP API" },
    {
      id: "node-python",
      from: "node-api",
      to: "python-ai",
      label: "AI service call",
    },
    {
      id: "python-openai",
      from: "python-ai",
      to: "openai",
      label: "Model request",
    },
    {
      id: "node-sqlite",
      from: "node-api",
      to: "sqlite",
      label: "Persistence",
    },
  ],
};

export const clinicalModeLabels: Record<ClinicalDemoMode, string> = {
  "source-note": "Source note",
  "extracted-actions": "Extracted actions",
  architecture: "System architecture",
};

/**
 * Split the fictional note into segments with evidence highlight ranges.
 */
export function getNoteHighlightSegments(
  note: string,
  evidenceSnippets: readonly string[],
): readonly { text: string; highlighted: boolean }[] {
  const ranges: { start: number; end: number }[] = [];

  for (const snippet of evidenceSnippets) {
    const start = note.toLowerCase().indexOf(snippet.toLowerCase());
    if (start >= 0) {
      ranges.push({ start, end: start + snippet.length });
    }
  }

  ranges.sort((a, b) => a.start - b.start);

  const merged: { start: number; end: number }[] = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range.start <= last.end) {
      last.end = Math.max(last.end, range.end);
    } else {
      merged.push({ ...range });
    }
  }

  const segments: { text: string; highlighted: boolean }[] = [];
  let cursor = 0;
  for (const range of merged) {
    if (cursor < range.start) {
      segments.push({
        text: note.slice(cursor, range.start),
        highlighted: false,
      });
    }
    segments.push({
      text: note.slice(range.start, range.end),
      highlighted: true,
    });
    cursor = range.end;
  }
  if (cursor < note.length) {
    segments.push({ text: note.slice(cursor), highlighted: false });
  }
  if (segments.length === 0) {
    segments.push({ text: note, highlighted: false });
  }
  return segments;
}
