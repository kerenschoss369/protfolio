/**
 * Deterministic terminal simulation engine.
 * No network, no API keys, no live model behavior.
 */

export type TerminalCommand =
  "help" | "hi" | "6*7" | "architecture" | "clear" | "exit";

export type TerminalEntry =
  | { kind: "system"; id: string; text: string }
  | { kind: "prompt"; id: string; text: string }
  | { kind: "user"; id: string; command: string }
  | { kind: "assistant"; id: string; text: string }
  | { kind: "event"; id: string; name: string; detail?: string }
  | { kind: "local"; id: string; text: string }
  | { kind: "error"; id: string; text: string };

export type EventFlowStep = {
  id: string;
  label: string;
  detail: string;
};

export const SUPPORTED_TERMINAL_COMMANDS: readonly TerminalCommand[] = [
  "help",
  "hi",
  "6*7",
  "architecture",
  "clear",
  "exit",
] as const;

export const TERMINAL_WELCOME: TerminalEntry = {
  kind: "system",
  id: "welcome",
  text: "Local portfolio simulation. No OpenAI connection. No API key required. Predetermined commands only.",
};

export const TERMINAL_PROMPT: TerminalEntry = {
  kind: "prompt",
  id: "prompt",
  text: ">",
};

export const realtimeCliArchitectureSteps: readonly EventFlowStep[] = [
  {
    id: "ws",
    label: "WebSocket connection",
    detail: "CLI maintains a realtime session transport.",
  },
  {
    id: "reader",
    label: "Reader goroutine",
    detail: "Continuously reads the connection.",
  },
  {
    id: "json",
    label: "JSON decoding",
    detail: "Incoming messages are decoded as events.",
  },
  {
    id: "channel",
    label: "Event channel",
    detail: "Decoded events are sent through a Go channel.",
  },
  {
    id: "main",
    label: "Main goroutine",
    detail: "Sends requests and consumes events.",
  },
  {
    id: "local-fn",
    label: "Local deterministic function",
    detail: "multiply(a, b) executes outside the model.",
  },
  {
    id: "final",
    label: "Final response request",
    detail: "A follow-up response.create asks for the answer.",
  },
] as const;

let entryCounter = 0;

function nextId(prefix: string): string {
  entryCounter += 1;
  return `${prefix}-${entryCounter}`;
}

/** Reset id counter for deterministic unit tests. */
export function resetTerminalIdCounter(): void {
  entryCounter = 0;
}

export function parseTerminalCommand(raw: string): TerminalCommand | "unknown" {
  const normalized = raw.trim().toLowerCase();
  if (normalized === "help") return "help";
  if (normalized === "hi") return "hi";
  if (normalized === "6*7" || normalized === "6 * 7") return "6*7";
  if (normalized === "architecture") return "architecture";
  if (normalized === "clear") return "clear";
  if (normalized === "exit") return "exit";
  return "unknown";
}

export function createMultiplySequence(commandText: string): TerminalEntry[] {
  return [
    { kind: "user", id: nextId("user"), command: commandText },
    {
      kind: "event",
      id: nextId("event"),
      name: "conversation.item.create",
      detail: "User message added to the conversation",
    },
    {
      kind: "event",
      id: nextId("event"),
      name: "response.create",
      detail: "Request model response",
    },
    {
      kind: "event",
      id: nextId("event"),
      name: "response.function_call_arguments.done",
      detail: 'multiply({ "a": 6, "b": 7 })',
    },
    {
      kind: "local",
      id: nextId("local"),
      text: "local multiply(6, 7) → 42",
    },
    {
      kind: "event",
      id: nextId("event"),
      name: "conversation.item.create",
      detail: "function_call_output: 42",
    },
    {
      kind: "event",
      id: nextId("event"),
      name: "response.create",
      detail: "Follow-up response for final answer",
    },
    {
      kind: "assistant",
      id: nextId("assistant"),
      text: "42",
    },
  ];
}

export function createHelpEntries(): TerminalEntry[] {
  return [
    {
      kind: "assistant",
      id: nextId("assistant"),
      text: `Supported simulation commands: ${SUPPORTED_TERMINAL_COMMANDS.join(", ")}`,
    },
  ];
}

export function createHiEntries(): TerminalEntry[] {
  return [
    {
      kind: "assistant",
      id: nextId("assistant"),
      text: "Hello. This is a predetermined local simulation response — not a live model.",
    },
  ];
}

export function createArchitectureEntries(): TerminalEntry[] {
  return [
    {
      kind: "assistant",
      id: nextId("assistant"),
      text: "Architecture: WebSocket connection → reader goroutine → JSON decoding → event channel → main goroutine → local deterministic function → final response request.",
    },
    ...realtimeCliArchitectureSteps.map((step) => ({
      kind: "event" as const,
      id: nextId("event"),
      name: step.label,
      detail: step.detail,
    })),
  ];
}

export function createExitEntries(): TerminalEntry[] {
  return [
    {
      kind: "system",
      id: nextId("system"),
      text: "Session closed in the original CLI. This browser page stays open — simulation ended.",
    },
  ];
}

export function createUnknownEntries(command: string): TerminalEntry[] {
  return [
    {
      kind: "error",
      id: nextId("error"),
      text: `Unknown command “${command}”. Type help for supported simulation commands.`,
    },
  ];
}

export type TerminalExecuteResult =
  | {
      type: "append";
      entries: TerminalEntry[];
      status: string;
      exited: boolean;
    }
  | { type: "clear"; status: string; exited: false };

export function executeTerminalCommand(raw: string): TerminalExecuteResult {
  const command = parseTerminalCommand(raw);
  const display = raw.trim() || "(empty)";

  if (command === "clear") {
    return {
      type: "clear",
      status: "Terminal history cleared",
      exited: false,
    };
  }

  const userEntry: TerminalEntry = {
    kind: "user",
    id: nextId("user"),
    command: display,
  };

  if (command === "help") {
    return {
      type: "append",
      entries: [userEntry, ...createHelpEntries()],
      status: "Listed supported commands",
      exited: false,
    };
  }

  if (command === "hi") {
    return {
      type: "append",
      entries: [userEntry, ...createHiEntries()],
      status: "Showed predetermined greeting",
      exited: false,
    };
  }

  if (command === "6*7") {
    // createMultiplySequence already includes the user entry
    return {
      type: "append",
      entries: createMultiplySequence(display),
      status: "Completed local multiply function-call lifecycle",
      exited: false,
    };
  }

  if (command === "architecture") {
    return {
      type: "append",
      entries: [userEntry, ...createArchitectureEntries()],
      status: "Described realtime CLI architecture",
      exited: false,
    };
  }

  if (command === "exit") {
    return {
      type: "append",
      entries: [userEntry, ...createExitEntries()],
      status: "Simulation session ended — page remains open",
      exited: true,
    };
  }

  return {
    type: "append",
    entries: [userEntry, ...createUnknownEntries(display)],
    status: "Unknown command",
    exited: false,
  };
}

export const multiplyEventFlow: readonly EventFlowStep[] = [
  {
    id: "user-cmd",
    label: "User command",
    detail: "6*7 entered in the terminal",
  },
  {
    id: "item-create",
    label: "conversation.item.create",
    detail: "User message added to the conversation",
  },
  {
    id: "response-create",
    label: "response.create",
    detail: "Initial response request",
  },
  {
    id: "fn-args",
    label: "Function-call arguments",
    detail: "multiply(a: 6, b: 7)",
  },
  {
    id: "local-exec",
    label: "Local multiply(a, b)",
    detail: "Deterministic local execution → 42",
  },
  {
    id: "fn-output",
    label: "Function-call output",
    detail: "Result 42 returned to the session",
  },
  {
    id: "follow-up",
    label: "Follow-up response.create",
    detail: "Request final assistant answer",
  },
  {
    id: "final-answer",
    label: "Final answer",
    detail: "42",
  },
] as const;
