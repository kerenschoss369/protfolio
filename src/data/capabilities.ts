/**
 * Homepage capability groups — short titles, one phrase, representative techs.
 * Full skill vocabulary remains in skills.ts for case-study grouping.
 */

export type CapabilityGroup = {
  id: string;
  title: string;
  phrase: string;
  technologies: readonly string[];
};

export const capabilityGroups: readonly CapabilityGroup[] = [
  {
    id: "frontend-systems",
    title: "Frontend systems",
    phrase: "Production interfaces in complex Angular and Nx platforms.",
    technologies: ["Angular", "TypeScript", "RxJS", "Nx"],
  },
  {
    id: "fullstack-products",
    title: "Full-stack products",
    phrase: "End-to-end applications across client, API, and data layers.",
    technologies: ["React", "Node.js", "FastAPI", "MongoDB"],
  },
  {
    id: "ai-integration",
    title: "AI integration",
    phrase: "Structured model output with validation and human review.",
    technologies: ["OpenAI", "Zod", "Pydantic", "WebSockets"],
  },
  {
    id: "visual-implementation",
    title: "Visual implementation",
    phrase: "Editorial hierarchy, responsive layout, and pixel-precise UI.",
    technologies: ["SCSS", "CSS Grid", "Responsive Design"],
  },
  {
    id: "engineering-workflow",
    title: "Engineering workflow",
    phrase: "Reviews, debugging, and cross-functional delivery.",
    technologies: ["Git", "Bitbucket", "Jira", "Code reviews"],
  },
] as const;
