/// <reference types="vitest" />

import { getViteConfig } from 'astro/config'

export default getViteConfig({
  // @ts-expect-error ts(2353) - TODO: remove after dependency update
  test: {
    coverage: {
      include: ['src/logic'],
    },
  },
})
