import type { EducationOrResearchItem } from "@/data/content-types";

export const portfolio = {
  name: "Keren Schoss",
  title: "Frontend & Full-Stack Developer",
  location: "Tel Aviv, Israel",
  heroStatement:
    "I build polished digital products through frontend engineering, full-stack systems, AI integration, and a strong visual eye.",
  supportingStatement:
    "Production Angular work, full-stack products, and AI integrations—shaped by a photographer’s sense of composition.",
  about: {
    summary:
      "I care about maintainable architecture, usable interfaces, and precise implementation.",
    paragraphs: [
      "I develop production features in a large Angular/Nx platform, integrating frontend behavior with backend APIs and debugging complex reactive flows. Across team and personal work I build full-stack systems with React, Node.js, Python, and OpenAI integrations—always separating verified behavior from portfolio simulations.",
      "From 2014 to 2020 I worked as a professional fashion photographer. That craft still guides composition, hierarchy, spacing, and pixel-precise collaboration with design.",
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
