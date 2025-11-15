import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '192.168.0.104',
      },
      {
        protocol: 'https',
        hostname: '192.168.0.104',
      },
    ],
  },
};

export default nextConfig;
