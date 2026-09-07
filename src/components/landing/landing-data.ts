import {
  CLINICAL_SAFETY_COMPACT,
  clinicalSafetyGuarantees,
} from "@/data/projects";
import { experience } from "@/data/experience";
import { educationAndResearch } from "@/data/portfolio";
import type { ProjectSlug } from "@/data/content-types";
import { getProjectBySlug } from "@/lib/project-utils";

/**
 * Homepage featured order and presentation-only copy.
 * Titles, categories, dates, safety, and collaboration come from canonical data.
 */
export const LANDING_FEATURED_SLUGS = [
  "clinical-follow-up-detector",
  "realtime-gpt-cli",
  "academease",
  "taptap-avengers",
] as const satisfies readonly ProjectSlug[];

type LandingPresentation = {
  statement: string;
};

const landingPresentation: Record<
  (typeof LANDING_FEATURED_SLUGS)[number],
  LandingPresentation
> = {
  "clinical-follow-up-detector": {
    statement:
      "Turning clinical follow-up instructions into structured, reviewable actions.",
  },
  "realtime-gpt-cli": {
    statement:
      "A realtime Go CLI built around event-driven communication with GPT-4o-mini.",
  },
  academease: {
    statement:
      "One platform for course resources and smarter semester planning.",
  },
  "taptap-avengers": {
    statement:
      "Recreating rhythm-game mechanics through timing, animation, audio synchronization, and gameplay systems.",
  },
};

export type LandingProject = {
  number: string;
  slug: ProjectSlug;
  title: string;
  category: string;
  statement: string;
  description: string;
  built: readonly string[];
  highlights: readonly string[];
  technologies: readonly string[];
  href: string;
  teamNote?: string;
  safetyNote?: string;
  simulationLabel?: string;
};

export function getLandingProjects(): LandingProject[] {
  return LANDING_FEATURED_SLUGS.map((slug, index) => {
    const project = getProjectBySlug(slug);
    if (!project) {
      throw new Error(`Missing canonical project for landing slug: ${slug}`);
    }

    const presentation = landingPresentation[slug];
    const teamNote =
      project.collaboration.type === "team"
        ? project.collaboration.summary
        : undefined;

    return {
      number: String(index + 1).padStart(2, "0"),
      slug,
      title: project.title,
      category: project.category,
      statement: presentation.statement,
      description: project.shortDescription,
      built: project.contribution.personal.items.slice(0, 4),
      highlights: project.architectureHighlights.slice(0, 4),
      technologies: project.technologyStack,
      href: `/work/${project.slug}`,
      teamNote,
      safetyNote:
        slug === "clinical-follow-up-detector"
          ? CLINICAL_SAFETY_COMPACT
          : undefined,
      simulationLabel:
        slug === "clinical-follow-up-detector"
          ? clinicalSafetyGuarantees.portfolioDemonstration.label
          : undefined,
    };
  });
}

export type LandingExperience = {
  id: string;
  role: string;
  org: string;
  dates: string;
  statement: string;
  areas: readonly string[];
  technologies: readonly string[];
  confidentialityNote?: string;
};

const landingExperiencePresentation: Record<
  string,
  {
    statement: string;
    showConfidentiality: boolean;
    areas?: readonly string[];
    showTechnologies?: boolean;
  }
> = {
  "abra-elal": {
    statement:
      "Developing production features across EL AL's large-scale web platform, working through complex business logic, user flows, APIs, state management, and real-world edge cases from implementation to production.",
    showConfidentiality: false,
    showTechnologies: false,
    areas: [
      "Angular",
      "HTML",
      "TypeScript",
      "RxJS",
      "SCSS",
      "NgRx",
      "REST APIs",
      "Nx monorepo",
    ],
  },
  "idf-soc": {
    statement:
      "Began in IT and network administration, supporting 10,000+ users, then trained in SOC operations at MAMRAM before establishing and leading the first SOC team in the IDF Manpower Directorate.",
    showConfidentiality: false,
  },
};

export function getLandingExperience(): LandingExperience[] {
  return experience.map((role) => {
    const presentation = landingExperiencePresentation[role.id];
    if (!presentation) {
      throw new Error(
        `Missing landing presentation for experience: ${role.id}`,
      );
    }

    return {
      id: role.id,
      role: role.role,
      org: role.productContext
        ? `${role.organization} — ${role.productContext}`
        : role.organization,
      dates: role.dates.display,
      statement: presentation.statement,
      areas: presentation.areas ?? role.workAreas.slice(0, 5),
      technologies:
        presentation.showTechnologies === false
          ? []
          : role.technologies.slice(0, 6),
      confidentialityNote: presentation.showConfidentiality
        ? role.confidentialityNote
        : undefined,
    };
  });
}

export function getLandingEducationNote() {
  const degree = educationAndResearch.find((item) => item.kind === "education");
  if (!degree) {
    return null;
  }

  return {
    title: degree.title,
    organization: degree.organization,
    dates: degree.dates,
  };
}

export const landingProjects = getLandingProjects();
export const landingExperience = getLandingExperience();
export const landingEducation = getLandingEducationNote();
