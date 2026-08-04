import { describe, expect, it } from "vitest";

import { experience } from "@/data/experience";
import {
  CLINICAL_SAFETY_NOTE,
  CLINICAL_SAVED_NOTE_LIMITATION,
  projects,
} from "@/data/projects";
import { isConfiguredHttpUrl } from "@/lib/links";
import {
  filterProjects,
  getAdjacentProjects,
  getAllProjects,
  getProjectBySlug,
  getProjectFilterIds,
  projectMatchesFilter,
  WORK_FILTERS,
} from "@/lib/project-utils";

describe("work index filtering", () => {
  it("exposes the expected filter options", () => {
    expect(WORK_FILTERS.map((filter) => filter.id)).toEqual([
      "all",
      "frontend",
      "full-stack",
      "ai",
      "systems",
      "game-development",
      "research-and-practice",
    ]);
  });

  it("includes every configured project under All", () => {
    const all = filterProjects(getAllProjects(), "all");
    expect(all.map((project) => project.slug)).toEqual(
      projects.map((project) => project.slug),
    );
  });

  it("derives filters from project data rather than hard-coded duplicates", () => {
    const clinical = getProjectBySlug("clinical-follow-up-detector")!;
    const academease = getProjectBySlug("academease")!;
    const tapTap = getProjectBySlug("taptap-avengers")!;
    const bandit = getProjectBySlug("overthewire-bandit")!;
    const atlas = getProjectBySlug("atlas-research")!;

    expect(getProjectFilterIds(clinical)).toEqual(
      expect.arrayContaining(["full-stack", "ai"]),
    );
    expect(getProjectFilterIds(academease)).toEqual(
      expect.arrayContaining(["full-stack", "frontend"]),
    );
    expect(projectMatchesFilter(tapTap, "game-development")).toBe(true);
    expect(projectMatchesFilter(bandit, "research-and-practice")).toBe(true);
    expect(projectMatchesFilter(atlas, "research-and-practice")).toBe(true);
  });

  it("returns an empty list for filters with no matches only when appropriate", () => {
    const game = filterProjects(getAllProjects(), "game-development");
    expect(game.map((project) => project.slug)).toEqual(["taptap-avengers"]);
  });

  it("keeps professional work outside the public project filter list", () => {
    expect(
      getAllProjects().some((project) => project.slug.includes("elal")),
    ).toBe(false);
    expect(experience[0]?.kind).toBe("professional-work");
    expect(experience[0]?.repositoryUrl).toBeNull();
  });
});

describe("case-study route data", () => {
  it("resolves configured project slugs and rejects invalid ones", () => {
    expect(getProjectBySlug("realtime-gpt-cli")?.title).toBe(
      "Realtime GPT-4o-mini CLI",
    );
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("provides non-wrapping previous and next navigation", () => {
    expect(getAdjacentProjects("clinical-follow-up-detector")).toEqual({
      previous: null,
      next: getProjectBySlug("academease"),
    });
    expect(getAdjacentProjects("atlas-research")).toEqual({
      previous: getProjectBySlug("overthewire-bandit"),
      next: null,
    });
    expect(getAdjacentProjects("academease").previous?.slug).toBe(
      "clinical-follow-up-detector",
    );
    expect(getAdjacentProjects("academease").next?.slug).toBe(
      "realtime-gpt-cli",
    );
  });

  it("omits missing external links from configured project data", () => {
    for (const project of projects) {
      expect(isConfiguredHttpUrl(project.repositoryUrl)).toBe(false);
      expect(isConfiguredHttpUrl(project.liveUrl)).toBe(false);
    }
  });
});

describe("case-study content guarantees", () => {
  it("keeps mandatory clinical safety and known limitation content", () => {
    const clinical = getProjectBySlug("clinical-follow-up-detector")!;
    expect(clinical.safetyNote).toContain("Demonstration system only");
    expect(clinical.safetyNote).toBe(CLINICAL_SAFETY_NOTE);
    expect(
      clinical.limitations.some(
        (item) => item.detail === CLINICAL_SAVED_NOTE_LIMITATION,
      ),
    ).toBe(true);
    expect(clinical.safetyNote).toMatch(/Not HIPAA compliant/i);
    expect(clinical.safetyNote).toMatch(/human review/i);
  });

  it("includes AcademEase and TapTap team attribution", () => {
    expect(getProjectBySlug("academease")?.collaboration.type).toBe("team");
    expect(getProjectBySlug("academease")?.contribution.team).toBeDefined();
    expect(getProjectBySlug("taptap-avengers")?.collaboration.type).toBe(
      "team",
    );
    expect(
      getProjectBySlug("taptap-avengers")?.contribution.team,
    ).toBeDefined();
  });

  it("keeps ATLAS free of discovery claims", () => {
    const atlas = getProjectBySlug("atlas-research")!;
    const blob = [
      atlas.shortDescription,
      atlas.problem,
      atlas.solution,
      atlas.collaboration.summary,
      ...atlas.limitations.map((item) => item.detail),
      ...atlas.demonstrates,
    ].join(" ");

    expect(blob).not.toMatch(/discovered the Higgs/i);
    expect(blob).not.toMatch(/I discovered/i);
    expect(blob).toMatch(
      /Does not imply discovery credit, CERN employment, publication authorship/i,
    );
  });

  it("keeps OverTheWire free of secrets and solution fields", () => {
    const bandit = getProjectBySlug("overthewire-bandit")!;
    const blob = JSON.stringify(bandit);

    expect(blob).not.toMatch(/flag\{/i);
    expect(blob).not.toMatch(/level\s*0*1\s*[:=]/i);
    expect(bandit).not.toHaveProperty("passwords");
    expect(bandit).not.toHaveProperty("flags");
    expect(bandit).not.toHaveProperty("solutions");
    expect(bandit).not.toHaveProperty("walkthrough");
    expect(
      bandit.limitations.some((item) =>
        /Passwords, flags, and exact challenge solutions are never published/i.test(
          item.detail,
        ),
      ),
    ).toBe(true);
  });

  it("includes the professional confidentiality note", () => {
    expect(experience[0]?.confidentialityNote).toMatch(
      /Professional work is described at a high level/i,
    );
  });
});
