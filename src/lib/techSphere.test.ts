import { describe, expect, it } from 'vitest'

import {
  findRotation,
  initialPositionsOf,
  pointerToSpherePoint,
  rotateAroundUnitVector,
  v2add,
  v2scale,
  v2sub,
  v3add,
  v3cross,
  v3dot,
  v3len,
  v3scale,
  v3sub,
  worldToCamera,
} from '~/lib/techSphere'

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

describe(rotateAroundUnitVector, () => {
  it.each([
    [{ x: 1, y: 2, z: 3 }, { x: 1, y: 0, z: 0 }, 0, { x: 1, y: 2, z: 3 }],
    [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: -1 }, 123, { x: 0, y: 0, z: 0 }],
    [{ x: 4, y: 5, z: 6 }, { x: 0, y: 1, z: 0 }, Math.PI, { x: -4, y: 5, z: -6 }],
  ])('rotates %o around %o by %d', (pos, axis, angle, expected) => {
    const result = rotateAroundUnitVector(pos, axis, angle)
    expect(result.x).toBeCloseTo(expected.x)
    expect(result.y).toBeCloseTo(expected.y)
    expect(result.z).toBeCloseTo(expected.z)
  })
})

describe(initialPositionsOf, () => {
  it('returns empty result for empty input', () => {
    expect(initialPositionsOf([])).toStrictEqual([])
  })

  it('correctly positions one item', () => {
    const list = initialPositionsOf(['TEST'])
    expect(list).toHaveLength(1)
    const {
      item,
      position: { x, y, z },
    } = list[0]!
    expect(item).toBe('TEST')
    expect(x).toBeCloseTo(1)
    expect(y).toBeCloseTo(0)
    expect(z).toBeCloseTo(0)
  })
})

describe(worldToCamera, () => {
  it.each([
    [
      { x: 0, y: 0, z: 0 },
      { cameraZ: 1, canvasSize: 500 },
      { x: 250, y: 250, scale: 1 },
    ],
    [
      { x: 0, y: 0, z: 100 },
      { cameraZ: 200, canvasSize: 200 },
      { x: 100, y: 100, scale: 0.6666 },
    ],
  ])('translates coordinates %o to camera space using %o', (pos, projection, expected) => {
    const result = worldToCamera(pos, projection)
    expect(result.scale).toBeCloseTo(expected.scale)
    expect(result.x).toBeCloseTo(expected.x)
    expect(result.y).toBeCloseTo(expected.y)
  })
})

describe(pointerToSpherePoint, () => {
  it.each([
    [{ x: 64, y: 64 }, 50, { cameraZ: 100, canvasSize: 128 }, { x: 0, y: 0, z: -50 }],
    [{ x: 250, y: 250 }, 0.0001, { cameraZ: 5000, canvasSize: 250 }, { x: 0, y: 0, z: 0 }],
  ])(
    'translates pointer pos %o with sphere of radius %d and projection %o to a sphere point',
    (pointerPos, sphereRadius, projection, expected) => {
      const result = pointerToSpherePoint(pointerPos, sphereRadius, projection)
      expect(result.x).toBeCloseTo(expected.x)
      expect(result.y).toBeCloseTo(expected.y)
      expect(result.z).toBeCloseTo(expected.z)
    },
  )
})

describe(findRotation, () => {
  it.each([
    [{ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 }, 0],
    [{ x: 0, y: 13, z: 0 }, { x: 13, y: 0, z: 0 }, Math.PI / 2],
  ])('finds rotation from %o to %o', (from, to, theta) => {
    const found = findRotation(from, to)
    expect(found.theta).toBeCloseTo(theta)
    expect(found.axis).toBeInstanceOf(Object)
  })
})
