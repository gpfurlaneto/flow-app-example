/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["gateway.pinata.cloud"],
  },
};

module.exports = nextConfig;
