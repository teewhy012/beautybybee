import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["stripe"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;