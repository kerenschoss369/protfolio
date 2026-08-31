import { describe, expect, it } from "vitest";

import {
  landingEducation,
  landingExperience,
  landingProjects,
} from "@/components/landing/landing-data";
import { CLINICAL_SAFETY_COMPACT } from "@/data/projects";
import { portfolio } from "@/data/portfolio";
import { experience } from "@/data/experience";

describe("landing content derives from canonical sources", () => {
  it("uses canonical titles, categories, and dates", () => {
    const academease = landingProjects.find(
      (project) => project.slug === "academease",
    );
    expect(academease?.title).toBe("AcademEase");
    expect(academease?.category).toBe("Full-Stack Web Application");

    expect(landingExperience[0]?.dates).toBe(experience[0]?.dates.display);
    expect(landingExperience[0]?.dates).toBe("2025–Present");
    expect(landingExperience[0]?.statement).toMatch(
      /Developing production features across EL AL's large-scale web platform/,
    );
    expect(landingExperience[0]?.areas).toEqual([
      "Angular",
      "HTML",
      "TypeScript",
      "RxJS",
      "SCSS",
      "NgRx",
      "REST APIs",
      "Nx monorepo",
    ]);
    expect(landingExperience[0]?.technologies).toEqual([]);
    expect(landingExperience[0]?.confidentialityNote).toBeUndefined();
    expect(landingExperience[1]?.role).toBe("SOC Team Leader & IT");
    expect(landingExperience[1]?.org).toBe("IDF Manpower Directorate");
    expect(landingExperience[1]?.dates).toBe("2018 — 2020");
    expect(landingEducation?.dates).toBe("Graduated Oct 2024");
  });

  it("keeps clinical safety complete on the homepage card", () => {
    const clinical = landingProjects.find(
      (project) => project.slug === "clinical-follow-up-detector",
    );
    expect(clinical?.safetyNote).toBe(CLINICAL_SAFETY_COMPACT);
    expect(clinical?.safetyNote).toMatch(/HIPAA/i);
    expect(clinical?.safetyNote).toMatch(/medical decisions/i);
    expect(clinical?.simulationLabel).toMatch(/no OpenAI/i);
  });

  it("does not redefine the formal role", () => {
    expect(portfolio.title).toBe("Frontend & Full-Stack Developer");
  });
});
