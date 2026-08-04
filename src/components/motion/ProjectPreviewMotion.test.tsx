import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MotionProvider } from "@/components/motion/MotionProvider";
import {
  ClinicalPreviewMotion,
  TerminalPreviewMotion,
} from "@/components/motion/ProjectPreviewMotion";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function mockMatchMedia(reduced = true) {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn(() => []);
      root = null;
      rootMargin = "";
      thresholds: number[] = [];
      constructor(callback: IntersectionObserverCallback) {
        queueMicrotask(() => {
          callback(
            [
              {
                isIntersecting: true,
                intersectionRatio: 1,
                target: document.createElement("div"),
                boundingClientRect: {} as DOMRectReadOnly,
                intersectionRect: {} as DOMRectReadOnly,
                rootBounds: null,
                time: 0,
              },
            ],
            this as unknown as IntersectionObserver,
          );
        });
      }
    },
  });

  vi.spyOn(window, "matchMedia").mockImplementation((query: string) => {
    return {
      matches: query.includes("prefers-reduced-motion") ? reduced : false,
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

describe("project preview motion", () => {
  it("shows clinical static demonstration content under reduced motion", () => {
    mockMatchMedia(true);
    render(
      <MotionProvider>
        <ClinicalPreviewMotion />
      </MotionProvider>,
    );

    expect(screen.getByText(/Static demonstration/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Needs review/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: /Repeat CBC/i }),
    ).toBeInTheDocument();
  });

  it("exposes terminal replay without requiring network", () => {
    mockMatchMedia(true);
    render(
      <MotionProvider>
        <TerminalPreviewMotion />
      </MotionProvider>,
    );

    expect(screen.getByRole("button", { name: /Replay/i })).toBeInTheDocument();
    expect(screen.getByText(/multiply\(6, 7\) → 42/i)).toBeInTheDocument();
    expect(screen.getByText(/Offline simulation/i)).toBeInTheDocument();
  });
});
