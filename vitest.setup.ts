import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-sans", className: "font-sans" }),
  Geist_Mono: () => ({ variable: "--font-mono", className: "font-mono" }),
  Source_Serif_4: () => ({ variable: "--font-serif", className: "font-serif" }),
  Kanit: () => ({ variable: "--font-kanit", className: "font-kanit" }),
}));

vi.mock("next/font/local", () => ({
  default: () => ({
    variable: "--font-keren-hand",
    className: "font-keren-hand",
  }),
}));

vi.mock("next/image", async () => {
  const React = await import("react");
  return {
    default: ({ alt, src }: { alt?: string; src: string }) =>
      React.createElement("img", { alt: alt ?? "", src }),
  };
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

class IntersectionObserverStub {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];
  observe() {
    return undefined;
  }
  unobserve() {
    return undefined;
  }
  disconnect() {
    return undefined;
  }
  takeRecords() {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
