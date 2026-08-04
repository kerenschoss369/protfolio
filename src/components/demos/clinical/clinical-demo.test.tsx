import { describe, expect, it } from "vitest";

import {
  CLINICAL_FICTIONAL_NOTE,
  clinicalDemoSafetyMessages,
  clinicalExtractedActions,
  getNoteHighlightSegments,
} from "@/components/demos/clinical/clinical-data";

describe("clinical demo data", () => {
  it("uses the documented fictional note", () => {
    expect(CLINICAL_FICTIONAL_NOTE).toBe(
      "Repeat CBC in seven days and schedule an oncology follow-up next month.",
    );
  });

  it("maps evidence to source note highlights", () => {
    const segments = getNoteHighlightSegments(
      CLINICAL_FICTIONAL_NOTE,
      clinicalExtractedActions.map((action) => action.evidence),
    );
    const highlighted = segments
      .filter((segment) => segment.highlighted)
      .map((segment) => segment.text)
      .join("");
    expect(highlighted.toLowerCase()).toContain("repeat cbc in seven days");
    expect(highlighted.toLowerCase()).toContain(
      "schedule an oncology follow-up next month",
    );
  });

  it("flags ambiguous deadline for review with static dates", () => {
    const clear = clinicalExtractedActions.find((a) => a.id === "action-cbc");
    const review = clinicalExtractedActions.find(
      (a) => a.id === "action-oncology",
    );
    expect(clear?.needsReview).toBe(false);
    expect(clear?.normalizedDeadline).toBe("2026-06-13");
    expect(review?.needsReview).toBe(true);
    expect(review?.normalizedDeadline).toBeNull();
    expect(review?.reviewReason).toMatch(/not precise enough/i);
  });

  it("includes mandatory safety messages including no OpenAI send", () => {
    expect(clinicalDemoSafetyMessages).toEqual(
      expect.arrayContaining([
        "Demonstration system only",
        "Not clinically validated",
        "Not for medical decision-making",
        "Not for real patient data",
        "Not HIPAA compliant",
        "All extracted actions require human review",
        "AI output is never automatically confirmed",
        "This portfolio simulation does not send data to OpenAI",
      ]),
    );
  });
});
