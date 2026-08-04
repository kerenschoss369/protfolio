import { describe, expect, it, beforeEach } from "vitest";

import {
  executeTerminalCommand,
  parseTerminalCommand,
  resetTerminalIdCounter,
  SUPPORTED_TERMINAL_COMMANDS,
} from "@/components/demos/terminal/terminal-engine";

describe("terminal engine", () => {
  beforeEach(() => {
    resetTerminalIdCounter();
  });

  it("parses supported commands including help and clear", () => {
    expect(parseTerminalCommand("help")).toBe("help");
    expect(parseTerminalCommand("HI")).toBe("hi");
    expect(parseTerminalCommand("6 * 7")).toBe("6*7");
    expect(parseTerminalCommand("architecture")).toBe("architecture");
    expect(parseTerminalCommand("clear")).toBe("clear");
    expect(parseTerminalCommand("exit")).toBe("exit");
    expect(parseTerminalCommand("hack")).toBe("unknown");
  });

  it("lists supported commands via help", () => {
    const result = executeTerminalCommand("help");
    expect(result.type).toBe("append");
    if (result.type !== "append") return;
    const text = result.entries
      .map((e) => ("text" in e ? e.text : ""))
      .join(" ");
    for (const command of SUPPORTED_TERMINAL_COMMANDS) {
      expect(text).toContain(command);
    }
  });

  it("runs the full 6*7 function-call lifecycle locally", () => {
    const result = executeTerminalCommand("6*7");
    expect(result.type).toBe("append");
    if (result.type !== "append") return;
    const names = result.entries
      .filter((entry) => entry.kind === "event")
      .map((entry) => entry.name);
    expect(names).toContain("conversation.item.create");
    expect(names).toContain("response.create");
    expect(names).toContain("response.function_call_arguments.done");
    const local = result.entries.find((entry) => entry.kind === "local");
    expect(local && "text" in local ? local.text : "").toMatch(/42/);
    const assistant = result.entries.find(
      (entry) => entry.kind === "assistant",
    );
    expect(assistant && "text" in assistant ? assistant.text : "").toBe("42");
    expect(result.exited).toBe(false);
  });

  it("clears history and exits without implying page close", () => {
    expect(executeTerminalCommand("clear")).toEqual(
      expect.objectContaining({ type: "clear", exited: false }),
    );
    const exitResult = executeTerminalCommand("exit");
    expect(exitResult.type).toBe("append");
    if (exitResult.type !== "append") return;
    expect(exitResult.exited).toBe(true);
    expect(
      exitResult.entries.some(
        (entry) =>
          entry.kind === "system" &&
          entry.text.includes("browser page stays open"),
      ),
    ).toBe(true);
  });

  it("handles unknown commands", () => {
    const result = executeTerminalCommand("deploy-prod");
    expect(result.type).toBe("append");
    if (result.type !== "append") return;
    expect(result.entries.some((entry) => entry.kind === "error")).toBe(true);
  });
});
