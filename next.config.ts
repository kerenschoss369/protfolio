import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
