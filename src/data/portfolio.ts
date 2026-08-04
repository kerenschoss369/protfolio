import type { EducationOrResearchItem } from "@/data/content-types";

export const portfolio = {
  name: "Keren Schoss",
  title: "Frontend & Full-Stack Developer",
  location: "Tel Aviv, Israel",
  heroStatement:
    "I build precise, scalable digital products—combining production frontend experience, full-stack engineering, AI integration, and a photographer’s eye for composition.",
  supportingStatement:
    "I develop production features in a large Angular/Nx web platform, build full-stack products with React, Node.js, Python, and AI integrations, and bring visual precision from professional fashion photography.",
  about: {
    summary:
      "Frontend and Full-Stack Developer focused on maintainable architecture, usable interfaces, and precise implementation.",
    paragraphs: [
      "I work on production Angular and TypeScript interfaces in a large Nx monorepo, integrating frontend behavior with backend APIs and debugging complex reactive flows.",
      "Across personal and team projects I have built full-stack systems with React, Node.js, Python, FastAPI, MongoDB, SQLite, Go, and OpenAI integrations—always distinguishing verified behavior from portfolio simulations.",
      "From 2014 to 2020 I worked as a professional fashion photographer. That background shapes how I think about composition, hierarchy, spacing, color relationships, visual rhythm, and pixel-precise collaboration with design.",
    ],
    photographyConnections: [
      "Composition",
      "Hierarchy",
      "Spacing",
      "Color relationships",
      "Visual rhythm",
      "Retouching precision",
      "Art direction",
      "Responsive layout",
      "Pixel-precise implementation",
      "Designer collaboration",
    ],
    traits: [
      "Visually precise",
      "Product-minded",
      "Curious and independently motivated",
      "Focused on maintainability and user experience",
    ],
  },
} as const;

export type Portfolio = typeof portfolio;

export const educationAndResearch: EducationOrResearchItem[] = [
  {
    id: "cs-academic-college-tlv",
    kind: "education",
    title: "B.Sc. in Computer Science",
    organization: "Academic College of Tel Aviv–Yaffo",
    dates: "Graduated Oct 2024",
    summary:
      "B.Sc. in Computer Science at the Academic College of Tel Aviv–Yaffo.",
  },
  {
    id: "alpha-research-tau",
    kind: "research-program",
    title: "Alpha Research Program in the Sciences",
    organization: "Tel Aviv University",
    dates: "2015–2018",
    summary:
      "Educational research context for the ATLAS two-photon invariant-mass analysis project.",
  },
  {
    id: "fashion-photography",
    kind: "professional-background",
    title: "Professional fashion photography",
    organization: "Independent practice",
    dates: "2014–2020",
    summary:
      "Professional fashion photography informing composition, hierarchy, spacing, and visual precision in interface work.",
  },
];
