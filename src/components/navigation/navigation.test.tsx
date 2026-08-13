import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CommandMenuHost } from "@/components/command-menu/CommandMenuHost";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LandingHeroSection } from "@/components/landing/LandingHeroSection";
import { LandingWorkSection } from "@/components/landing/LandingWorkSection";
import {
  buildCommandActions,
  filterCommandActions,
} from "@/lib/command-actions";

const pushMock = vi.fn();
let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({
    push: pushMock,
    replace: pushMock,
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

vi.mock("next/dynamic", () => ({
  default: () => {
    function DynamicStub() {
      return <div data-testid="hero-visual-stub" />;
    }
    return DynamicStub;
  },
}));

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <MotionProvider>
        <CommandMenuHost>{ui}</CommandMenuHost>
      </MotionProvider>
    </ThemeProvider>,
  );
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
  });

  it("includes configured external actions", () => {
    const labels = buildCommandActions().map((action) => action.label);

    expect(labels).toContain("Open GitHub");
    expect(labels).toContain("Open LinkedIn");
    expect(labels).toContain("Download CV");
    expect(labels).toContain("Send email");
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

  it("renders Download CV when configured", () => {
    renderWithProviders(<SiteHeader />);
    const cvLinks = screen.getAllByRole("link", { name: /Download CV/i });
    expect(cvLinks.length).toBeGreaterThan(0);
    for (const link of cvLinks) {
      expect(link).toHaveAttribute("href", "/cv/keren-schoss-cv.pdf");
    }
  });
});

describe("homepage content", () => {
  it("renders featured project treatments and clinical safety context", () => {
    renderWithProviders(<LandingWorkSection />);

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

    expect(screen.getByText(/Demo only/i)).toBeInTheDocument();
    expect(screen.getByText(/human review required/i)).toBeInTheDocument();
    expect(screen.getByText(/real patient data/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Professional work is described at a high level\. Source code and internal product details are proprietary\./i,
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/IDF|SOC Team Leader/i)).toBeNull();
  });

  it("renders hero identity with a distinct portrait", () => {
    renderWithProviders(<LandingHeroSection />);

    expect(
      screen.getByRole("heading", { name: /Hi, i'm Keren/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Frontend & Full-Stack Developer"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Portrait of Keren Schoss" }),
    ).toBeInTheDocument();
  });
});

describe("command menu focus restoration", () => {
  beforeEach(() => {
    pathname = "/";
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
