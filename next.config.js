/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BACKEND_HOST
  }
};

module.exports = nextConfig;
