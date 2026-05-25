import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/politica-de-privacidade",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/termos-e-condicoes",
        destination: "/terms",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
