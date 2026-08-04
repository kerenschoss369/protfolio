import { ImageResponse } from "next/og";

import { portfolio } from "@/data/portfolio";

export const alt = `${portfolio.name} — ${portfolio.title}`;

/**
 * Deterministic typographic social card.
 * Referenced from metadata only when `siteUrl` is configured — avoids
 * Next.js inventing localhost absolute OG URLs during unconfigured builds.
 */
export async function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#f5f2ec",
        color: "#12141a",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #857f74",
            borderRadius: 8,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 22,
            letterSpacing: "0.08em",
            color: "#555c66",
          }}
        >
          KS
        </div>
        <div
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#5a5751",
          }}
        >
          Portfolio
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          {portfolio.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#1b4fd8",
            fontWeight: 500,
          }}
        >
          {portfolio.title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#5a5751",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          {portfolio.location}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
