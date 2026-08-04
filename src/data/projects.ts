import type {
  ArchitectureDiagram,
  ClinicalFollowUpDetectorProject,
  ClinicalSafetyGuarantees,
  EducationalResearchProject,
  EngineeringPracticeProject,
  InteractiveDemoDefinition,
  Project,
  PublicCaseStudyProject,
} from "@/data/content-types";

export type {
  ArchitectureDiagram,
  ArchitectureEdge,
  ArchitectureNode,
  Challenge,
  ClinicalFollowUpDetectorProject,
  ClinicalSafetyGuarantees,
  CollaborationAttribution,
  ConfidentialityNotice,
  ConfigurableUrl,
  EducationOrResearchItem,
  EngineeringDecision,
  EngineeringPracticeProject,
  EngineeringPrinciple,
  ExternalLinkAction,
  InteractiveDemoDefinition,
  KnownLimitation,
  MissingContentItem,
  PersonalContribution,
  ProfessionalWork,
  Project,
  ProjectCategory,
  ProjectContribution,
  ProjectDates,
  ProjectHighlight,
  ProjectMedia,
  ProjectSlug,
  ProjectStatus,
  PublicCaseStudyProject,
  SafetyNotice,
  Skill,
  SkillGroup,
  TeamContribution,
  Technology,
  TechnologyGroupId,
} from "@/data/content-types";

export const CLINICAL_SAFETY_NOTICES = [
  {
    id: "demonstration-only",
    statement: "Demonstration system only",
  },
  {
    id: "not-clinically-validated",
    statement: "Not clinically validated",
  },
  {
    id: "not-for-medical-decisions",
    statement: "Not for medical decision-making",
  },
  {
    id: "not-for-real-patient-data",
    statement: "Not for real patient data",
  },
  {
    id: "not-hipaa-compliant",
    statement: "Not HIPAA compliant",
  },
  {
    id: "human-review-mandatory",
    statement: "Human review is mandatory for all extracted actions",
  },
  {
    id: "ai-never-auto-confirmed",
    statement: "AI output is never automatically confirmed",
  },
] as const;

export const CLINICAL_SAVED_NOTE_LIMITATION =
  "Saved notes can be restored from the URL or manual note-ID entry, but the app does not automatically remember the most recently opened note when no noteId exists.";

export const CLINICAL_SAFETY_NOTE = [
  "Demonstration system only.",
  "Not clinically validated.",
  "Not for medical decision-making.",
  "Not for real patient data.",
  "Not HIPAA compliant.",
  "All extracted actions require human review.",
  "AI output is never automatically confirmed.",
].join(" ");

export const clinicalSafetyGuarantees: ClinicalSafetyGuarantees = {
  demonstrationSystemOnly: true,
  clinicallyValidated: false,
  forMedicalDecisionMaking: false,
  forRealPatientData: false,
  hipaaCompliant: false,
  humanReviewMandatory: true,
  aiOutputNeverAutomaticallyConfirmed: true,
  knownSavedNoteLimitation: CLINICAL_SAVED_NOTE_LIMITATION,
  portfolioDemonstration: {
    staticOnly: true,
    acceptsArbitraryMedicalInput: false,
    sendsOpenAIRequests: false,
    label: "Static portfolio demonstration only",
  },
  notices: CLINICAL_SAFETY_NOTICES,
};

const clinicalArchitecture: ArchitectureDiagram = {
  id: "clinical-follow-up-architecture",
  title: "Clinical Follow-Up Detector architecture",
  nodes: [
    {
      id: "react",
      label: "React",
      responsibility:
        "Note input, upload validation, action review UI, and reload flows. Talks only to the Node API.",
    },
    {
      id: "node-api",
      label: "Node API",
      responsibility:
        "Application boundary: validation, IDs, workflow rules, errors, Zod checks, and SQLite persistence.",
    },
    {
      id: "python-ai",
      label: "Python AI service",
      responsibility:
        "Isolated AI service for prompts, model communication, structured parsing, and Pydantic validation.",
    },
    {
      id: "openai",
      label: "OpenAI",
      responsibility:
        "LLM extraction component only. Output is treated as untrusted input.",
    },
    {
      id: "sqlite",
      label: "SQLite",
      responsibility:
        "Atomic persistence of notes and actions owned by the Node API.",
    },
  ],
  edges: [
    { id: "react-node", from: "react", to: "node-api", label: "HTTP API" },
    {
      id: "node-python",
      from: "node-api",
      to: "python-ai",
      label: "AI service call",
    },
    {
      id: "python-openai",
      from: "python-ai",
      to: "openai",
      label: "Model request",
    },
    {
      id: "node-sqlite",
      from: "node-api",
      to: "sqlite",
      label: "Atomic write",
    },
  ],
};

const clinicalInteractiveDemo: Extract<
  InteractiveDemoDefinition,
  { kind: "clinical-static-extraction" }
> = {
  kind: "clinical-static-extraction",
  id: "clinical-extraction",
  label: "Static portfolio demonstration",
  acceptsArbitraryMedicalInput: false,
  sendsOpenAIRequests: false,
  staticOnly: true,
  fictionalNote:
    "Repeat CBC in seven days and schedule an oncology follow-up next month.",
  views: ["source-note", "extracted-actions", "architecture"],
};

const clinicalFollowUpDetector: ClinicalFollowUpDetectorProject = {
  kind: "public-case-study",
  status: "case-study",
  slug: "clinical-follow-up-detector",
  title: "Clinical Follow-Up Detector",
  dates: {
    kind: "unspecified",
    display: null,
    verification: "pending-verification",
  },
  category: "Full-Stack AI Application",
  featured: true,
  shortDescription:
    "A demonstration application that analyzes fictional clinical text notes and extracts explicit treatment and follow-up instructions into structured, reviewable actions.",
  problem:
    "Clinical notes may bury explicit follow-up instructions inside unstructured prose, making treatment and follow-up tasks easy to miss during review.",
  solution:
    "The application surfaces those instructions as structured actions that a human can review, edit, confirm, reject, or mark complete—without treating model output as trusted truth.",
  contribution: {
    personal: {
      kind: "personal",
      summary:
        "Built a full-stack demonstration spanning React, Node, Python AI extraction, validation, and review workflows.",
      items: [
        "Implemented note input, .txt upload validation, analyze flow, and review UI states",
        "Designed Node as the application boundary for validation, workflow, and SQLite persistence",
        "Isolated AI concerns in a Python FastAPI service with structured output validation",
        "Treated LLM output as untrusted input with Zod validation and evidence checks",
      ],
    },
  },
  architectureHighlights: [
    "React communicates only with the Node API",
    "Browser never directly calls Python or OpenAI",
    "Node owns validation, IDs, workflow rules, errors, and SQLite persistence",
    "Python is an isolated AI service for prompts, model communication, and structured parsing",
    "LLM output is treated as untrusted input and validated before persistence",
    "Analyze writes note and actions atomically; invalid AI output creates no partial record",
    "New actions begin pending; only confirmed actions can be completed; rejected actions cannot be completed",
  ],
  architecture: clinicalArchitecture,
  technologyStack: [
    "React",
    "TypeScript",
    "Vite",
    "Vitest",
    "Testing Library",
    "Node.js",
    "Express",
    "Zod",
    "better-sqlite3",
    "SQLite",
    "Python",
    "FastAPI",
    "Pydantic",
    "OpenAI SDK",
  ],
  highlights: [
    {
      title: "Structured review workflow",
      detail:
        "Extracted actions support evidence display, needs-review state, confirm, reject, edit, and complete.",
    },
    {
      title: "Trusted application boundary",
      detail:
        "Provider credentials stay server-side. Prompts and credentials are not exposed to the browser.",
    },
    {
      title: "Deterministic review rules",
      detail:
        "Validation, workflow, persistence, and review rules remain deterministic even when the LLM is mocked in tests.",
    },
  ],
  engineeringDecisions: [
    {
      title: "Separate AI service from application API",
      detail:
        "Python owns prompts and model communication; Node owns product workflow and persistence.",
    },
    {
      title: "Validate AI output at the boundary",
      detail:
        "Node validates AI-service responses with Zod; Python validates structured output with Pydantic.",
    },
    {
      title: "Verify evidence against source text",
      detail:
        "Evidence is checked against the submitted note, and uncertain output is flagged for human review.",
    },
    {
      title: "Atomic analyze persistence",
      detail:
        "Analyze writes note and actions together so invalid AI output cannot leave a partial record.",
    },
  ],
  challenges: [
    {
      title: "Untrusted model output",
      detail:
        "Prompt-injection text is treated as untrusted note content; the LLM remains only an extraction component.",
    },
    {
      title: "Human-review workflow integrity",
      detail:
        "Pending, confirmed, rejected, and completed states must remain enforceable regardless of model quality.",
    },
  ],
  limitations: [
    {
      id: "saved-note-memory",
      detail: CLINICAL_SAVED_NOTE_LIMITATION,
    },
    {
      id: "portfolio-demo-static",
      detail:
        "The portfolio simulation uses fictional static data only, does not accept arbitrary medical input, and never sends OpenAI requests.",
    },
  ],
  demonstrates: [
    "Full-stack TypeScript and Python service boundaries",
    "Structured AI output with validation and human review",
    "Evidence-aware extraction workflows",
    "SQLite-backed persistence with atomic writes",
    "Testable AI integration using mocked LLM responses",
  ],
  repositoryUrl: null,
  liveUrl: null,
  media: [
    {
      type: "interactive-demo",
      demo: clinicalInteractiveDemo,
      caption: "Static fictional extraction walkthrough",
    },
    {
      type: "architecture-diagram",
      diagram: clinicalArchitecture,
      caption:
        "React → Node API → Python AI service → OpenAI; Node API → SQLite",
    },
  ],
  collaboration: {
    type: "pending-verification",
    summary:
      "Collaboration attribution pending repository history verification. Do not claim solo authorship.",
  },
  clinicalSafety: clinicalSafetyGuarantees,
  safetyNote: CLINICAL_SAFETY_NOTE,
  confidentialityNote: null,
  interactiveDemo: clinicalInteractiveDemo,
};

const academEase: PublicCaseStudyProject & {
  slug: "academease";
} = {
  kind: "public-case-study",
  status: "case-study",
  slug: "academease",
  title: "AcademEase",
  dates: {
    kind: "range",
    display: "2023–2024",
    start: "2023",
    end: "2024",
    verification: "verified",
  },
  category: "Full-Stack Web Application",
  featured: true,
  shortDescription:
    "A student platform that centralizes academic course materials and helps students create and compare personalized semester schedules.",
  problem:
    "Course materials and semester planning lived in fragmented places, making it harder for students to browse content and compare schedule options.",
  solution:
    "AcademEase combines a personalized drive for course materials with a schedule builder that can save and compare semester plans across English, French, and Hebrew interfaces.",
  contribution: {
    personal: {
      kind: "personal",
      summary:
        "Led frontend development after independently learning React, and contributed to backend and deployment work.",
      items: [
        "Led frontend development after independently learning React",
        "Built significant interface and user-flow areas",
        "Contributed to backend development",
        "Contributed to deployment work",
      ],
    },
    team: {
      kind: "team",
      summary: "Team project — never describe as solo authorship.",
      items: [
        "Shared product delivery across frontend, backend, and deployment",
      ],
    },
  },
  architectureHighlights: [
    "React and TypeScript frontend for course browsing and schedule planning",
    "FastAPI backend with MongoDB persistence",
    "AWS EC2 application hosting and AWS S3 for file storage",
    "College-email authentication with registration, profile, and password reset",
    "Multilingual UI with English, French, Hebrew, and RTL support",
  ],
  technologyStack: [
    "React",
    "TypeScript",
    "FastAPI",
    "MongoDB",
    "AWS EC2",
    "AWS S3",
  ],
  highlights: [
    {
      title: "Personalized Drive",
      detail:
        "Browse past exams, summaries, and questions and answers with filtered course-content views.",
    },
    {
      title: "Schedule Builder",
      detail:
        "Plan future semesters with preferences, save schedule options, and compare saved schedules.",
    },
    {
      title: "Multilingual and RTL",
      detail:
        "English, French, and Hebrew interfaces with RTL support and responsive layouts.",
    },
  ],
  engineeringDecisions: [
    {
      title: "Separate content browsing from schedule planning",
      detail:
        "Drive and schedule flows share authentication while remaining distinct product areas.",
    },
    {
      title: "Design for multilingual and RTL use",
      detail:
        "Interface direction and copy support English, French, and Hebrew without treating LTR as the only layout.",
    },
  ],
  challenges: [
    {
      title: "Complex student workflows",
      detail:
        "Authentication, content filtering, schedule creation, and comparison all need coherent state across the product.",
    },
  ],
  limitations: [
    {
      id: "no-solo-claim",
      detail:
        "Team project; personal contribution is significant but not sole ownership.",
    },
    {
      id: "no-invented-metrics",
      detail:
        "No production user metrics, commercial deployment claims, or institution-wide adoption figures are asserted.",
    },
    {
      id: "portfolio-simulation",
      detail:
        "The portfolio schedule preview is a static semantic simulation labeled as a portfolio demonstration.",
    },
  ],
  demonstrates: [
    "Full-stack React and FastAPI product work",
    "Authenticated student workflows",
    "Multilingual and RTL interface adaptation",
    "Schedule comparison and content-filtering UX",
  ],
  repositoryUrl: null,
  liveUrl: null,
  media: [
    {
      type: "interactive-demo",
      demo: {
        kind: "schedule-rtl-preview",
        id: "academease-schedule",
        label: "Portfolio simulation",
        supportsRtlToggle: true,
        languages: ["en", "he"],
      },
      caption: "Static schedule and RTL preview",
    },
  ],
  collaboration: {
    type: "team",
    summary:
      "Team project. Frontend leadership does not imply sole authorship.",
  },
  safetyNote: null,
  confidentialityNote: null,
};

const realtimeGptCli: PublicCaseStudyProject & {
  slug: "realtime-gpt-cli";
} = {
  kind: "public-case-study",
  status: "case-study",
  slug: "realtime-gpt-cli",
  title: "Realtime GPT-4o-mini CLI",
  dates: {
    kind: "unspecified",
    display: null,
    verification: "pending-verification",
  },
  category: "Go / Realtime AI / CLI",
  featured: true,
  shortDescription:
    "A Go command-line application that connects to OpenAI’s realtime API over WebSocket, consumes streamed events, and supports local function calling.",
  problem:
    "Realtime model sessions require concurrent connection handling, streamed event decoding, and safe local execution of function calls without exposing credentials.",
  solution:
    "A Go CLI reads OPENAI_API_KEY from the environment, maintains a WebSocket session with reader and main goroutines, and executes a local multiply function before returning output to the model.",
  contribution: {
    personal: {
      kind: "personal",
      summary:
        "Implemented realtime WebSocket session handling, event channels, and local function calling in Go.",
      items: [
        "Connected to the realtime GPT-4o-mini WebSocket endpoint",
        "Decoded streamed JSON events through a reader goroutine and channel",
        "Implemented local multiply(a, b) function calling with buffered streamed arguments",
        "Sent conversation.item.create, response.create, and function-call output back to the model",
      ],
    },
  },
  architectureHighlights: [
    "API key loaded from OPENAI_API_KEY environment variable",
    "Reader goroutine continuously reads the WebSocket connection",
    "Incoming JSON events are decoded and sent through a channel",
    "Main goroutine sends requests and consumes events",
    "Local function calling executes multiply(a, b) outside the model",
    "Function-call output is returned to the model for a final response",
  ],
  technologyStack: [
    "Go",
    "WebSockets",
    "Goroutines",
    "Channels",
    "JSON event handling",
    "Environment variables",
    "OpenAI realtime API",
    "Function calling",
  ],
  highlights: [
    {
      title: "Concurrent event loop",
      detail:
        "Reader and main goroutines coordinate streamed events through a channel.",
    },
    {
      title: "Local function calling",
      detail:
        "Streamed function-call arguments are buffered, multiply runs locally, and output returns to the model.",
    },
  ],
  engineeringDecisions: [
    {
      title: "Keep credentials out of source",
      detail:
        "The CLI reads OPENAI_API_KEY from the environment and never embeds a key.",
    },
    {
      title: "Separate transport reading from request orchestration",
      detail:
        "A dedicated reader goroutine keeps event intake continuous while the main goroutine owns prompts and responses.",
    },
  ],
  challenges: [
    {
      title: "Streamed function-call arguments",
      detail:
        "Arguments arrive in fragments and must be buffered before local execution.",
    },
  ],
  limitations: [
    {
      id: "not-production-service",
      detail:
        "This is a CLI assignment-style implementation, not a production-deployed service.",
    },
    {
      id: "portfolio-simulation",
      detail:
        "The browser terminal simulation is deterministic and never contacts OpenAI.",
    },
  ],
  demonstrates: [
    "Go concurrency with goroutines and channels",
    "Realtime WebSocket event handling",
    "Local function calling against a streamed model session",
    "Environment-based credential handling",
  ],
  repositoryUrl: null,
  liveUrl: null,
  media: [
    {
      type: "interactive-demo",
      demo: {
        kind: "deterministic-terminal",
        id: "realtime-cli-terminal",
        label: "Deterministic browser terminal",
        sendsOpenAIRequests: false,
        commands: ["help", "hi", "6*7", "architecture", "clear", "exit"],
      },
      caption: "Deterministic terminal simulation — not a live model session",
    },
  ],
  collaboration: {
    type: "pending-verification",
    summary:
      "Likely an individual assignment (repository name: go-home-assignment), but ownership remains pending repository evidence.",
  },
  safetyNote: null,
  confidentialityNote: null,
};

const tapTapAvengers: PublicCaseStudyProject & {
  slug: "taptap-avengers";
} = {
  kind: "public-case-study",
  status: "case-study",
  slug: "taptap-avengers",
  title: "TapTap Avengers",
  dates: {
    kind: "range",
    display: "August–October 2024",
    start: "2024-08",
    end: "2024-10",
    verification: "verified",
  },
  category: "Unity Game Development",
  featured: true,
  shortDescription:
    "A team-built recreation inspired by Tap Tap rhythm gameplay.",
  problem:
    "Rhythm gameplay requires precise audio synchronization, beat mapping, scoring feedback, and coordinated multiplayer behavior inside Unity.",
  solution:
    "The team built rhythm mechanics, beat mapping, custom 2D animation, scoring, song selection, shader work, and multiplayer functionality in Unity with C#, ShaderLab, and HLSL.",
  contribution: {
    personal: {
      kind: "personal",
      summary:
        "Contributed within a team Unity project spanning gameplay, animation, and shader work.",
      items: [
        "Worked on rhythm-game mechanics and related gameplay systems",
        "Contributed to animation, scoring, and shader-related areas as part of the team",
      ],
    },
    team: {
      kind: "team",
      summary: "Team project — never claim sole authorship.",
      items: [
        "Shared delivery of mechanics, audio synchronization, multiplayer, and presentation systems",
      ],
    },
  },
  architectureHighlights: [
    "Unity project structure for rhythm gameplay systems",
    "Audio synchronization and beat mapping",
    "Custom 2D animation and scoring feedback",
    "Shader work with ShaderLab and HLSL",
    "Multiplayer functionality and song selection",
  ],
  technologyStack: ["Unity", "C#", "ShaderLab", "HLSL"],
  highlights: [
    {
      title: "Rhythm systems",
      detail:
        "Beat mapping, audio synchronization, scoring, and song selection.",
    },
    {
      title: "Presentation layer",
      detail: "Custom 2D animation with ShaderLab and HLSL work.",
    },
  ],
  engineeringDecisions: [
    {
      title: "Keep the portfolio interaction lightweight",
      detail:
        "The public simulation is a silent timing exercise rather than a reproduction of copyrighted music or Marvel-owned assets.",
    },
  ],
  challenges: [
    {
      title: "Timing precision",
      detail:
        "Audio synchronization and beat mapping need consistent feedback across Perfect, Good, and Miss states.",
    },
  ],
  limitations: [
    {
      id: "team-authorship",
      detail: "Team project; do not imply sole authorship.",
    },
    {
      id: "no-copyrighted-assets",
      detail:
        "Portfolio simulation uses no copyrighted music, Marvel-owned character artwork, or unlicensed game assets.",
    },
  ],
  demonstrates: [
    "Unity gameplay systems",
    "Audio-synced interaction design",
    "Shader and animation experimentation",
    "Team game-development collaboration",
  ],
  repositoryUrl: null,
  liveUrl: null,
  media: [
    {
      type: "interactive-demo",
      demo: {
        kind: "silent-rhythm",
        id: "taptap-rhythm",
        label: "Silent rhythm interaction",
        audio: false,
        autoplay: false,
        timingFeedback: ["Perfect", "Good", "Miss"],
      },
      caption: "Lightweight silent timing demo",
    },
  ],
  collaboration: {
    type: "team",
    summary: "Team-built Unity project. Do not claim sole authorship.",
  },
  safetyNote: null,
  confidentialityNote: null,
};

const overTheWireBandit: EngineeringPracticeProject = {
  kind: "engineering-practice",
  status: "engineering-practice",
  slug: "overthewire-bandit",
  title: "OverTheWire Bandit",
  dates: {
    kind: "unspecified",
    display: null,
    verification: "pending-verification",
  },
  category: "Linux and Security Practice",
  featured: false,
  shortDescription:
    "Completed all 33 levels of the OverTheWire Bandit wargame.",
  problem:
    "Practical Linux and security fundamentals are best learned through progressive system-exploration challenges rather than abstract checklists.",
  solution:
    "Completed every Bandit level to practice SSH, permissions, shell commands, text processing, scripting logic, and security fundamentals.",
  contribution: {
    personal: {
      kind: "personal",
      summary: "Individual engineering practice across all 33 Bandit levels.",
      items: [
        "Completed all 33 OverTheWire Bandit levels",
        "Practiced Linux command-line and security fundamentals",
      ],
    },
  },
  architectureHighlights: [
    "Progressive wargame levels focused on Linux and security fundamentals",
  ],
  technologyStack: ["Linux", "SSH", "Shell", "Text processing"],
  highlights: [
    {
      title: "Full level completion",
      detail: "Completed all 33 OverTheWire Bandit levels.",
    },
  ],
  engineeringDecisions: [
    {
      title: "Present as practice, not a product case study",
      detail:
        "This item supports engineering depth without implying a shipped product or published challenge solutions.",
    },
  ],
  challenges: [
    {
      title: "Incremental system exploration",
      detail:
        "Each level requires careful inspection of permissions, files, and shell behavior under constrained access.",
    },
  ],
  limitations: [
    {
      id: "no-flags-published",
      detail:
        "Passwords, flags, and exact challenge solutions are never published.",
    },
  ],
  demonstrates: [
    "Linux command-line fluency",
    "SSH and permissions reasoning",
    "Text processing and basic scripting logic",
    "Security fundamentals and problem solving",
  ],
  repositoryUrl: null,
  liveUrl: null,
  media: [],
  collaboration: {
    type: "individual-practice",
    summary: "Individual engineering practice.",
  },
  safetyNote: null,
  confidentialityNote: null,
};

const atlasResearch: EducationalResearchProject = {
  kind: "educational-research",
  status: "educational-research",
  slug: "atlas-research",
  title: "ATLAS Research Project",
  dates: {
    kind: "unspecified",
    display: null,
    verification: "pending-verification",
  },
  category: "Scientific Computing and Research",
  featured: false,
  program: "Alpha Research Program in the Sciences at Tel Aviv University",
  shortDescription:
    "ATLAS two-photon invariant-mass analysis related to evidence for the Higgs boson, within the Alpha Research Program in the Sciences at Tel Aviv University.",
  problem:
    "Large scientific datasets require careful methodology to study invariant-mass distributions related to Higgs evidence without overstating personal discovery credit.",
  solution:
    "Conducted ATLAS two-photon invariant-mass analysis as educational research using C++ and scientific data-analysis methods.",
  contribution: {
    personal: {
      kind: "personal",
      summary:
        "Educational research contribution within a university program — not discovery authorship.",
      items: [
        "Worked on ATLAS two-photon invariant-mass analysis",
        "Applied C++ and scientific data-analysis methods to large datasets",
      ],
    },
  },
  architectureHighlights: [
    "Scientific computing workflow for invariant-mass analysis",
    "Research methodology applied to large datasets",
  ],
  technologyStack: ["C++", "Scientific data analysis"],
  highlights: [
    {
      title: "Research context",
      detail:
        "Alpha Research Program in the Sciences at Tel Aviv University, focused on ATLAS two-photon invariant-mass analysis.",
    },
  ],
  engineeringDecisions: [
    {
      title: "Restrained presentation",
      detail:
        "Portfolio visuals stay data-visualization-inspired and avoid fabricated scientific results or discovery claims.",
    },
  ],
  challenges: [
    {
      title: "Analytical rigor",
      detail:
        "Large-dataset analysis requires careful methodology and precise interpretation of physics context.",
    },
  ],
  limitations: [
    {
      id: "no-discovery-credit",
      detail:
        "Does not imply discovery credit, CERN employment, publication authorship, ownership of ATLAS data, or a new scientific result.",
    },
  ],
  demonstrates: [
    "C++ scientific computing",
    "Research methodology",
    "Analytical problem solving with large datasets",
  ],
  repositoryUrl: null,
  liveUrl: null,
  media: [],
  collaboration: {
    type: "educational-research",
    program: "Alpha Research Program in the Sciences at Tel Aviv University",
    summary:
      "Individual educational research within a university program. Not discovery authorship.",
  },
  safetyNote: null,
  confidentialityNote: null,
};

/**
 * Verified portfolio projects. Professional Abra / EL AL work lives in experience data.
 */
export const projects: Project[] = [
  clinicalFollowUpDetector,
  academEase,
  realtimeGptCli,
  tapTapAvengers,
  overTheWireBandit,
  atlasResearch,
];
