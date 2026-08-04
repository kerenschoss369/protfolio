import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

/**
 * Deterministic KS monogram apple touch icon.
 */
export default function AppleIcon() {
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
        fontSize: 72,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        letterSpacing: "0.06em",
        fontWeight: 600,
      }}
    >
      KS
    </div>,
    size,
  );
}
