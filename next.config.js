/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false
  },
  output: 'standalone',
  trailingSlash: true
};

module.exports = nextConfig;
