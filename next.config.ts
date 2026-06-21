import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fiverr-res.cloudinary.com",
      },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
