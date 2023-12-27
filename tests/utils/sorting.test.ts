import { describe, expect, it } from 'vitest'
import { keyComparator } from '~/utils/sorting'

describe(keyComparator, () => {
  it('works with identity function', () => {
    expect([3, 5, 1].sort(keyComparator(x => x))).toStrictEqual([1, 3, 5])
  })

  it('works with string properties', () => {
    expect(
      [{ v: 'abc' }, { v: 'aaa' }, { v: 'other' }].sort(keyComparator(x => x.v)),
    ).toStrictEqual([{ v: 'aaa' }, { v: 'abc' }, { v: 'other' }])
  })

  it('works with numeric properties', () => {
    expect([{ cost: 3 }, { cost: 1 }].sort(keyComparator(x => x.cost))).toStrictEqual([
      { cost: 1 },
      { cost: 3 },
    ])
  })

  it('sorts in descending order', () => {
    expect([1, 6, 3, 2].sort(keyComparator(x => x, true))).toStrictEqual([6, 3, 2, 1])
  })
})
