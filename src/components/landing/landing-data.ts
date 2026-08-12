export type LandingProject = {
  number: string;
  slug: string;
  title: string;
  category: string;
  statement: string;
  description: string;
  built: string[];
  highlights: string[];
  technologies: string[];
  href: string;
  teamNote?: string;
  safetyNote?: string;
};

export const landingProjects: LandingProject[] = [
  {
    number: "01",
    slug: "clinical-follow-up-detector",
    title: "Clinical Follow-Up Detector",
    category: "AI / Full-Stack",
    statement:
      "Turning clinical follow-up instructions into structured, reviewable actions.",
    description:
      "A full-stack portfolio application built around fictional clinical notes. It extracts explicit treatment or follow-up actions into structured tasks designed for human review — keeping AI extraction separate from decision-making.",
    built: [
      "Fictional-note analysis into structured actions",
      "Human review states: confirmed, edited, rejected, completed",
      "Evidence linked back to source phrases",
      "Node orchestration with a Python AI service",
    ],
    highlights: [
      "Action title, type, deadline, priority, evidence, review state",
      "Ambiguity stays marked for review — never silently inferred",
      "SQLite persistence behind the application API",
      "Pydantic + Zod validation at service boundaries",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "FastAPI",
      "Python",
      "SQLite",
      "OpenAI API",
      "Pydantic",
      "Zod",
    ],
    href: "/work/clinical-follow-up-detector",
    safetyNote:
      "Fictional medical data only. Not clinically validated. Human review is required.",
  },
  {
    number: "02",
    slug: "realtime-gpt-cli",
    title: "Realtime GPT-4o-mini CLI",
    category: "Go / Realtime AI",
    statement:
      "A realtime Go CLI built around event-driven communication with GPT-4o-mini.",
    description:
      "Explores realtime AI through a terminal application written in Go. WebSocket JSON events are processed while network handling and application behavior stay separated through goroutines and channels.",
    built: [
      "WebSocket realtime session handling",
      "Concurrent reader and main goroutines",
      "Local function calling — multiply(a, b)",
      "Offline portfolio simulation of the event loop",
    ],
    highlights: [
      "Realtime events without browser API keys",
      "Channels as the concurrency boundary",
      "Clear separation of transport and orchestration",
    ],
    technologies: [
      "Go",
      "WebSockets",
      "Goroutines",
      "Channels",
      "JSON",
      "OpenAI API",
      "Realtime AI",
    ],
    href: "/work/realtime-gpt-cli",
  },
  {
    number: "03",
    slug: "academease",
    title: "AcademEase",
    category: "Frontend / Web Application",
    statement: "One platform for course resources and smarter semester planning.",
    description:
      "A team-built academic management system for browsing course materials and building personalized semester schedules — including multilingual and RTL interfaces.",
    built: [
      "Personalized Drive for exams, summaries, and Q&A",
      "Schedule builder with save and compare flows",
      "College-email auth, profiles, and persistent login",
      "English, French, Hebrew, and RTL support",
    ],
    highlights: [
      "Led frontend development and major interface flows",
      "Auth behavior and frontend–backend integration",
      "Contributed to backend and deployment",
      "Multilingual and RTL implementation",
    ],
    technologies: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "MongoDB",
      "REST API",
      "AWS EC2",
      "AWS S3",
    ],
    href: "/work/academease",
    teamNote: "Team project — frontend lead with shared backend and deployment work.",
  },
  {
    number: "04",
    slug: "taptap-avengers",
    title: "TapTap Avengers",
    category: "Game Development / Unity",
    statement:
      "Recreating rhythm-game mechanics through timing, animation, audio synchronization, and gameplay systems.",
    description:
      "A team-built mobile rhythm-game recreation exploring music timing, player input, visual feedback, scoring, and custom 2D animation.",
    built: [
      "Rhythm mechanics and beat mapping",
      "Input timing and scoring",
      "Audio synchronization and song selection",
      "Custom 2D animation, shaders, and multiplayer",
    ],
    highlights: [
      "Silent portfolio simulation — no autoplay audio",
      "Pointer and keyboard interaction",
      "Perfect / Good / Miss feedback",
    ],
    technologies: [
      "Unity",
      "C#",
      "ShaderLab",
      "HLSL",
      "Game Development",
      "2D Animation",
    ],
    href: "/work/taptap-avengers",
    teamNote: "Team project — shared authorship across systems and presentation.",
  },
];

export const landingExperience = [
  {
    id: "abra",
    role: "Frontend Developer",
    org: "Abra — EL AL Airlines Web Application",
    dates: "2025 — 2026",
    statement:
      "Building and maintaining production experiences across EL AL's large-scale web platform.",
    areas: [
      "Production features in a large Angular / Nx platform",
      "Responsive booking and passenger flows",
      "Reactive state and careful API integration",
    ],
    technologies: ["Angular", "TypeScript", "RxJS", "SCSS", "Nx", "REST APIs"],
  },
  {
    id: "idf",
    role: "SOC Team Leader & IT",
    org: "IDF Manpower Directorate",
    dates: "2018 — 2020",
    statement:
      "From network administration to leading the directorate's first SOC team.",
    areas: ["SOC", "Cybersecurity", "Networking", "IT", "Leadership"],
    technologies: ["SOC", "Cybersecurity", "Networking", "IT", "Leadership"],
  },
] as const;
