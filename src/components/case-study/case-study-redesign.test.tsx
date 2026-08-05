import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";

import { CaseStudyArticle } from "@/components/case-study/CaseStudyArticle";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getProjectBySlug } from "@/lib/project-utils";

function renderWithProviders(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <MotionProvider>{ui}</MotionProvider>
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
});
