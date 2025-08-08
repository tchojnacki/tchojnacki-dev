import { mean } from 'lodash-es'
import { describe, expect, it } from 'vitest'

import { lerp, lerpUnbound } from '~/lib/math'

describe(lerpUnbound, () => {
  it.each([-20, -5, -2, 0, 1.5, 3.14, 4.5, 10])(
    'returns the same input (%d) if ranges are equal',
    value => {
      const range = [-5, 4.5] as [number, number]

      expect(lerpUnbound(value, range, range)).toBeCloseTo(value)
    },
  )

  it('returns min if input is min', () => {
    expect(lerpUnbound(0, [0, 1], [200, 300])).toBeCloseTo(200)
    expect(lerpUnbound(-21, [-21, -20], [5, 10])).toBeCloseTo(5)
    expect(lerpUnbound(3.1, [3.1, 3.2], [10, -1])).toBeCloseTo(10)
  })

  it('returns max if input is max', () => {
    expect(lerpUnbound(3, [0, 3], [1, 1])).toBeCloseTo(1)
    expect(lerpUnbound(-8, [-20, -8], [5, 10])).toBeCloseTo(10)
    expect(lerpUnbound(1.5, [5, 1.5], [5, -2])).toBeCloseTo(-2)
  })

  it.each([
    [1, 3, 5, 8],
    [-2, 5, 3, -1.5],
    [8, 16, 0.5, 1],
  ])(
    'returns mean of new range if input is mean of old range (%o)',
    (inMin, inMax, outMin, outMax) => {
      const inp = [inMin, inMax] as [number, number]
      const out = [outMin, outMax] as [number, number]
      expect(lerpUnbound(mean(inp), inp, out)).toBeCloseTo(mean(out))
    },
  )
})

describe(lerp, () => {
  it.each([
    [5, [0, 10], [0, 100]],
    [3.14, [0, 10], [-5, -10]],
    [-2, [-10, 10], [0, 1]],
  ] as [number, [number, number], [number, number]][])(
    'works same as lerpUnbound for values in range',
    (value, inp, out) => {
      expect(lerp(value, inp, out)).toBeCloseTo(lerpUnbound(value, inp, out))
    },
  )

  it('bounds a smaller value to min', () => {
    expect(lerp(-1, [0, 10], [0, 100])).toBeCloseTo(0)
    expect(lerp(-5, [3, 4], [5, -5])).toBeCloseTo(5)
  })

  it('bounds a larger value to max', () => {
    expect(lerp(11, [0, 10], [0, 100])).toBeCloseTo(100)
    expect(lerp(5, [3, 4], [5, -5])).toBeCloseTo(-5)
  })
})
