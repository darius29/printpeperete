/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  // Workaround for @vercel/og on Windows with file path handling
  experimental: {
    esmExternals: true,
  },
};

module.exports = nextConfig;
