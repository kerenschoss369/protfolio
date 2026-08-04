import type {
  CollaborationAttribution,
  Project,
  ProjectCategory,
  ProjectSlug,
  ProjectStatus,
} from "@/data/content-types";
import { projects } from "@/data/projects";
import { groupTechnologies } from "@/data/skills";
import { assertUniqueProjectSlugs } from "@/lib/content-validation";

assertUniqueProjectSlugs(projects);

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getPublicCaseStudies(): Project[] {
  return projects.filter((project) => project.kind === "public-case-study");
}

export function getEngineeringPracticeProjects(): Project[] {
  return projects.filter((project) => project.kind === "engineering-practice");
}

export function getEducationalResearchProjects(): Project[] {
  return projects.filter((project) => project.kind === "educational-research");
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category);
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return projects.filter((project) => project.status === status);
}

export function getProjectsByKind(kind: Project["kind"]): Project[] {
  return projects.filter((project) => project.kind === kind);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): ProjectSlug[] {
  return projects.map((project) => project.slug);
}

export function getAdjacentProjects(slug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? (projects[index - 1] ?? null) : null,
    next: index < projects.length - 1 ? (projects[index + 1] ?? null) : null,
  };
}

export function getProjectTechnologyGroups(project: Project) {
  return groupTechnologies(project.technologyStack);
}

export function getCollaborationLabel(
  collaboration: CollaborationAttribution,
): string {
  switch (collaboration.type) {
    case "team":
      return "Team project";
    case "pending-verification":
      return "Collaboration pending verification";
    case "individual-practice":
      return "Individual practice";
    case "educational-research":
      return "Educational research";
    case "professional":
      return "Professional work";
    case "solo":
      return "Individual project";
  }
}

export function isTeamAttributed(
  collaboration: CollaborationAttribution,
): boolean {
  return collaboration.type === "team";
}

export function isPendingCollaboration(
  collaboration: CollaborationAttribution,
): boolean {
  return collaboration.type === "pending-verification";
}
