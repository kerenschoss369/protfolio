import type { ProfessionalWork } from "@/data/content-types";

export type { ProfessionalWork } from "@/data/content-types";

export const PROFESSIONAL_CONFIDENTIALITY_NOTE =
  "Professional work is described at a high level. Source code and internal product details are proprietary.";

/**
 * Professional experience. Represented as proprietary work — not a public repository project.
 * Dates remain easy to update pending final verification.
 */
export const experience: ProfessionalWork[] = [
  {
    id: "abra-elal",
    kind: "professional-work",
    role: "Frontend Developer",
    organization: "Abra",
    productContext: "EL AL Airlines web platform",
    dates: {
      display: "2025–Present",
      verification: "pending-verification",
    },
    collaboration: {
      type: "professional",
      summary:
        "Professional team environment with backend, product, design, and QA collaborators.",
    },
    technologies: [
      "Angular",
      "TypeScript",
      "RxJS",
      "SCSS",
      "REST APIs",
      "Nx monorepo",
      "Git",
      "Bitbucket",
      "Jira",
      "Confluence",
    ],
    responsibilities: [
      "Developed production features in a large Angular/Nx monorepo",
      "Built and maintained responsive, pixel-precise interfaces",
      "Implemented and debugged complex reactive flows",
      "Integrated frontend behavior with backend API models",
      "Investigated production issues",
      "Handled rebasing and merge conflicts",
      "Participated in pull requests and code reviews",
      "Collaborated with backend, product, design, and QA",
    ],
    workAreas: [
      "Manage My Booking",
      "Passenger-management experiences",
      "Booking-related user flows",
      "Forms and validation",
      "API integration",
      "Reactive behavior",
      "Responsive UI",
      "Production issue investigation",
    ],
    confidentialityNotice: {
      id: "professional-proprietary",
      statement: PROFESSIONAL_CONFIDENTIALITY_NOTE,
    },
    confidentialityNote: PROFESSIONAL_CONFIDENTIALITY_NOTE,
    repositoryUrl: null,
    liveUrl: null,
  },
];
