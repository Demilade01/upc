/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['upcomingwipes.com'], // Add your image domains here if needed
    },
    experimental: {
      optimizeCss: true,
    },
    webpack: (config, { dev, isServer }) => {
      // Webpack optimizations can be added here
      return config
    },
  }
  
  module.exports = nextConfig