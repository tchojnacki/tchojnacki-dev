import { describe, expect, it } from 'vitest'

import { getReadingTimeMinutes, remarkReadingTime } from '~/lib/readingTime'

describe(getReadingTimeMinutes, () => {
  it('returns 1 for empty string', () => {
    expect(getReadingTimeMinutes('')).toBe(1)
  })

  it('returns 1 for a short text', () => {
    expect(getReadingTimeMinutes('Hello world!')).toBe(1)
  })

  it('returns bigger numbers for longer texts', () => {
    expect(getReadingTimeMinutes('word '.repeat(1000))).toBeGreaterThan(1)
  })
})

describe(remarkReadingTime, () => {
  it('adds reading time to frontmatter', () => {
    const data = { astro: { frontmatter: {} } }
    remarkReadingTime()(null, { data })
    expect(data.astro.frontmatter).toHaveProperty('readingTime')
  })
})
