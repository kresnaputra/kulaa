import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.kulaa.co.uk',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
