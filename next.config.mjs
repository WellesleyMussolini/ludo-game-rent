/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
    },
    images: {
        domains: ['https://acervo-ludico-prod.s3.amazonaws.com/'],
        unoptimized: true,
    }
};

export default nextConfig;
