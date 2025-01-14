import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["8d5bzsqw-3000.uks1.devtunnels.ms", "localhost:3000"],
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lqjodliarpxa4ava.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
