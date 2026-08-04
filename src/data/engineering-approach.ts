import type { EngineeringPrinciple } from "@/data/content-types";

export type { EngineeringPrinciple } from "@/data/content-types";

export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    id: "understand-the-flow",
    title: "Understand the flow",
    summary:
      "Map user journeys, states, contracts, and failure paths before polishing the interface.",
  },
  {
    id: "design-for-real-states",
    title: "Design for real states",
    summary:
      "Build loading, empty, error, validation, success, and recovery behavior as part of the product—not afterthoughts.",
  },
  {
    id: "treat-boundaries-seriously",
    title: "Treat boundaries seriously",
    summary:
      "Validate data between client, application API, backend services, and AI systems.",
  },
  {
    id: "refine-the-experience",
    title: "Refine the experience",
    summary:
      "Improve responsiveness, accessibility, hierarchy, feedback, and maintainability with intent.",
  },
];
