import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server accept requests from a loopback host, which Next 16
  // otherwise blocks, preventing the client bundle from hydrating.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
