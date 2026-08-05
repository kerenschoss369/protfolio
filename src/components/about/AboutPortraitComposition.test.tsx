import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AboutPortraitComposition } from "@/components/about/AboutPortraitComposition";
import { MotionProvider } from "@/components/motion/MotionProvider";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    width,
    height,
  }: {
    alt: string;
    src: string;
    width: number;
    height: number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} width={width} height={height} />
  ),
}));

describe("AboutPortraitComposition", () => {
  it("renders the real portrait cutout with useful alt text", () => {
    render(
      <MotionProvider>
        <AboutPortraitComposition statement="Composition becomes interface." />
      </MotionProvider>,
    );

    const image = screen.getByRole("img", {
      name: "Portrait of Keren Schoss",
    });
    expect(image).toHaveAttribute(
      "src",
      "/about/keren-schoss-cutout.webp",
    );
    expect(image).toHaveAttribute("width", "632");
    expect(image).toHaveAttribute("height", "721");
  });
});
