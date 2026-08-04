import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { WorkFilters } from "@/components/work/WorkFilters";
import { getAllProjects } from "@/lib/project-utils";

vi.mock("next/navigation", () => ({
  usePathname: () => "/work",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.spyOn(window, "matchMedia").mockImplementation((query: string) => {
  return {
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as MediaQueryList;
});

function renderFilters(
  projects:
    | ReturnType<typeof getAllProjects>
    | readonly ReturnType<typeof getAllProjects>[number][],
) {
  return render(
    <MotionProvider>
      <WorkFilters projects={projects} />
    </MotionProvider>,
  );
}

describe("WorkFilters", () => {
  it("filters projects with keyboard-accessible buttons", async () => {
    const user = userEvent.setup();
    renderFilters(getAllProjects());

    expect(
      screen.getByRole("heading", { name: "Clinical Follow-Up Detector" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "OverTheWire Bandit" }),
    ).toBeInTheDocument();

    const gameFilter = screen.getByRole("button", {
      name: /Game Development/i,
    });
    await user.click(gameFilter);

    expect(gameFilter).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("heading", { name: "TapTap Avengers" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Clinical Follow-Up Detector" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "OverTheWire Bandit" }),
    ).not.toBeInTheDocument();
  });

  it("shows an accessible empty state when needed", async () => {
    const user = userEvent.setup();
    const practiceOnly = getAllProjects().filter(
      (project) => project.kind === "engineering-practice",
    );
    renderFilters(practiceOnly);

    await user.click(screen.getByRole("button", { name: /AI/i }));

    expect(screen.getByRole("status")).toHaveTextContent(
      /No projects match this filter/i,
    );
  });
});
