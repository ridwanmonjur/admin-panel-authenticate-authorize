/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLIENT_COOKIE_ACCESS_TOKEN: process.env.CLIENT_COOKIE_ACCESS_TOKEN,
    BACKEND: process.env.BACKEND,
    PRODUCTION: process.env.PRODUCTION,
  }
}

module.exports = nextConfig
