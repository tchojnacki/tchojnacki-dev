// @ts-check

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import compress from 'astro-compress'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'

import { remarkReadingTime } from './src/utils/blog/readingTime'

// https://astro.build/config
export default defineConfig({
  site: 'https://tchojnacki.dev',
  trailingSlash: 'never',
  integrations: [tailwind(), react(), mdx(), sitemap(), robotsTxt(), compress({ HTML: false })],
  markdown: { remarkPlugins: [remarkReadingTime] },
})
