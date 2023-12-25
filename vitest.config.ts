/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'
export default getViteConfig({
  test: {
    coverage: {
      include: ['src/logic'],
    },
  },
})
