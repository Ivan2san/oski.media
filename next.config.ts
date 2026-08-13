import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Thumbnails for projects that have a YouTube link but no uploaded
    // poster frame. Locked to YouTube's still host — nothing else is proxied.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};

export default nextConfig;
