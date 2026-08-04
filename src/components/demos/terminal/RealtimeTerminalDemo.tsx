"use client";

import {
  useEffect,
  useId,
  useReducer,
  useRef,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import {
  DemoControls,
  DemoFrame,
  DemoHeader,
  DemoModeButton,
  DemoStatus,
  InteractiveArchitectureDiagram,
  SimulationNotice,
} from "@/components/demos/shared";
import { realtimeCliDemoArchitecture } from "@/components/demos/terminal/terminal-data";
import {
  executeTerminalCommand,
  multiplyEventFlow,
  SUPPORTED_TERMINAL_COMMANDS,
  TERMINAL_PROMPT,
  TERMINAL_WELCOME,
  type TerminalEntry,
} from "@/components/demos/terminal/terminal-engine";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

type ViewMode = "terminal" | "event-flow";

type TerminalState = {
  entries: TerminalEntry[];
  status: string;
  exited: boolean;
  viewMode: ViewMode;
  history: string[];
  historyIndex: number | null;
  input: string;
};

type TerminalAction =
  | { type: "set-input"; value: string }
  | { type: "set-view"; viewMode: ViewMode }
  | { type: "history-up" }
  | { type: "history-down" }
  | { type: "run"; command: string };

function createInitialState(): TerminalState {
  return {
    entries: [TERMINAL_WELCOME],
    status: "Ready for a simulation command",
    exited: false,
    viewMode: "terminal",
    history: [],
    historyIndex: null,
    input: "",
  };
}

function applyCommand(state: TerminalState, raw: string): TerminalState {
  if (state.exited && parseAllowAfterExit(raw) === false) {
    return {
      ...state,
      status: "Simulation already ended. Use clear to reset the terminal.",
    };
  }

  if (!raw.trim()) {
    return { ...state, status: "Enter a command, or choose a shortcut" };
  }

  const result = executeTerminalCommand(raw);
  const history = [...state.history, raw.trim()];

  if (result.type === "clear") {
    return {
      ...state,
      entries: [TERMINAL_WELCOME],
      status: result.status,
      exited: false,
      history,
      historyIndex: null,
      input: "",
    };
  }

  return {
    ...state,
    entries: [...state.entries, ...result.entries],
    status: result.status,
    exited: result.exited,
    history,
    historyIndex: null,
    input: "",
  };
}

function parseAllowAfterExit(raw: string): boolean {
  return raw.trim().toLowerCase() === "clear";
}

function terminalReducer(
  state: TerminalState,
  action: TerminalAction,
): TerminalState {
  switch (action.type) {
    case "set-input":
      return { ...state, input: action.value, historyIndex: null };
    case "set-view":
      return {
        ...state,
        viewMode: action.viewMode,
        status:
          action.viewMode === "event-flow"
            ? "Showing structured event-flow timeline"
            : "Showing terminal view",
      };
    case "history-up": {
      if (state.history.length === 0) return state;
      const nextIndex =
        state.historyIndex === null
          ? state.history.length - 1
          : Math.max(0, state.historyIndex - 1);
      const value = state.history[nextIndex] ?? "";
      return { ...state, historyIndex: nextIndex, input: value };
    }
    case "history-down": {
      if (state.historyIndex === null) return state;
      if (state.historyIndex >= state.history.length - 1) {
        return { ...state, historyIndex: null, input: "" };
      }
      const nextIndex = state.historyIndex + 1;
      return {
        ...state,
        historyIndex: nextIndex,
        input: state.history[nextIndex] ?? "",
      };
    }
    case "run":
      return applyCommand(state, action.command);
    default:
      return state;
  }
}

function entryClassName(kind: TerminalEntry["kind"]): string {
  switch (kind) {
    case "system":
      return "text-muted";
    case "user":
      return "text-foreground";
    case "assistant":
      return "text-accent";
    case "event":
      return "text-steel";
    case "local":
      return "text-success";
    case "error":
      return "text-danger";
    case "prompt":
      return "text-muted";
    default:
      return "text-foreground";
  }
}

function formatEntry(entry: TerminalEntry): string {
  switch (entry.kind) {
    case "user":
      return `> ${entry.command}`;
    case "event":
      return entry.detail
        ? `event  ${entry.name} — ${entry.detail}`
        : `event  ${entry.name}`;
    case "assistant":
      return `assistant  ${entry.text}`;
    case "local":
      return entry.text;
    case "system":
    case "error":
    case "prompt":
      return entry.text;
    default:
      return "";
  }
}

export function RealtimeTerminalDemo() {
  const titleId = useId();
  const descriptionId = useId();
  const inputId = useId();
  const [state, dispatch] = useReducer(
    terminalReducer,
    undefined,
    createInitialState,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = outputRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [state.entries]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch({ type: "run", command: state.input });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      dispatch({ type: "history-up" });
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      dispatch({ type: "history-down" });
    }
  }

  return (
    <DemoFrame
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      minHeightClassName="min-h-[34rem]"
      className="bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--steel)_18%,transparent),transparent_55%),var(--surface-2)]"
    >
      <div className="space-y-4 p-4 sm:p-5">
        <SimulationNotice
          label="Local portfolio simulation — predetermined commands and event sequences only."
          details={[
            "No OpenAI connection",
            "No API key required",
            "Not a live model session",
          ]}
        />

        <DemoHeader
          title="Realtime GPT-4o-mini CLI simulation"
          titleId={titleId}
          description="Deterministic browser terminal demonstrating WebSocket event flow and local multiply function calling."
          descriptionId={descriptionId}
          actions={
            <DemoControls label="View mode">
              <DemoModeButton
                label="Terminal"
                selected={state.viewMode === "terminal"}
                onSelect={() =>
                  dispatch({ type: "set-view", viewMode: "terminal" })
                }
              />
              <DemoModeButton
                label="Event flow"
                selected={state.viewMode === "event-flow"}
                onSelect={() =>
                  dispatch({ type: "set-view", viewMode: "event-flow" })
                }
              />
            </DemoControls>
          }
        />

        <div className="flex flex-wrap gap-2">
          <Tag variant="steel">Offline simulation</Tag>
          <Tag variant="default">Deterministic</Tag>
          <Tag variant="default">No network</Tag>
        </div>

        {state.viewMode === "terminal" ? (
          <div className="space-y-3">
            <div
              ref={outputRef}
              tabIndex={0}
              className="border-border-strong max-h-[22rem] min-h-[14rem] overflow-auto rounded-[var(--radius-md)] border bg-[color-mix(in_srgb,var(--foreground)_92%,#0a0c10)] p-3 font-mono text-[length:var(--text-code)] leading-relaxed break-words whitespace-pre-wrap text-[color-mix(in_srgb,var(--background)_92%,#f5f2ec)] select-text sm:p-4"
              aria-label="Terminal output"
            >
              {state.entries.map((entry) => (
                <p
                  key={entry.id}
                  className={cn("mb-1 last:mb-0", entryClassName(entry.kind))}
                >
                  {formatEntry(entry)}
                </p>
              ))}
              {!state.exited ? (
                <p className="text-muted">
                  {TERMINAL_PROMPT.kind === "prompt"
                    ? TERMINAL_PROMPT.text
                    : ">"}{" "}
                  _
                </p>
              ) : null}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 sm:flex-row sm:items-end"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <label
                  htmlFor={inputId}
                  className="font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase"
                >
                  Command
                </label>
                <input
                  ref={inputRef}
                  id={inputId}
                  type="text"
                  name="command"
                  autoComplete="off"
                  spellCheck={false}
                  disabled={state.exited}
                  value={state.input}
                  onChange={(event) =>
                    dispatch({ type: "set-input", value: event.target.value })
                  }
                  onKeyDown={handleKeyDown}
                  className={cn(
                    "border-border-strong bg-background min-h-[var(--touch-target)] w-full rounded-[var(--radius-md)] border px-3 font-mono text-[length:var(--text-code)]",
                    "focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                  )}
                  aria-describedby={`${inputId}-hint`}
                />
                <p
                  id={`${inputId}-hint`}
                  className="text-muted text-[length:var(--text-sm)]"
                >
                  Enter submits. Up/Down recall history. No API key field
                  exists.
                </p>
              </div>
              <Button type="submit" disabled={state.exited}>
                Run
              </Button>
            </form>

            <DemoControls label="Command shortcuts" className="gap-2">
              {SUPPORTED_TERMINAL_COMMANDS.map((command) => (
                <button
                  key={command}
                  type="button"
                  disabled={state.exited && command !== "clear"}
                  onClick={() => dispatch({ type: "run", command })}
                  className={cn(
                    "border-border-subtle bg-background min-h-[var(--touch-target)] rounded-[var(--radius-md)] border px-3 font-mono text-[length:var(--text-meta)] tracking-[var(--tracking-meta)] uppercase",
                    "focus-visible:outline-focus-ring focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
                    "hover:bg-surface-1 disabled:cursor-not-allowed disabled:opacity-50",
                  )}
                >
                  {command}
                </button>
              ))}
            </DemoControls>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              <Text variant="meta" className="text-muted">
                6*7 function-call lifecycle
              </Text>
              <ol className="border-border-subtle divide-border-subtle divide-y rounded-[var(--radius-md)] border">
                {multiplyEventFlow.map((step, index) => (
                  <li
                    key={step.id}
                    className="grid gap-1 p-3 sm:grid-cols-[2.5rem_minmax(0,1fr)]"
                  >
                    <span className="text-steel font-mono text-[length:var(--text-meta)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-mono text-[length:var(--text-code)] break-words">
                        {step.label}
                      </p>
                      <p className="text-muted text-[length:var(--text-sm)] text-pretty">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <InteractiveArchitectureDiagram
              diagram={realtimeCliDemoArchitecture}
            />
          </div>
        )}

        <DemoStatus message={state.status} />
      </div>
    </DemoFrame>
  );
}
