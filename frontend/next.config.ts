import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
const BACKEND_URL = (
  backendUrl.startsWith('http://') || backendUrl.startsWith('https://')
    ? backendUrl
    : `https://${backendUrl}`
).replace(/\/+$/, '');

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/participants/:path*',
        destination: `${BACKEND_URL}/participants/:path*`,
      },
      {
        source: '/questions/:path*',
        destination: `${BACKEND_URL}/questions/:path*`,
      },
      {
        source: '/quiz/:path*',
        destination: `${BACKEND_URL}/quiz/:path*`,
      },
      {
        source: '/results/:path*',
        destination: `${BACKEND_URL}/results/:path*`,
      },
    ];
  },
};

export default nextConfig;
