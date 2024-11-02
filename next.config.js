// next.config.js
const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
  });
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
    images: {
        domains: ['https://acervo-ludico-prod.s3.amazonaws.com/'],
      unoptimized: true,
    },
  };
  
  module.exports = withPWA(nextConfig);
  