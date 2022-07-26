// @ts-check

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(baseConfig)
