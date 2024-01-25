/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = config;
