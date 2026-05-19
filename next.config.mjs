/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['supabase.co', 'nursefiti.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['recharts', 'framer-motion'],
  },
};

export default nextConfig;
