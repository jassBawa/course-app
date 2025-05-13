import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dlpnxcv6dazhk.cloudfront.net',
        port: '',
        pathname: '/course-images/**',
      },
    ],
  },
};

export default nextConfig;
