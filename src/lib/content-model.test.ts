import { describe, expect, it } from "vitest";

import {
  experience,
  PROFESSIONAL_CONFIDENTIALITY_NOTE,
} from "@/data/experience";
import { externalLinks, getConfiguredExternalActions } from "@/data/links";
import { missingContentChecklist } from "@/data/missing-content";
import {
  CLINICAL_SAFETY_NOTE,
  CLINICAL_SAVED_NOTE_LIMITATION,
  projects,
} from "@/data/projects";
import {
  assertContentInvariants,
  getDuplicateSlugs,
  hasRequiredClinicalSafety,
  hasRequiredProfessionalConfidentiality,
  isClinicalFollowUpDetector,
} from "@/lib/content-validation";
import {
  isConfiguredCvPath,
  isConfiguredEmail,
  isConfiguredHttpUrl,
  isConfiguredUrl,
  isFakePlaceholderValue,
} from "@/lib/links";
import {
  getAdjacentProjects,
  getAllProjects,
  getEducationalResearchProjects,
  getEngineeringPracticeProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectsByCategory,
  getPublicCaseStudies,
} from "@/lib/project-utils";

const expectedSlugs = [
  "clinical-follow-up-detector",
  "academease",
  "realtime-gpt-cli",
  "taptap-avengers",
  "overthewire-bandit",
  "atlas-research",
] as const;

describe("portfolio content model", () => {
  it("includes every expected verified project exactly once", () => {
    expect(getDuplicateSlugs(projects)).toEqual([]);
    expect(getAllProjects().map((project) => project.slug)).toEqual([
      ...expectedSlugs,
    ]);
  });

  it("looks up projects by slug", () => {
    expect(getProjectBySlug("academease")?.title).toBe("AcademEase");
    expect(getProjectBySlug("missing-project")).toBeUndefined();
  });

  it("returns featured public case studies only", () => {
    const featured = getFeaturedProjects();
    expect(featured.map((project) => project.slug)).toEqual([
      "clinical-follow-up-detector",
      "academease",
      "realtime-gpt-cli",
      "taptap-avengers",
    ]);
    expect(featured.every((project) => project.featured)).toBe(true);
  });

  it("filters by category and presentation kind", () => {
    expect(
      getProjectsByCategory("Unity Game Development").map(
        (project) => project.slug,
      ),
    ).toEqual(["taptap-avengers"]);

    expect(
      getPublicCaseStudies().every(
        (project) => project.kind === "public-case-study",
      ),
    ).toBe(true);
    expect(
      getEngineeringPracticeProjects().map((project) => project.slug),
    ).toEqual(["overthewire-bandit"]);
    expect(
      getEducationalResearchProjects().map((project) => project.slug),
    ).toEqual(["atlas-research"]);
  });

  it("returns previous and next project navigation", () => {
    expect(getAdjacentProjects("clinical-follow-up-detector")).toEqual({
      previous: null,
      next: getProjectBySlug("academease"),
    });
    expect(getAdjacentProjects("academease")).toEqual({
      previous: getProjectBySlug("clinical-follow-up-detector"),
      next: getProjectBySlug("realtime-gpt-cli"),
    });
    expect(getAdjacentProjects("atlas-research")).toEqual({
      previous: getProjectBySlug("overthewire-bandit"),
      next: null,
    });
    expect(getAdjacentProjects("unknown")).toEqual({
      previous: null,
      next: null,
    });
  });

  it("keeps required collaboration attribution on every project", () => {
    for (const project of projects) {
      expect(project.collaboration?.type).toBeTruthy();
      expect(project.collaboration.summary.length).toBeGreaterThan(0);
    }

    expect(
      getProjectBySlug("clinical-follow-up-detector")?.collaboration.type,
    ).toBe("pending-verification");
    expect(getProjectBySlug("realtime-gpt-cli")?.collaboration.type).toBe(
      "pending-verification",
    );
    expect(getProjectBySlug("academease")?.collaboration.type).toBe("team");
    expect(getProjectBySlug("taptap-avengers")?.collaboration.type).toBe(
      "team",
    );
    expect(getProjectBySlug("overthewire-bandit")?.collaboration.type).toBe(
      "individual-practice",
    );
    expect(getProjectBySlug("atlas-research")?.collaboration.type).toBe(
      "educational-research",
    );
  });

  it("structurally requires clinical safety content", () => {
    const clinical = getProjectBySlug("clinical-follow-up-detector");
    expect(clinical).toBeDefined();
    if (!clinical || !isClinicalFollowUpDetector(clinical)) {
      throw new Error("Expected clinical follow-up detector project");
    }

    expect(hasRequiredClinicalSafety(clinical)).toBe(true);
    expect(clinical.safetyNote).toBe(CLINICAL_SAFETY_NOTE);
    expect(clinical.clinicalSafety.knownSavedNoteLimitation).toBe(
      CLINICAL_SAVED_NOTE_LIMITATION,
    );
    expect(clinical.clinicalSafety.demonstrationSystemOnly).toBe(true);
    expect(clinical.clinicalSafety.clinicallyValidated).toBe(false);
    expect(clinical.clinicalSafety.forMedicalDecisionMaking).toBe(false);
    expect(clinical.clinicalSafety.forRealPatientData).toBe(false);
    expect(clinical.clinicalSafety.hipaaCompliant).toBe(false);
    expect(clinical.clinicalSafety.humanReviewMandatory).toBe(true);
    expect(clinical.clinicalSafety.aiOutputNeverAutomaticallyConfirmed).toBe(
      true,
    );
    expect(
      clinical.clinicalSafety.portfolioDemonstration
        .acceptsArbitraryMedicalInput,
    ).toBe(false);
    expect(
      clinical.clinicalSafety.portfolioDemonstration.sendsOpenAIRequests,
    ).toBe(false);
    expect(clinical.interactiveDemo.sendsOpenAIRequests).toBe(false);
    expect(clinical.interactiveDemo.acceptsArbitraryMedicalInput).toBe(false);
  });

  it("requires professional confidentiality content without public repos", () => {
    expect(experience).toHaveLength(1);
    const abra = experience[0]!;
    expect(hasRequiredProfessionalConfidentiality(abra)).toBe(true);
    expect(abra.kind).toBe("professional-work");
    expect(abra.confidentialityNote).toBe(PROFESSIONAL_CONFIDENTIALITY_NOTE);
    expect(abra.repositoryUrl).toBeNull();
    expect(abra.liveUrl).toBeNull();
    expect(abra.collaboration.type).toBe("professional");
  });

  it("treats missing links as unconfigured and rejects fake placeholders", () => {
    expect(isConfiguredUrl(null)).toBe(false);
    expect(isConfiguredUrl(undefined)).toBe(false);
    expect(isConfiguredUrl("")).toBe(false);
    expect(isConfiguredUrl("#")).toBe(false);
    expect(isConfiguredUrl("https://example.com/profile")).toBe(false);
    expect(isConfiguredUrl("[GITHUB_URL]")).toBe(false);
    expect(isFakePlaceholderValue("https://example.org")).toBe(true);
    expect(isConfiguredHttpUrl(externalLinks.githubUrl)).toBe(false);
    expect(isConfiguredEmail(externalLinks.email)).toBe(false);
    expect(isConfiguredCvPath(externalLinks.cvPath)).toBe(false);
    expect(getConfiguredExternalActions()).toEqual([]);

    for (const project of projects) {
      expect(isConfiguredHttpUrl(project.repositoryUrl)).toBe(false);
      expect(isConfiguredHttpUrl(project.liveUrl)).toBe(false);
    }
  });

  it("recognizes valid external link shapes", () => {
    expect(isConfiguredHttpUrl("https://github.com/keren")).toBe(true);
    expect(isConfiguredEmail("keren@domain.com")).toBe(true);
    expect(isConfiguredEmail("mailto:keren@domain.com")).toBe(true);
    expect(isConfiguredCvPath("/cv.pdf")).toBe(true);
    expect(isConfiguredCvPath("https://files.kerenschoss.dev/cv.pdf")).toBe(
      true,
    );
    expect(isConfiguredHttpUrl("https://linkedin.com/in/keren")).toBe(true);
  });

  it("keeps missing-content checklist unresolved until evidence exists", () => {
    expect(
      missingContentChecklist.every((item) => item.status === "unresolved"),
    ).toBe(true);
  });

  it("passes aggregate content invariants", () => {
    expect(() => assertContentInvariants(projects, experience)).not.toThrow();
  });
});
