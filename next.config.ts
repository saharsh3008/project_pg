import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "prod-static-assets.amberstudent.com",
      },
      {
        protocol: "https",
        hostname: "static-assets.amberstudent.com",
      },
    ],
  },
};

export default nextConfig;
