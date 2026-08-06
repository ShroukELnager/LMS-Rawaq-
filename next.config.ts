import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    // This must precede Next's `oneOf` rules, otherwise the SVG reaches
    // webpack's parser before SVGR is considered.
    config.module.rules.unshift({
      test: /\.svg$/i,
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
