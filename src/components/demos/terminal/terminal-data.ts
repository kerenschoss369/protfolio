import type { ArchitectureDiagram } from "@/data/content-types";

export const realtimeCliDemoArchitecture: ArchitectureDiagram = {
  id: "realtime-cli-demo-architecture",
  title: "Realtime GPT CLI concurrency model",
  nodes: [
    {
      id: "websocket",
      label: "WebSocket",
      responsibility:
        "Realtime transport to the model endpoint in the original CLI (not used by this portfolio simulation).",
    },
    {
      id: "reader",
      label: "Reader goroutine",
      responsibility:
        "Continuously reads the connection and decodes incoming JSON events.",
    },
    {
      id: "channel",
      label: "Event channel",
      responsibility:
        "Passes decoded events from the reader to the main goroutine.",
    },
    {
      id: "main",
      label: "Main goroutine",
      responsibility:
        "Accepts prompts, sends conversation.item.create / response.create, and consumes events.",
    },
    {
      id: "multiply",
      label: "Local multiply",
      responsibility:
        "Deterministic multiply(a, b) executed locally outside the model.",
    },
  ],
  edges: [
    {
      id: "ws-reader",
      from: "websocket",
      to: "reader",
      label: "Bytes in",
    },
    {
      id: "reader-channel",
      from: "reader",
      to: "channel",
      label: "Decoded events",
    },
    {
      id: "channel-main",
      from: "channel",
      to: "main",
      label: "Consume",
    },
    {
      id: "main-multiply",
      from: "main",
      to: "multiply",
      label: "Function call",
    },
    {
      id: "multiply-main",
      from: "multiply",
      to: "main",
      label: "Function output",
    },
  ],
};
