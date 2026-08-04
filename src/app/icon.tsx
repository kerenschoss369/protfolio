import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

/**
 * Deterministic KS monogram favicon — no fabricated photograph.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#12141a",
        color: "#f5f2ec",
        fontSize: 14,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        letterSpacing: "0.04em",
        fontWeight: 600,
      }}
    >
      KS
    </div>,
    size,
  );
}
