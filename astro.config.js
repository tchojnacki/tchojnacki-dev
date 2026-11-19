// @ts-check

import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import compress from "astro-compress"
import expressiveCode from "astro-expressive-code"
import { defineConfig, fontProviders } from "astro/config"

import { remarkReadingTime } from "./src/lib/readingTime"

// https://astro.build/config
export default defineConfig({
  site: "https://tchojnacki.dev",
  trailingSlash: "never",
  integrations: [
    react({ compiler: true }),
    expressiveCode(),
    mdx(),
    sitemap(),
    compress({ HTML: false }),
  ],
  markdown: { processor: unified({ remarkPlugins: [remarkReadingTime] }) },
  vite: { plugins: [tailwindcss()] },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["400 600"],
      subsets: ["latin", "latin-ext"],
      styles: ["normal"],
      optimizedFallbacks: false,
    },
  ],
  prefetch: {
    prefetchAll: true,
  },
  security: {
    csp: {
      directives: ["default-src 'self'", "font-src 'self' data:", "img-src 'self' data:"],
      styleDirective: { resources: ["'self'", "'unsafe-inline'"] },
    },
  },
})
