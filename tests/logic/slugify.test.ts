import { describe, expect, test } from 'vitest'

import { slugify } from '~/logic/slugify'

describe(slugify, () => {
  test.each([
    ['', ''],
    ['About me', 'about-me'],
    ['Recent posts', 'recent-posts'],
    ['Featured skills', 'featured-skills'],
    ['Featured projects', 'featured-projects'],
    ['Related skills', 'related-skills'],
    ['Related projects', 'related-projects'],
  ])("slugifies '%s' to '%s'", (value, slug) => {
    expect(slugify(value)).toBe(slug)
  })
})
