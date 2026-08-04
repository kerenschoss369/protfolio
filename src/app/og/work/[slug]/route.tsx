import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { portfolio } from "@/data/portfolio";
import { getProjectBySlug, getProjectSlugs } from "@/lib/project-utils";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

/**
 * Project typographic OG card. Linked from metadata only when siteUrl is set.
 */
export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#121417",
        color: "#f1eee7",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 20,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#9aa3ae",
          }}
        >
          <span
            style={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #3a3f48",
              borderRadius: 6,
            }}
          >
            KS
          </span>
          Case study · {portfolio.name}
        </div>
        <div
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 18,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#6b8aff",
            maxWidth: 420,
            textAlign: "right",
          }}
        >
          {project.category}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            maxWidth: 1000,
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#a9a399",
            maxWidth: 960,
            lineHeight: 1.35,
          }}
        >
          {project.shortDescription}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
