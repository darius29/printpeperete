/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

export default nextConfig;
