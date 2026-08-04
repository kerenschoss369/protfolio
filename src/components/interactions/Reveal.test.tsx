import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  Reveal,
  RevealEnhancer,
  revealTestIds,
} from "@/components/interactions/Reveal";

afterEach(() => {
  document.documentElement.removeAttribute(revealTestIds.enhanced);
  vi.restoreAllMocks();
});

describe("Reveal progressive enhancement", () => {
  it("keeps content present and visible before enhancement", () => {
    render(
      <Reveal>
        <p>Section copy</p>
      </Reveal>,
    );

    const copy = screen.getByText("Section copy");
    expect(copy).toBeVisible();

    const host = copy.parentElement;
    expect(host?.hasAttribute(revealTestIds.attr)).toBe(true);
    expect(document.documentElement.hasAttribute(revealTestIds.enhanced)).toBe(
      false,
    );
  });

  it("does not leave content dependent on animation completion", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <>
        <RevealEnhancer />
        <Reveal>
          <p>Always readable</p>
        </Reveal>
      </>,
    );

    expect(screen.getByText("Always readable")).toBeVisible();
    expect(document.documentElement.hasAttribute(revealTestIds.enhanced)).toBe(
      false,
    );
  });
});
