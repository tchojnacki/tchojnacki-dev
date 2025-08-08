// @ts-check

import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import compress from "astro-compress"
import robotsTxt from "astro-robots-txt"
import { defineConfig, fontProviders } from "astro/config"

import { remarkReadingTime } from "./src/lib/readingTime"

// https://astro.build/config
export default defineConfig({
  site: "https://tchojnacki.dev",
  trailingSlash: "never",
  integrations: [react(), mdx(), sitemap(), robotsTxt(), compress({ HTML: false })],
  markdown: { remarkPlugins: [remarkReadingTime] },
  vite: { plugins: [tailwindcss()] },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter",
        weights: ["400 600"],
        subsets: ["latin", "latin-ext"],
      },
    ],
  },
})
