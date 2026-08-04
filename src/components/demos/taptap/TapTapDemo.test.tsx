import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TapTapDemo } from "@/components/demos/taptap/TapTapDemo";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("TapTapDemo", () => {
  it("explains controls and does not auto-start", () => {
    render(<TapTapDemo />);
    expect(screen.getByText(/Controls before start/i)).toBeInTheDocument();
    expect(screen.getByText(/No copyrighted music/i)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      /Ready — review controls/i,
    );
  });

  it("supports start, pause, and reset", async () => {
    const user = userEvent.setup();
    render(<TapTapDemo />);

    await user.click(screen.getByRole("button", { name: /^Start$/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/Playing|Step /i);

    await user.click(screen.getByRole("button", { name: /^Pause$/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/^Paused$/i);

    await user.click(screen.getByRole("button", { name: /^Reset$/i }));
    expect(screen.getByRole("status")).toHaveTextContent(
      /Ready — review controls/i,
    );
  });

  it("does not announce per-frame timing in the live region while playing", async () => {
    const user = userEvent.setup();
    render(<TapTapDemo />);

    await user.click(screen.getByRole("button", { name: /^Start$/i }));
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent(/^Playing$/i);
    expect(status).not.toHaveTextContent(/\d+\s*ms/i);
  });

  it("uses reduced-motion step mode when preferred", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const user = userEvent.setup();
    render(<TapTapDemo />);

    expect(screen.getByText(/Reduced-motion mode/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /^Start$/i }));
    await user.click(screen.getByRole("button", { name: /^Hit$/i }));
    expect(screen.getByText(/Score 100/i)).toBeInTheDocument();
    expect(screen.getByText(/Combo 1/i)).toBeInTheDocument();
  });
});
