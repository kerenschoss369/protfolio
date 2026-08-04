import type { SkillGroup, TechnologyGroupId } from "@/data/content-types";

export type {
  Skill,
  SkillGroup,
  TechnologyGroupId,
} from "@/data/content-types";

/**
 * Skills vocabulary from verified content decisions.
 * No percentages or expertise self-ratings.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "production-frontend",
    label: "Production frontend",
    skills: [
      "Angular",
      "TypeScript",
      "JavaScript",
      "HTML",
      "SCSS",
      "RxJS",
      "Responsive Design",
      "Component-Based Architecture",
      "Cross-Device UI Development",
      "Pixel-Precise Implementation",
      "REST API Integration",
      "Nx Monorepo",
      "Reactive Forms",
      "Debugging",
    ],
  },
  {
    id: "backend-fullstack",
    label: "Backend and full-stack",
    skills: [
      "React",
      "Node.js",
      "Express",
      "Python",
      "FastAPI",
      "MongoDB",
      "SQLite",
      "Zod",
      "Pydantic",
      "Client-Server Communication",
    ],
  },
  {
    id: "ai-engineering",
    label: "AI engineering",
    skills: [
      "OpenAI API Integration",
      "Structured AI Output",
      "Function Calling",
      "Prompt Construction",
      "AI Output Validation",
      "Human-Review Workflows",
      "Evidence Validation",
      "Prompt-Injection Awareness",
      "AI-Assisted Debugging",
      "AI-Assisted Refactoring",
      "Cursor",
    ],
  },
  {
    id: "additional",
    label: "Additional languages and systems",
    skills: [
      "Go",
      "C#",
      "C++",
      "C",
      "Linux",
      "Git",
      "WebSockets",
      "Unity",
      "ShaderLab",
      "HLSL",
    ],
  },
  {
    id: "workflow",
    label: "Workflow",
    skills: [
      "Bitbucket",
      "Jira",
      "Confluence",
      "Code Reviews",
      "Merge Conflict Resolution",
      "Agile Collaboration",
      "Production Debugging",
      "Cross-Functional Collaboration",
    ],
  },
];

const skillToGroup = new Map<string, TechnologyGroupId>();

for (const group of skillGroups) {
  for (const skill of group.skills) {
    skillToGroup.set(skill.toLowerCase(), group.id);
  }
}

/** Extra aliases so project stack labels can resolve into skill groups. */
const technologyAliases: Record<string, TechnologyGroupId> = {
  vite: "production-frontend",
  vitest: "production-frontend",
  "testing library": "production-frontend",
  express: "backend-fullstack",
  "better-sqlite3": "backend-fullstack",
  sqlite: "backend-fullstack",
  "openai sdk": "ai-engineering",
  "openai realtime api": "ai-engineering",
  "function calling": "ai-engineering",
  "json event handling": "additional",
  "environment variables": "additional",
  goroutines: "additional",
  channels: "additional",
  ssh: "additional",
  shell: "additional",
  "text processing": "additional",
  "scientific data analysis": "additional",
  "aws ec2": "backend-fullstack",
  "aws s3": "backend-fullstack",
  "nx monorepo": "production-frontend",
  "rest apis": "production-frontend",
};

export function getTechnologyGroupId(name: string): TechnologyGroupId {
  const key = name.toLowerCase();
  return technologyAliases[key] ?? skillToGroup.get(key) ?? "project-specific";
}

export function groupTechnologies(names: readonly string[]) {
  const groups = new Map<TechnologyGroupId, string[]>();

  for (const name of names) {
    const groupId = getTechnologyGroupId(name);
    const existing = groups.get(groupId) ?? [];
    existing.push(name);
    groups.set(groupId, existing);
  }

  return skillGroups
    .map((group) => ({
      id: group.id,
      label: group.label,
      technologies: groups.get(group.id) ?? [],
    }))
    .concat({
      id: "project-specific" as const,
      label: "Project-specific",
      technologies: groups.get("project-specific") ?? [],
    })
    .filter((group) => group.technologies.length > 0);
}
