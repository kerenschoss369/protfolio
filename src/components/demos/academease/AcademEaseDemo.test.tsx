import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { AcademEaseDemo } from "@/components/demos/academease/AcademEaseDemo";

afterEach(() => {
  cleanup();
});

describe("AcademEaseDemo", () => {
  it("labels fictional portfolio data", () => {
    render(<AcademEaseDemo />);
    expect(
      screen.getByText(/Fictional academic data for portfolio demonstration/i),
    ).toBeInTheDocument();
  });

  it("switches schedules and languages with RTL", async () => {
    const user = userEvent.setup();
    const { container } = render(<AcademEaseDemo />);

    expect(screen.getByText("Algorithms")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Schedule B/i }));
    expect(screen.getByText("Calculus")).toBeInTheDocument();
    expect(screen.getByText("08:00")).toBeInTheDocument();
    expect(screen.getAllByText(/Earliest start/i).length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "עברית" }));
    const demoRoot = container.querySelector("[dir='rtl']");
    expect(demoRoot).not.toBeNull();
    expect(demoRoot).toHaveAttribute("lang", "he");
    expect(screen.getByText("אלגוריתמים")).toBeInTheDocument();
  });

  it("filters materials with accessible selected state", async () => {
    const user = userEvent.setup();
    render(<AcademEaseDemo />);

    const exams = screen.getByRole("button", { name: /^Exams$/i });
    await user.click(exams);
    expect(exams).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/Algorithms — Past exam/i)).toBeInTheDocument();
    expect(screen.queryByText(/Databases — Summary/i)).not.toBeInTheDocument();
  });
});
