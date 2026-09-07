import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";

import { CaseStudyArticle } from "@/components/case-study/CaseStudyArticle";
import { CommandMenuHost } from "@/components/command-menu/CommandMenuHost";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getProjectBySlug } from "@/lib/project-utils";

vi.mock("next/navigation", () => ({
  usePathname: () => "/work/atlas-research",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

vi.mock("@/components/demos/ProjectDemoSection", () => ({
  ProjectDemoSection: () => <div data-testid="project-demo-stub" />,
}));

function renderWithProviders(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <MotionProvider>
        <CommandMenuHost>{ui}</CommandMenuHost>
      </MotionProvider>
    </ThemeProvider>,
  );
}

describe("visual redesign — case study", () => {
  it("keeps clinical safety visible and technical details disclosed", () => {
    const project = getProjectBySlug("clinical-follow-up-detector");
    expect(project).toBeTruthy();

    renderWithProviders(<CaseStudyArticle project={project!} />);

    expect(
      screen.getByRole("heading", { name: "Clinical Follow-Up Detector" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Safety notice")).toBeInTheDocument();
    expect(
      screen.getAllByText(/Demonstration system only/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Technical details")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Key engineering decisions" }),
    ).toBeInTheDocument();
  });

  it("renders device mockup caption for product preview", () => {
    const project = getProjectBySlug("realtime-gpt-cli");
    expect(project).toBeTruthy();

    renderWithProviders(<CaseStudyArticle project={project!} />);

    expect(
      screen.getByText(/Conceptual product preview for Realtime GPT/i),
    ).toBeInTheDocument();
  });

  it("omits product preview and narrative sections on ATLAS", () => {
    const project = getProjectBySlug("atlas-research");
    expect(project).toBeTruthy();

    renderWithProviders(<CaseStudyArticle project={project!} />);

    expect(
      screen.queryByText(/Conceptual product preview/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Problem" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Solution" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Contribution" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Architecture" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Key engineering decisions" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Challenge" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Limitation" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Technical details")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Research paper" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Case study")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Practical Physics and Big Data Development"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Educational research")).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /Individual educational research within a university program/i,
      ),
    ).not.toBeInTheDocument();
    expect(screen.getByTitle("ATLAS research paper")).toBeInTheDocument();
  });
});
