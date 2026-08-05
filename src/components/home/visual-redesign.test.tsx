import { render, screen } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { AboutPreview } from "@/components/home/AboutPreview";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { FeaturedWorkSection } from "@/components/home/FeaturedWorkSection";
import { HeroSection } from "@/components/home/HeroSection";
import { StickyFeaturedStack } from "@/components/home/StickyFeaturedStack";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { capabilityGroups } from "@/data/capabilities";
import { portfolio } from "@/data/portfolio";
import { getFeaturedProjects } from "@/lib/project-utils";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
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
    children: ReactNode;
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

vi.mock("next/image", () => ({
  default: ({
    alt,
    ...props
  }: {
    alt: string;
  } & React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

function renderWithProviders(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <MotionProvider>{ui}</MotionProvider>
    </ThemeProvider>,
  );
}

describe("visual redesign — homepage", () => {
  it("shows hero identity and positioning immediately", () => {
    renderWithProviders(<HeroSection />);

    expect(
      screen.getByRole("heading", { name: "Keren Schoss" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Frontend & Full-Stack Developer"),
    ).toBeInTheDocument();
    expect(screen.getByText(portfolio.heroStatement)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View selected work" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "GitHub" }),
    ).not.toBeInTheDocument();
  });

  it("keeps featured project summaries concise", () => {
    renderWithProviders(
      <FeaturedWorkSection projects={getFeaturedProjects()} />,
    );

    for (const project of getFeaturedProjects()) {
      expect(
        screen.getByRole("heading", { name: project.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(project.shortDescription)).toBeInTheDocument();
    }

    expect(
      screen.queryByText(/Led frontend development after independently/i),
    ).toBeNull();
  });

  it("renders sticky stack fallback markup", () => {
    render(
      <MotionProvider>
        <StickyFeaturedStack>
          <div key="one">Card one</div>
          <div key="two">Card two</div>
        </StickyFeaturedStack>
      </MotionProvider>,
    );

    expect(screen.getByText("Card one")).toBeInTheDocument();
    expect(screen.getByText("Card two")).toBeInTheDocument();
  });

  it("shows compact capability groups instead of skill walls", () => {
    renderWithProviders(<CapabilitiesSection groups={capabilityGroups} />);

    expect(
      screen.getByRole("heading", { name: "How the work shows up" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Frontend systems")).toBeInTheDocument();
    expect(screen.getByText("AI integration")).toBeInTheDocument();
    expect(screen.queryByText("Reactive Forms")).toBeNull();
  });

  it("includes about preview with portrait", () => {
    renderWithProviders(<AboutPreview />);

    expect(
      screen.getByRole("img", { name: /Portrait of Keren Schoss/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /More about me/i }),
    ).toHaveAttribute("href", "/about");
  });
});
