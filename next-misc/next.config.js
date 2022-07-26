/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = withImages({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    disableStaticImages: true,
  },
  redirects: async () => [
    {
      source: '/about',
      destination: '/',
      permanent: false,
    },
  ],
});

module.exports = nextConfig;
