import { describe, expect, it } from 'vitest'
import { getReadingTimeMinutes } from '~/utils/blog/readingTime'

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
