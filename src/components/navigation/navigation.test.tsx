import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedWorkSection } from "@/components/home/FeaturedWorkSection";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { experience } from "@/data/experience";
import {
  buildCommandActions,
  filterCommandActions,
} from "@/lib/command-actions";
import { getFeaturedProjects } from "@/lib/project-utils";

const pushMock = vi.fn();
let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({
    push: pushMock,
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

function renderWithProviders(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe("command actions", () => {
  it("includes featured project and navigation actions", () => {
    const actions = buildCommandActions();
    const labels = actions.map((action) => action.label);

    expect(labels).toContain("View Clinical Follow-Up Detector");
    expect(labels).toContain("View AcademEase");
    expect(labels).toContain("View Realtime GPT-4o-mini CLI");
    expect(labels).toContain("View TapTap Avengers");
    expect(labels).toContain("View all work");
    expect(labels).toContain("Open About");
    expect(labels).toContain("Open Contact");
    expect(labels).toContain("Switch theme");
  });

  it("hides unconfigured external actions", () => {
    const labels = buildCommandActions().map((action) => action.label);

    expect(labels).not.toContain("Open GitHub");
    expect(labels).not.toContain("Open LinkedIn");
    expect(labels).not.toContain("Download CV");
    expect(labels).not.toContain("Send email");
  });

  it("filters by title, category, and technology", () => {
    const actions = buildCommandActions();
    const reactMatches = filterCommandActions(actions, "react");
    const clinicalMatches = filterCommandActions(actions, "clinical");

    expect(
      reactMatches.some((action) => action.id.includes("academease")),
    ).toBe(true);
    expect(
      clinicalMatches.some((action) =>
        action.id.includes("clinical-follow-up-detector"),
      ),
    ).toBe(true);
  });
});

describe("SiteHeader navigation", () => {
  beforeEach(() => {
    pathname = "/";
    pushMock.mockReset();
    window.localStorage.clear();
    document.documentElement.setAttribute("data-theme", "light");
  });

  it("opens and closes the mobile menu, restores focus, and responds to Escape", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);

    const openButton = screen.getByRole("button", {
      name: "Open navigation menu",
    });
    await user.click(openButton);

    const dialog = screen.getByRole("dialog", { name: "Menu" });
    expect(dialog).toBeInTheDocument();
    expect(openButton).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("dialog", { name: "Menu" }),
    ).not.toBeInTheDocument();
    expect(openButton).toHaveFocus();
  });

  it("opens the command menu with Ctrl/Meta+K and closes with Escape", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);

    await user.keyboard("{Control>}k{/Control}");

    const dialog = screen.getByRole("dialog", { name: "Command menu" });
    expect(dialog).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /View Clinical Follow-Up Detector/i }),
    ).toBeInTheDocument();

    const search = screen.getByLabelText("Search commands");
    await user.type(search, "about");
    expect(
      screen.getByRole("option", { name: /Open About/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("option", {
        name: /View Clinical Follow-Up Detector/i,
      }),
    ).not.toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("dialog", { name: "Command menu" }),
    ).not.toBeInTheDocument();
  });

  it("toggles theme from the header control", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);

    const toggle = screen.getAllByRole("button", {
      name: /Switch to dark theme/i,
    })[0];
    expect(toggle).toBeTruthy();
    await user.click(toggle!);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("does not render Download CV when unconfigured", () => {
    renderWithProviders(<SiteHeader />);
    expect(screen.queryByText("Download CV")).not.toBeInTheDocument();
  });
});

describe("homepage content", () => {
  it("renders featured project treatments and clinical safety context", () => {
    render(<FeaturedWorkSection projects={getFeaturedProjects()} />);

    expect(
      screen.getByRole("heading", { name: "Clinical Follow-Up Detector" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "AcademEase" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Realtime GPT-4o-mini CLI" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "TapTap Avengers" }),
    ).toBeInTheDocument();

    expect(screen.getByText(/Demonstration system only/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Not for medical decision-making/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Static demonstration/i)).toBeInTheDocument();
  });

  it("renders the professional confidentiality note", () => {
    const primary = experience[0];
    expect(primary).toBeTruthy();
    render(<ExperiencePreview experience={primary!} />);

    expect(
      screen.getByText(
        /Professional work is described at a high level\. Source code and internal product details are proprietary\./i,
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /repository/i })).toBeNull();
  });

  it("renders hero identity without fake profile photography", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", { name: "Keren Schoss" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Frontend & Full-Stack Developer"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View selected work" }),
    ).toHaveAttribute("href", "/work");
    expect(
      screen.queryByRole("img", { name: /portrait|photo|headshot/i }),
    ).toBeNull();
  });
});

describe("command menu focus restoration", () => {
  beforeEach(() => {
    pathname = "/";
    window.localStorage.clear();
  });

  it("returns focus to the command trigger after close", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);

    const triggers = screen.getAllByRole("button", {
      name: "Open command menu",
    });
    const trigger = triggers[0];
    expect(trigger).toBeTruthy();
    await user.click(trigger!);

    expect(
      screen.getByRole("dialog", { name: "Command menu" }),
    ).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
  });
});

describe("mobile menu route close", () => {
  it("exposes mobile navigation links with accessible targets", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);

    await user.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );

    const dialog = screen.getByRole("dialog", { name: "Menu" });
    expect(
      within(dialog).getByRole("link", { name: "Work" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("link", { name: "About" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("link", { name: "Contact" }),
    ).toBeInTheDocument();
  });
});
