import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { RealtimeTerminalDemo } from "@/components/demos/terminal/RealtimeTerminalDemo";

afterEach(() => {
  cleanup();
});

describe("RealtimeTerminalDemo", () => {
  it("labels simulation and has no API key field", () => {
    const { container } = render(<RealtimeTerminalDemo />);
    expect(screen.getAllByText(/No OpenAI connection/i).length).toBeGreaterThan(
      0,
    );
    expect(screen.getAllByText(/No API key required/i).length).toBeGreaterThan(
      0,
    );
    expect(container.querySelector('input[type="password"]')).toBeNull();
    expect(screen.queryByLabelText(/api key/i)).toBeNull();
  });

  it("submits commands from keyboard and shortcuts", async () => {
    const user = userEvent.setup();
    render(<RealtimeTerminalDemo />);

    const input = screen.getByLabelText(/^Command$/i);
    await user.type(input, "hi{Enter}");
    expect(
      screen.getByText(/predetermined local simulation response/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "6*7" }));
    expect(
      screen.getByText(/local multiply\(6, 7\) → 42/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) => content.includes("assistant") && content.includes("42"),
      ),
    ).toBeInTheDocument();
  });

  it("supports event-flow mode and clear/exit", async () => {
    const user = userEvent.setup();
    render(<RealtimeTerminalDemo />);

    await user.click(screen.getByRole("button", { name: /Event flow/i }));
    expect(
      screen.getByText(/6\*7 function-call lifecycle/i),
    ).toBeInTheDocument();
    expect(screen.getByText("conversation.item.create")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Terminal/i }));
    await user.click(screen.getByRole("button", { name: "exit" }));
    expect(screen.getByText(/browser page stays open/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "clear" }));
    expect(
      screen.getByText(/Predetermined commands only/i),
    ).toBeInTheDocument();
  });
});
