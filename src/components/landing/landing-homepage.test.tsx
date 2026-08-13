import { render, screen } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { CommandMenuHost } from "@/components/command-menu/CommandMenuHost";
import { LandingAboutSection } from "@/components/landing/LandingAboutSection";
import { LandingHeroSection } from "@/components/landing/LandingHeroSection";
import { LandingWorkSection } from "@/components/landing/LandingWorkSection";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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

vi.mock("next/image", () => ({
  default: (
    props: {
      alt: string;
      priority?: boolean;
    } & React.ImgHTMLAttributes<HTMLImageElement>,
  ) => {
    const { alt, priority, ...rest } = props;
    void priority;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...rest} />;
  },
}));

function renderWithMotion(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <MotionProvider>
        <CommandMenuHost>{ui}</CommandMenuHost>
      </MotionProvider>
    </ThemeProvider>,
  );
}

describe("landing homepage", () => {
  it("shows hero identity and portrait", () => {
    renderWithMotion(<LandingHeroSection />);

    expect(
      screen.getByRole("heading", { name: /Hi, i'm Keren/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Portrait of Keren Schoss/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact Me" })).toHaveAttribute(
      "href",
      "#contact",
    );
  });

  it("lists selected projects in order", () => {
    renderWithMotion(<LandingWorkSection />);

    expect(
      screen.getByRole("heading", { name: "Clinical Follow-Up Detector" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Realtime GPT-4o-mini CLI" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "AcademEase" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "TapTap Avengers" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Frontend Developer" }),
    ).toBeInTheDocument();
  });

  it("shows about section copy", () => {
    renderWithMotion(<LandingAboutSection />);

    expect(
      screen.getByRole("heading", { name: /Between logic/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Keren Schoss, frontend and full-stack developer",
      }),
    ).toBeInTheDocument();
  });
});
