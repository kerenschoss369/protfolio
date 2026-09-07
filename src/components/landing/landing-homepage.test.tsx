import { render, screen } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { CommandMenuHost } from "@/components/command-menu/CommandMenuHost";
import { LandingAboutSection } from "@/components/landing/LandingAboutSection";
import { LandingHeroSection } from "@/components/landing/LandingHeroSection";
import { LandingRoot } from "@/components/landing/LandingRoot";
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
    expect(screen.getByRole("button", { name: /^Work$/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^About$/ })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^Contact$/ }),
    ).toBeInTheDocument();
  });

  it("scrolls to sections without following the hash", () => {
    const work = document.createElement("section");
    work.id = "work";
    work.scrollIntoView = vi.fn();
    document.body.append(work);

    renderWithMotion(<LandingHeroSection />);
    screen.getByRole("button", { name: /^Work$/ }).click();

    expect(work.scrollIntoView).toHaveBeenCalled();
    work.remove();
  });

  it("exposes a back to top control", () => {
    renderWithMotion(
      <LandingRoot>
        <p>Content</p>
      </LandingRoot>,
    );

    expect(screen.getByLabelText("Back to top")).toBeInTheDocument();
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
  });

  it("combines the about and professional experience content", () => {
    renderWithMotion(<LandingAboutSection />);

    expect(
      screen.getByText("02 — About me & professional experience"),
    ).toBeInTheDocument();
    const aboutHeading = screen.getByRole("heading", {
      name: /Between logic/i,
    });
    expect(aboutHeading).toBeInTheDocument();
    const technicalExperienceHeading = screen.getByRole("heading", {
      name: /Technical.*experience/i,
    });
    expect(aboutHeading.closest("[data-about-invert]")).not.toBeNull();
    expect(
      technicalExperienceHeading.closest("[data-about-invert]"),
    ).toBeNull();
    const aboutCopy = screen.getByText(
      /My work sits somewhere between logic and creativity/,
    );
    expect(aboutCopy.compareDocumentPosition(technicalExperienceHeading)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(
      screen.getByRole("heading", { name: "Frontend Developer" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "SOC Team Leader & IT" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Keren Schoss, frontend and full-stack developer",
      }),
    ).toBeInTheDocument();
    const fontLink = screen.getByRole("link", { name: "here" });
    expect(fontLink).toHaveAttribute("href", "/fonts/Keren-Schoss-Hand.ttf");
    expect(fontLink).toHaveAttribute("download", "Keren-Schoss-Hand.ttf");
  });
});
