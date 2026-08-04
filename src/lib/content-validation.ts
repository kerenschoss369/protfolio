import type {
  ClinicalFollowUpDetectorProject,
  ConfigurableUrl,
  ProfessionalWork,
  Project,
  ProjectSlug,
} from "@/data/content-types";
import { PROFESSIONAL_CONFIDENTIALITY_NOTE } from "@/data/experience";
import { externalLinks } from "@/data/links";
import {
  CLINICAL_SAFETY_NOTE,
  CLINICAL_SAVED_NOTE_LIMITATION,
} from "@/data/projects";
import { assertValidConfiguredUrl, isFakePlaceholderValue } from "@/lib/links";

export function getDuplicateSlugs(
  items: readonly { slug: string }[],
): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    if (seen.has(item.slug)) {
      duplicates.add(item.slug);
    }
    seen.add(item.slug);
  }

  return [...duplicates];
}

export function assertUniqueProjectSlugs(
  items: readonly { slug: ProjectSlug | string }[],
): void {
  const duplicates = getDuplicateSlugs(items);
  if (duplicates.length > 0) {
    throw new Error(`Duplicate project slugs: ${duplicates.join(", ")}`);
  }
}

export function isClinicalFollowUpDetector(
  project: Project,
): project is ClinicalFollowUpDetectorProject {
  return project.slug === "clinical-follow-up-detector";
}

export function hasRequiredClinicalSafety(project: Project): boolean {
  if (!isClinicalFollowUpDetector(project)) {
    return true;
  }

  const safety = project.clinicalSafety;

  return (
    safety.demonstrationSystemOnly === true &&
    safety.clinicallyValidated === false &&
    safety.forMedicalDecisionMaking === false &&
    safety.forRealPatientData === false &&
    safety.hipaaCompliant === false &&
    safety.humanReviewMandatory === true &&
    safety.aiOutputNeverAutomaticallyConfirmed === true &&
    safety.knownSavedNoteLimitation === CLINICAL_SAVED_NOTE_LIMITATION &&
    safety.portfolioDemonstration.staticOnly === true &&
    safety.portfolioDemonstration.acceptsArbitraryMedicalInput === false &&
    safety.portfolioDemonstration.sendsOpenAIRequests === false &&
    project.interactiveDemo.acceptsArbitraryMedicalInput === false &&
    project.interactiveDemo.sendsOpenAIRequests === false &&
    project.interactiveDemo.staticOnly === true &&
    project.safetyNote === CLINICAL_SAFETY_NOTE &&
    safety.notices.length >= 7
  );
}

export function hasRequiredProfessionalConfidentiality(
  item: ProfessionalWork,
): boolean {
  return (
    item.kind === "professional-work" &&
    item.repositoryUrl === null &&
    item.liveUrl === null &&
    item.confidentialityNote === PROFESSIONAL_CONFIDENTIALITY_NOTE &&
    item.confidentialityNotice.statement ===
      PROFESSIONAL_CONFIDENTIALITY_NOTE &&
    item.collaboration.type === "professional"
  );
}

export function collectConfiguredContentUrls(projects: readonly Project[]): {
  label: string;
  value: ConfigurableUrl;
  kind: "http" | "email" | "cv" | "any";
}[] {
  const entries: {
    label: string;
    value: ConfigurableUrl;
    kind: "http" | "email" | "cv" | "any";
  }[] = [
    { label: "githubUrl", value: externalLinks.githubUrl, kind: "http" },
    { label: "linkedinUrl", value: externalLinks.linkedinUrl, kind: "http" },
    { label: "email", value: externalLinks.email, kind: "email" },
    { label: "cvPath", value: externalLinks.cvPath, kind: "cv" },
    { label: "siteUrl", value: externalLinks.siteUrl, kind: "http" },
  ];

  for (const project of projects) {
    entries.push({
      label: `${project.slug}.repositoryUrl`,
      value: project.repositoryUrl,
      kind: "http",
    });
    entries.push({
      label: `${project.slug}.liveUrl`,
      value: project.liveUrl,
      kind: "http",
    });
  }

  return entries;
}

export function assertContentLinkConfiguration(
  projects: readonly Project[],
): void {
  for (const entry of collectConfiguredContentUrls(projects)) {
    if (entry.value == null) {
      continue;
    }

    if (isFakePlaceholderValue(entry.value)) {
      throw new Error(
        `${entry.label} must not use fake placeholder values: ${entry.value}`,
      );
    }

    assertValidConfiguredUrl(entry.value, entry.label, entry.kind);
  }
}

export function assertContentInvariants(
  projects: readonly Project[],
  experience: readonly ProfessionalWork[],
): void {
  assertUniqueProjectSlugs(projects);
  assertContentLinkConfiguration(projects);

  for (const project of projects) {
    if (!project.collaboration) {
      throw new Error(`${project.slug} is missing collaboration attribution`);
    }

    if (!hasRequiredClinicalSafety(project)) {
      throw new Error(
        `${project.slug} is missing required clinical safety guarantees`,
      );
    }
  }

  for (const item of experience) {
    if (!hasRequiredProfessionalConfidentiality(item)) {
      throw new Error(
        `${item.id} is missing required professional confidentiality content`,
      );
    }
  }
}
