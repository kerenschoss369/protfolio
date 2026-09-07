import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CustomCursor } from "@/components/cursor/CustomCursor";
import {
  CURSOR_ARROW_HEIGHT,
  CURSOR_ARROW_WIDTH,
  CURSOR_GLOW_ICE,
  CURSOR_GLOW_LAVENDER,
  CURSOR_GLOW_SIZE,
  CURSOR_GLOW_SIZE_HOVER,
  CURSOR_HOTSPOT_X,
  CURSOR_HOTSPOT_Y,
  CUSTOM_CURSOR_HTML_ATTR,
} from "@/components/cursor/custom-cursor";

const originalMatchMedia = window.matchMedia;

function installMatchMedia({
  customCursor = false,
  reducedMotion = false,
}: {
  customCursor?: boolean;
  reducedMotion?: boolean;
} = {}) {
  window.matchMedia = vi.fn((query: string) => {
    const matches = query.includes("hover: hover")
      ? customCursor
      : query.includes("prefers-reduced-motion")
        ? reducedMotion
        : false;

    return {
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  });
}

afterEach(() => {
  cleanup();
  window.matchMedia = originalMatchMedia;
  document.documentElement.removeAttribute(CUSTOM_CURSOR_HTML_ATTR);
  vi.restoreAllMocks();
});

describe("custom cursor geometry", () => {
  it("uses a larger classic arrow and lavender-ice glow", () => {
    expect(CURSOR_ARROW_WIDTH).toBe(28);
    expect(CURSOR_ARROW_HEIGHT).toBe(36);
    expect(CURSOR_HOTSPOT_X).toBe(1.15);
    expect(CURSOR_HOTSPOT_Y).toBe(0.2);
    expect(CURSOR_GLOW_SIZE).toBe(42);
    expect(CURSOR_GLOW_SIZE_HOVER).toBe(55);
    expect(CURSOR_GLOW_LAVENDER).toBe("#C9B8FF");
    expect(CURSOR_GLOW_ICE).toBe("#A8D8FF");
  });
});

describe("CustomCursor", () => {
  it("does not render on coarse or touch-first pointers", () => {
    installMatchMedia({ customCursor: false });
    render(<CustomCursor />);
    expect(document.querySelector("[data-custom-cursor-root]")).toBeNull();
    expect(document.documentElement.hasAttribute(CUSTOM_CURSOR_HTML_ATTR)).toBe(
      false,
    );
  });

  it("renders an overlay and hides the native cursor on fine hover pointers", () => {
    installMatchMedia({ customCursor: true });
    render(<CustomCursor />);

    expect(document.querySelector("[data-custom-cursor-root]")).toBeTruthy();
    expect(document.documentElement.hasAttribute(CUSTOM_CURSOR_HTML_ATTR)).toBe(
      true,
    );
    expect(document.querySelector(".custom-cursor-arrow svg")).toBeTruthy();
    expect(document.querySelector(".custom-cursor-glow-orb")).toBeTruthy();
  });

  it("places the arrow tip on the pointer coordinate", () => {
    installMatchMedia({ customCursor: true });
    render(<CustomCursor />);

    window.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 120,
        clientY: 90,
        bubbles: true,
        pointerType: "mouse",
      }),
    );

    const arrow = document.querySelector(".custom-cursor-arrow");
    expect(arrow).toHaveStyle(
      `transform: translate3d(${120 - CURSOR_HOTSPOT_X}px, ${90 - CURSOR_HOTSPOT_Y}px, 0)`,
    );
    expect(document.querySelector(".custom-cursor")).toHaveClass("is-visible");
  });

  it("reacts to interactive hover and click without a React render loop", () => {
    installMatchMedia({ customCursor: true });
    render(
      <>
        <CustomCursor />
        <a href="#work">Work</a>
      </>,
    );

    const link = screen.getByRole("link", { name: "Work" });
    link.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 24,
        clientY: 16,
        bubbles: true,
        pointerType: "mouse",
      }),
    );

    const root = document.querySelector(".custom-cursor");
    expect(root).toHaveClass("is-interactive");

    window.dispatchEvent(
      new PointerEvent("pointerdown", {
        button: 0,
        bubbles: true,
        pointerType: "mouse",
      }),
    );
    expect(root).toHaveClass("is-pressed");

    window.dispatchEvent(
      new PointerEvent("pointerup", {
        button: 0,
        bubbles: true,
        pointerType: "mouse",
      }),
    );
    expect(root).not.toHaveClass("is-pressed");
  });

  it("follows the pointer under reduced motion without hover or click scaling", () => {
    installMatchMedia({ customCursor: true, reducedMotion: true });
    render(
      <>
        <CustomCursor />
        <button type="button">Contact</button>
      </>,
    );

    const button = screen.getByRole("button", { name: "Contact" });
    button.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 40,
        clientY: 50,
        bubbles: true,
        pointerType: "mouse",
      }),
    );

    const root = document.querySelector(".custom-cursor");
    expect(root).toHaveClass("is-visible");
    expect(root).not.toHaveClass("is-interactive");

    window.dispatchEvent(
      new PointerEvent("pointerdown", {
        button: 0,
        bubbles: true,
        pointerType: "mouse",
      }),
    );
    expect(root).not.toHaveClass("is-pressed");
  });

  it("fades out when the pointer leaves the document", () => {
    installMatchMedia({ customCursor: true });
    render(<CustomCursor />);

    window.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 10,
        clientY: 10,
        bubbles: true,
        pointerType: "mouse",
      }),
    );
    expect(document.querySelector(".custom-cursor")).toHaveClass("is-visible");

    document.documentElement.dispatchEvent(new Event("mouseleave"));
    expect(document.querySelector(".custom-cursor")).not.toHaveClass(
      "is-visible",
    );
  });

  it("removes the native-cursor lock on unmount", () => {
    installMatchMedia({ customCursor: true });
    const { unmount } = render(<CustomCursor />);
    expect(document.documentElement.hasAttribute(CUSTOM_CURSOR_HTML_ATTR)).toBe(
      true,
    );
    unmount();
    expect(document.documentElement.hasAttribute(CUSTOM_CURSOR_HTML_ATTR)).toBe(
      false,
    );
  });

  it("hides the arrow while the pointer is over the About invert scope", () => {
    installMatchMedia({ customCursor: true });
    render(
      <>
        <CustomCursor />
        <section data-about-invert="">About</section>
      </>,
    );

    const about = screen.getByText("About");
    about.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 80,
        clientY: 80,
        bubbles: true,
        pointerType: "mouse",
      }),
    );

    expect(document.querySelector(".custom-cursor")).toHaveClass(
      "is-about-invert",
    );
  });
});
