import type { MissingContentItem } from "@/data/content-types";

/**
 * Central missing-content checklist.
 * Items stay unresolved until repository evidence or Keren supplies real values.
 */
export const missingContentChecklist: MissingContentItem[] = [
  { id: "github-profile", label: "GitHub profile", status: "resolved" },
  { id: "linkedin-profile", label: "LinkedIn profile", status: "resolved" },
  { id: "email", label: "Email", status: "resolved" },
  { id: "cv-pdf", label: "CV PDF", status: "resolved" },
  { id: "domain", label: "Domain / site URL", status: "unresolved" },
  {
    id: "public-repository-links",
    label: "Public repository links",
    status: "unresolved",
  },
  { id: "live-demos", label: "Live demos", status: "unresolved" },
  {
    id: "project-screenshots",
    label: "Project screenshots",
    status: "unresolved",
  },
  {
    id: "profile-photograph",
    label: "Optional profile photograph",
    status: "unresolved",
  },
  {
    id: "employment-dates",
    label: "Confirmed employment dates",
    status: "unresolved",
  },
  {
    id: "education-dates",
    label: "Confirmed education dates",
    status: "resolved",
  },
  {
    id: "repository-visibility",
    label: "Confirmation of public/private repository status",
    status: "unresolved",
  },
  {
    id: "clinical-go-ownership",
    label: "Confirmation of ownership for the clinical and Go repositories",
    status: "unresolved",
  },
];

export function getUnresolvedMissingContent() {
  return missingContentChecklist.filter((item) => item.status === "unresolved");
}
