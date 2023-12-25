import { describe, it, expect } from 'vitest'

import {
  findRotation,
  initialPositionsOf,
  pointerToSpherePoint,
  rotateAroundUnitVector,
  worldToCamera,
} from '~/logic'

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
