// @ts-check

import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import robotsTxt from 'astro-robots-txt'
import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
  site: 'https://tchojnacki.dev',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [tailwind(), react(), robotsTxt(), compress()],
})
