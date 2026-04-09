import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "x8csko0g4skcc4gokkso48g4.95.216.199.224.sslip.io",
      },
      {
        protocol: "https",
        hostname: "x8csko0g4skcc4gokkso48g4.95.216.199.224.sslip.io",
      },
      // Allow any sslip.io subdomain for local/staging API instances
      {
        protocol: "http",
        hostname: "**.sslip.io",
      },
      {
        protocol: "https",
        hostname: "**.sslip.io",
      },
    ],
  },
};

export default nextConfig;
