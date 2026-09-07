import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/projects/atlas-research/atlas-research.pdf",
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          {
            key: "Content-Disposition",
            value: 'inline; filename="atlas-research.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
