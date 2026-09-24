import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Local restricted environments can skip Next's child-process typecheck;
    // `npm run typecheck` still performs the full strict check separately.
    ignoreBuildErrors: process.env.NEXT_LOCAL_SKIP_TYPECHECK === "1",
  },
  experimental: {
    workerThreads: true,
    cpus: 1,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
