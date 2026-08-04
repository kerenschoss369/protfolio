import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HeroVisual } from "@/components/home/HeroVisual";
import { MotionProvider } from "@/components/motion/MotionProvider";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function mockMatchMedia(reduced = false, fine = true) {
  vi.spyOn(window, "matchMedia").mockImplementation((query: string) => {
    const matches = query.includes("prefers-reduced-motion")
      ? reduced
      : query.includes("pointer: fine")
        ? fine
        : false;
    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList;
  });
}

describe("HeroVisual", () => {
  it("keeps system content visible and supports keyboard node selection", async () => {
    mockMatchMedia(false, true);
    const user = userEvent.setup();

    render(
      <MotionProvider>
        <HeroVisual />
      </MotionProvider>,
    );

    expect(
      screen.getByRole("img", {
        name: /Editorial system diagram connecting interface/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Select a node to inspect the system composition/i),
    ).toBeInTheDocument();

    const interfaceButton = screen.getByRole("button", { name: /Interface/i });
    await user.click(interfaceButton);

    expect(interfaceButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/User-facing experience/i)).toBeInTheDocument();
  });

  it("remains usable under reduced motion", async () => {
    mockMatchMedia(true, false);
    const user = userEvent.setup();

    render(
      <MotionProvider>
        <HeroVisual />
      </MotionProvider>,
    );

    const systems = screen.getByRole("button", { name: /Systems/i });
    await user.click(systems);
    expect(systems).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText(/Architecture and reliable boundaries/i),
    ).toBeInTheDocument();
  });
});
