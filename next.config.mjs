/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      enabled: true,
      resolveAlias: {
        '@/*': './src/*'
      }
    }
  },
  images: {
    domains: [
      'picsum.photos',
      'i.pravatar.cc'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src'
    };
    return config;
  }
};

export default nextConfig;