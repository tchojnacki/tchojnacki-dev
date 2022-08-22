import {
  findRotation,
  pointerToSpherePoint,
  rotateAroundUnitVector,
  worldToCamera,
} from 'logic/techSphere'

describe('rotateAroundUnitVector', () => {
  it.each([
    [{ x: 1, y: 2, z: 3 }, { x: 1, y: 0, z: 0 }, 0, { x: 1, y: 2, z: 3 }],
    [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: -1 }, 123, { x: 0, y: 0, z: 0 }],
    [{ x: 4, y: 5, z: 6 }, { x: 0, y: 1, z: 0 }, Math.PI, { x: -4, y: 5, z: -6 }],
  ])('rotates %i around %i by %i', (pos, axis, angle, result) => {
    expect(rotateAroundUnitVector(pos, axis, angle)).toEqual({
      x: expect.closeTo(result.x, 3),
      y: expect.closeTo(result.y, 3),
      z: expect.closeTo(result.z, 3),
    })
  })
})

describe('worldToCamera', () => {
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
  ])('translates coordinates %i to camera space using %i', (pos, projection, result) => {
    expect(worldToCamera(pos, projection)).toEqual({
      scale: expect.closeTo(result.scale, 3),
      x: expect.closeTo(result.x, 3),
      y: expect.closeTo(result.y, 3),
    })
  })
})

describe('pointerToSpherePoint', () => {
  it.each([
    [{ x: 64, y: 64 }, 50, { cameraZ: 100, canvasSize: 128 }, { x: 0, y: 0, z: -50 }],
    [{ x: 250, y: 250 }, 0.0001, { cameraZ: 5000, canvasSize: 250 }, { x: 0, y: 0, z: 0 }],
  ])(
    'translates pointer pos %i with sphere of radius %i and projection %i to a sphere point',
    (pointerPos, sphereRadius, projection, result) => {
      expect(pointerToSpherePoint(pointerPos, sphereRadius, projection)).toEqual({
        x: expect.closeTo(result.x, 3),
        y: expect.closeTo(result.y, 3),
        z: expect.closeTo(result.z, 3),
      })
    }
  )
})

describe('findRotation', () => {
  it.each([
    [{ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 }, 0],
    [{ x: 0, y: 13, z: 0 }, { x: 13, y: 0, z: 0 }, Math.PI / 2],
  ])('finds rotation from %i to %i', (from, to, theta) => {
    expect(findRotation(from, to)).toEqual({
      theta: expect.closeTo(theta, 3),
      axis: expect.any(Object),
    })
  })
})
