import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@assets': path.resolve(__dirname, 'src/assets'),
    };

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nyrnpjrhajarawlpyxdd.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
