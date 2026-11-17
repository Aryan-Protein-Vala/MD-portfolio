/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  reactStrictMode: true,
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
