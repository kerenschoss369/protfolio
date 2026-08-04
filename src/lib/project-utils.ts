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

/**
 * Work-index filter ids. Derived from project category, kind, and stack —
 * not a duplicate hard-coded project list.
 */
export type WorkFilterId =
  | "all"
  | "frontend"
  | "full-stack"
  | "ai"
  | "systems"
  | "game-development"
  | "research-and-practice";

export type WorkFilterOption = {
  id: WorkFilterId;
  label: string;
};

export const WORK_FILTERS: readonly WorkFilterOption[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "full-stack", label: "Full-Stack" },
  { id: "ai", label: "AI" },
  { id: "systems", label: "Systems" },
  { id: "game-development", label: "Game Development" },
  { id: "research-and-practice", label: "Research and Practice" },
] as const;

const FRONTEND_TECH = new Set([
  "React",
  "TypeScript",
  "Vite",
  "Angular",
  "SCSS",
  "HTML",
  "RxJS",
]);

const AI_TECH = new Set([
  "OpenAI SDK",
  "OpenAI realtime API",
  "Function calling",
  "Pydantic",
  "FastAPI",
]);

const SYSTEMS_TECH = new Set([
  "Go",
  "WebSockets",
  "Goroutines",
  "Channels",
  "Linux",
  "SSH",
  "Shell",
  "SQLite",
  "Node.js",
  "Express",
]);

function matchesCategoryKeywords(
  category: ProjectCategory,
  keywords: readonly string[],
): boolean {
  const normalized = category.toLowerCase();
  return keywords.some((keyword) => normalized.includes(keyword));
}

/**
 * Derive filter membership from typed project fields.
 * Projects may appear under multiple filters.
 */
export function getProjectFilterIds(project: Project): WorkFilterId[] {
  const ids = new Set<WorkFilterId>();
  const stack = new Set(project.technologyStack);

  if (
    matchesCategoryKeywords(project.category, ["full-stack"]) ||
    (stack.has("React") &&
      (stack.has("FastAPI") || stack.has("Node.js") || stack.has("MongoDB")))
  ) {
    ids.add("full-stack");
  }

  if (
    matchesCategoryKeywords(project.category, ["ai"]) ||
    [...AI_TECH].some((tech) => stack.has(tech))
  ) {
    ids.add("ai");
  }

  if (
    matchesCategoryKeywords(project.category, ["game"]) ||
    stack.has("Unity")
  ) {
    ids.add("game-development");
  }

  if (
    project.kind === "engineering-practice" ||
    project.kind === "educational-research" ||
    matchesCategoryKeywords(project.category, [
      "research",
      "scientific",
      "security practice",
    ])
  ) {
    ids.add("research-and-practice");
  }

  if (
    matchesCategoryKeywords(project.category, ["cli", "linux", "go /"]) ||
    [...SYSTEMS_TECH].some((tech) => stack.has(tech))
  ) {
    ids.add("systems");
  }

  if (
    matchesCategoryKeywords(project.category, ["web application"]) ||
    [...FRONTEND_TECH].some((tech) => stack.has(tech))
  ) {
    ids.add("frontend");
  }

  return [...ids];
}

export function projectMatchesFilter(
  project: Project,
  filterId: WorkFilterId,
): boolean {
  if (filterId === "all") {
    return true;
  }

  return getProjectFilterIds(project).includes(filterId);
}

export function filterProjects(
  source: readonly Project[],
  filterId: WorkFilterId,
): Project[] {
  return source.filter((project) => projectMatchesFilter(project, filterId));
}

export function isWorkFilterId(value: string): value is WorkFilterId {
  return WORK_FILTERS.some((filter) => filter.id === value);
}

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
