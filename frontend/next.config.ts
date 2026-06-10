import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/participants/:path*',
        destination: 'http://localhost:3001/participants/:path*',
      },
      {
        source: '/questions/:path*',
        destination: 'http://localhost:3001/questions/:path*',
      },
      {
        source: '/quiz/:path*',
        destination: 'http://localhost:3001/quiz/:path*',
      },
      {
        source: '/results/:path*',
        destination: 'http://localhost:3001/results/:path*',
      },
    ];
  },
};

export default nextConfig;
