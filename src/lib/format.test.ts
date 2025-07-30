import { describe, expect, it } from 'vitest'
import { canonize, slugify } from './format'

describe(canonize, () => {
  it.each([
    ['', ''],
    ['/path/to', 'path/to'],
    ['path/to/', 'path/to'],
    ['//path/to//', 'path/to'],
  ])('canonizes %s to %s', (input, expected) => {
    expect(canonize(input)).toBe(expected)
  })
})

describe(slugify, () => {
  it.each([
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
