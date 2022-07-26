// @ts-check

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // Source: https://darrenwhite.dev/blog/nextjs-replace-react-with-preact
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(baseConfig)
