// @ts-check

import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
  site: 'https://tchojnacki.dev',
  integrations: [tailwind(), react(), mdx(), sitemap(), robotsTxt(), compress()],
})
