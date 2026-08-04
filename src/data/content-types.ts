/**
 * Strongly typed portfolio content models.
 * Prefer discriminated unions over optional-everything bags.
 */

export type ProjectSlug =
  | "clinical-follow-up-detector"
  | "academease"
  | "realtime-gpt-cli"
  | "taptap-avengers"
  | "overthewire-bandit"
  | "atlas-research";

export type ProjectCategory =
  | "Full-Stack AI Application"
  | "Full-Stack Web Application"
  | "Go / Realtime AI / CLI"
  | "Unity Game Development"
  | "Linux and Security Practice"
  | "Scientific Computing and Research";

export type ProjectStatus =
  "case-study" | "engineering-practice" | "educational-research";

export type TechnologyGroupId =
  | "production-frontend"
  | "backend-fullstack"
  | "ai-engineering"
  | "additional"
  | "workflow"
  | "project-specific";

export type Technology = {
  name: string;
  groupId: TechnologyGroupId;
};

export type ProjectDates =
  | {
      kind: "range";
      display: string;
      start: string;
      end: string;
      verification: "verified" | "pending-verification";
    }
  | {
      kind: "unspecified";
      display: null;
      verification: "pending-verification";
    };

/**
 * Collaboration attribution. Do not use `solo` without repository evidence.
 */
export type CollaborationAttribution =
  | {
      type: "pending-verification";
      summary: string;
    }
  | {
      type: "team";
      summary: string;
    }
  | {
      type: "individual-practice";
      summary: string;
    }
  | {
      type: "educational-research";
      program: string;
      summary: string;
    }
  | {
      type: "professional";
      summary: string;
    }
  | {
      type: "solo";
      summary: string;
    };

export type PersonalContribution = {
  kind: "personal";
  summary: string;
  items: readonly string[];
};

export type TeamContribution = {
  kind: "team";
  summary: string;
  items: readonly string[];
};

export type ProjectContribution = {
  personal: PersonalContribution;
  team?: TeamContribution;
};

export type ProjectHighlight = {
  title: string;
  detail: string;
};

export type EngineeringDecision = {
  title: string;
  detail: string;
};

export type Challenge = {
  title: string;
  detail: string;
};

export type KnownLimitation = {
  id: string;
  detail: string;
};

export type SafetyNotice = {
  id: string;
  statement: string;
};

export type ConfidentialityNotice = {
  id: string;
  statement: string;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  responsibility: string;
};

export type ArchitectureEdge = {
  id: string;
  from: string;
  to: string;
  label?: string;
};

export type ArchitectureDiagram = {
  id: string;
  title: string;
  nodes: readonly ArchitectureNode[];
  edges: readonly ArchitectureEdge[];
};

export type InteractiveDemoDefinition =
  | {
      kind: "clinical-static-extraction";
      id: "clinical-extraction";
      label: string;
      acceptsArbitraryMedicalInput: false;
      sendsOpenAIRequests: false;
      staticOnly: true;
      fictionalNote: string;
      views: readonly ("source-note" | "extracted-actions" | "architecture")[];
    }
  | {
      kind: "deterministic-terminal";
      id: "realtime-cli-terminal";
      label: string;
      sendsOpenAIRequests: false;
      commands: readonly ("hi" | "6*7" | "architecture" | "exit")[];
    }
  | {
      kind: "schedule-rtl-preview";
      id: "academease-schedule";
      label: string;
      supportsRtlToggle: true;
      languages: readonly ("en" | "he")[];
    }
  | {
      kind: "silent-rhythm";
      id: "taptap-rhythm";
      label: string;
      audio: false;
      autoplay: false;
      timingFeedback: readonly ("Perfect" | "Good" | "Miss")[];
    };

export type ProjectMedia =
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      caption?: string;
    }
  | {
      type: "interactive-demo";
      demo: InteractiveDemoDefinition;
      caption?: string;
    }
  | {
      type: "code-sample";
      code: string;
      language: string;
      caption?: string;
    }
  | {
      type: "architecture-diagram";
      diagram: ArchitectureDiagram;
      caption?: string;
    };

/**
 * External actions that may appear in UI.
 * Only configured (non-null) values become renderable actions.
 */
export type ExternalLinkAction =
  | { action: "github"; href: string }
  | { action: "linkedin"; href: string }
  | { action: "email"; href: string; address: string }
  | { action: "cv"; href: string }
  | { action: "site"; href: string }
  | { action: "repository"; href: string; projectSlug: ProjectSlug }
  | { action: "live-demo"; href: string; projectSlug: ProjectSlug };

export type ConfigurableUrl = string | null;

export type ClinicalSafetyGuarantees = {
  demonstrationSystemOnly: true;
  clinicallyValidated: false;
  forMedicalDecisionMaking: false;
  forRealPatientData: false;
  hipaaCompliant: false;
  humanReviewMandatory: true;
  aiOutputNeverAutomaticallyConfirmed: true;
  knownSavedNoteLimitation: string;
  portfolioDemonstration: {
    staticOnly: true;
    acceptsArbitraryMedicalInput: false;
    sendsOpenAIRequests: false;
    label: string;
  };
  notices: readonly SafetyNotice[];
};

type ProjectBase = {
  slug: ProjectSlug;
  title: string;
  dates: ProjectDates;
  category: ProjectCategory;
  shortDescription: string;
  problem: string;
  solution: string;
  contribution: ProjectContribution;
  architectureHighlights: readonly string[];
  architecture?: ArchitectureDiagram;
  technologyStack: readonly string[];
  highlights: readonly ProjectHighlight[];
  engineeringDecisions: readonly EngineeringDecision[];
  challenges: readonly Challenge[];
  limitations: readonly KnownLimitation[];
  demonstrates: readonly string[];
  repositoryUrl: ConfigurableUrl;
  liveUrl: ConfigurableUrl;
  media: readonly ProjectMedia[];
  collaboration: CollaborationAttribution;
  /** Flattened safety copy for display when present. */
  safetyNote: string | null;
  confidentialityNote: string | null;
};

export type PublicCaseStudyProject = ProjectBase & {
  kind: "public-case-study";
  status: "case-study";
  featured: boolean;
};

export type EngineeringPracticeProject = ProjectBase & {
  kind: "engineering-practice";
  status: "engineering-practice";
  featured: false;
};

export type EducationalResearchProject = ProjectBase & {
  kind: "educational-research";
  status: "educational-research";
  featured: false;
  program: string;
};

export type ClinicalFollowUpDetectorProject = PublicCaseStudyProject & {
  slug: "clinical-follow-up-detector";
  category: "Full-Stack AI Application";
  clinicalSafety: ClinicalSafetyGuarantees;
  safetyNote: string;
  interactiveDemo: Extract<
    InteractiveDemoDefinition,
    { kind: "clinical-static-extraction" }
  >;
};

export type Project =
  | ClinicalFollowUpDetectorProject
  | (PublicCaseStudyProject & {
      slug: Exclude<ProjectSlug, "clinical-follow-up-detector">;
      clinicalSafety?: never;
    })
  | EngineeringPracticeProject
  | EducationalResearchProject;

export type ProfessionalWork = {
  id: string;
  kind: "professional-work";
  role: string;
  organization: string;
  productContext: string;
  dates: {
    display: string;
    verification: "pending-verification" | "verified";
  };
  collaboration: Extract<CollaborationAttribution, { type: "professional" }>;
  technologies: readonly string[];
  responsibilities: readonly string[];
  workAreas: readonly string[];
  confidentialityNotice: ConfidentialityNotice;
  /** Required display string — must match the mandatory proprietary note. */
  confidentialityNote: string;
  repositoryUrl: null;
  liveUrl: null;
};

export type Skill = {
  name: string;
};

export type SkillGroup = {
  id: TechnologyGroupId;
  label: string;
  skills: readonly string[];
};

export type EducationOrResearchItem = {
  id: string;
  kind: "education" | "research-program" | "professional-background";
  title: string;
  organization: string;
  dates: string | null;
  summary: string;
};

export type EngineeringPrinciple = {
  id: string;
  title: string;
  summary: string;
};

export type MissingContentItem = {
  id: string;
  label: string;
  status: "unresolved" | "resolved";
  notes?: string;
};
