import { describe, it, expect } from 'vitest'
import { v2scale, v2sub, v2add, v3dot, v3cross, v3len, v3scale, v3add, v3sub } from '~/logic/vector'

describe(v2scale, () => {
  it.each([
    [{ x: 1, y: 2 }, 2, { x: 2, y: 4 }],
    [{ x: 0, y: 0 }, -100, { x: 0, y: 0 }],
    [{ x: 1, y: 2 }, 0, { x: 0, y: 0 }],
    [{ x: 1, y: 2 }, 0.5, { x: 0.5, y: 1 }],
  ])('scales %o by %d', (v, n, expected) => {
    const result = v2scale(v, n)
    expect(result.x).toBeCloseTo(expected.x)
    expect(result.y).toBeCloseTo(expected.y)
  })
})

describe(v2sub, () => {
  it.each([
    [
      { x: 1, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 0 },
    ],
    [
      { x: 5, y: 5 },
      { x: 0, y: 0 },
      { x: 5, y: 5 },
    ],
    [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: -1, y: 1 },
    ],
  ])('subtracts %o from %o', (v, w, expected) => {
    const result = v2sub(v, w)
    expect(result.x).toBeCloseTo(expected.x)
    expect(result.y).toBeCloseTo(expected.y)
  })
})

describe(v2add, () => {
  it.each([
    [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 4, y: 6 },
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    [
      { x: -Math.PI, y: 2 },
      { x: Math.PI, y: 3 },
      { x: 0, y: 5 },
    ],
  ])('adds %o to %o', (v, w, expected) => {
    const result = v2add(v, w)
    expect(result.x).toBeCloseTo(expected.x)
    expect(result.y).toBeCloseTo(expected.y)
  })
})

describe(v3dot, () => {
  it.each([
    [{ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 }, 14],
    [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, 0],
    [{ x: 1, y: 2, z: 3 }, { x: 0, y: 0, z: 0 }, 0],
    [{ x: -5, y: 6, z: -3 }, { x: 4, y: 2, z: 1 }, -11],
  ])('computes dot product between %o and %o', (v, w, expected) => {
    expect(v3dot(v, w)).toBeCloseTo(expected)
  })
})

describe(v3cross, () => {
  it.each([
    [
      { x: 1, y: 2, z: 3 },
      { x: 1, y: 2, z: 3 },
      { x: 0, y: 0, z: 0 },
    ],
    [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ],
    [
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 0, z: 1 },
    ],
    [
      { x: 1, y: 2, z: 3 },
      { x: 4, y: 5, z: 6 },
      { x: -3, y: 6, z: -3 },
    ],
  ])('computes dot product between %o and %o', (v, w, expected) => {
    const result = v3cross(v, w)
    expect(result.x).toBeCloseTo(expected.x)
    expect(result.y).toBeCloseTo(expected.y)
    expect(result.z).toBeCloseTo(expected.z)
  })
})

describe(v3len, () => {
  it.each([
    [{ x: 1, y: 2, z: 3 }, Math.sqrt(14)],
    [{ x: 0, y: 0, z: 0 }, 0],
    [{ x: -100, y: 0, z: 0 }, 100],
    [{ x: 1, y: 1, z: 1 }, Math.sqrt(3)],
  ])('returns length of %o', (v, expected) => {
    expect(v3len(v)).toBeCloseTo(expected)
  })
})

describe(v3scale, () => {
  it.each([
    [{ x: 1, y: 2, z: 3 }, 2, { x: 2, y: 4, z: 6 }],
    [{ x: 0, y: 0, z: 0 }, -Math.E, { x: 0, y: 0, z: 0 }],
    [{ x: 1, y: 2, z: 3 }, 0.5, { x: 0.5, y: 1, z: 1.5 }],
    [{ x: 15, y: -7, z: 3 }, 0, { x: 0, y: 0, z: 0 }],
  ])('scales %o by %d', (v, n, expected) => {
    const result = v3scale(v, n)
    expect(result.x).toBeCloseTo(expected.x)
    expect(result.y).toBeCloseTo(expected.y)
    expect(result.z).toBeCloseTo(expected.z)
  })
})

describe(v3add, () => {
  it.each([
    [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ],
    [
      { x: 3, y: -7, z: 0 },
      { x: 5, y: 0, z: -3 },
      { x: 8, y: -7, z: -3 },
    ],
  ])('adds %o to %o', (v, w, expected) => {
    const result = v3add(v, w)
    expect(result.x).toBeCloseTo(expected.x)
    expect(result.y).toBeCloseTo(expected.y)
    expect(result.z).toBeCloseTo(expected.z)
  })
})

describe(v3sub, () => {
  it.each([
    [
      { x: 3, y: -7, z: 0 },
      { x: 5, y: 0, z: -3 },
      { x: -2, y: -7, z: 3 },
    ],
    [
      { x: -3.5, y: 0, z: 5.15 },
      { x: 0, y: 0, z: 0 },
      { x: -3.5, y: 0, z: 5.15 },
    ],
  ])('subtracts %o from %o', (v, w, expected) => {
    const result = v3sub(v, w)
    expect(result.x).toBeCloseTo(expected.x)
    expect(result.y).toBeCloseTo(expected.y)
    expect(result.z).toBeCloseTo(expected.z)
  })
})
