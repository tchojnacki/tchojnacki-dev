const { sin, asin, cos, acos, PI } = Math

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2

export interface Pos3D {
  x: number
  y: number
  z: number
}

interface Pos2D {
  x: number
  y: number
}

interface Projection {
  cameraZ: number
  canvasSize: number
}

export function rotateAroundUnitVector(pos: Pos3D, axis: Pos3D, angle: number) {
  const { x, y, z } = axis
  const a = sin(angle)
  const b = cos(angle)
  const c = 1 - b

  return {
    x: pos.x * (b + x * x * c) + pos.y * (x * y * c - z * a) + pos.z * (x * z * c + y * a),
    y: pos.x * (y * x * c + z * a) + pos.y * (b + y * y * c) + pos.z * (y * z * c - x * a),
    z: pos.x * (z * x * c - y * a) + pos.y * (z * y * c + x * a) + pos.z * (b + z * z * c),
  }
}

export const initialPositionsOf = <T>(items: readonly T[], radius: number = 1) =>
  items.map((item, i) => {
    const theta = (2 * PI * i) / GOLDEN_RATIO
    const phi = acos(1 - (2 * (i + 0.5)) / items.length)

    return {
      item,
      position: {
        x: cos(theta) * sin(phi) * radius,
        y: sin(theta) * sin(phi) * radius,
        z: cos(phi) * radius,
      },
    }
  })

export function worldToCamera(
  { x, y, z }: Pos3D,
  { cameraZ, canvasSize }: Projection
): Pos2D & { scale: number } {
  const scale = cameraZ / (cameraZ + z)
  return {
    scale,
    x: canvasSize / 2 + x * scale,
    y: canvasSize / 2 + y * scale,
  }
}

function cameraToWorld(
  { x, y }: Pos2D,
  targetZ: number,
  { cameraZ, canvasSize }: Projection
): Pos3D {
  const scale = cameraZ / (cameraZ + targetZ)
  return {
    x: (x - canvasSize / 2) / scale,
    y: (y - canvasSize / 2) / scale,
    z: targetZ,
  }
}

const Vec = Object.freeze({
  dot: (v: Pos3D, w: Pos3D): number => v.x * w.x + v.y * w.y + v.z * w.z,
  cross: (v: Pos3D, w: Pos3D): Pos3D => ({
    x: v.y * w.z - v.z * w.y,
    y: v.z * w.x - v.x * w.z,
    z: v.x * w.y - v.y * w.x,
  }),
  len: (v: Pos3D) => Math.sqrt(Vec.dot(v, v)),
  scale: (v: Pos3D, n: number): Pos3D => ({ x: v.x * n, y: v.y * n, z: v.z * n }),
  add: (v: Pos3D, w: Pos3D): Pos3D => ({ x: v.x + w.x, y: v.y + w.y, z: v.z + w.z }),
  sub: (v: Pos3D, w: Pos3D): Pos3D => ({ x: v.x - w.x, y: v.y - w.y, z: v.z - w.z }),
})

export function pointerToSpherePoint(
  pointerPos: Pos2D,
  sphereRadius: number,
  projection: Projection
): Pos3D {
  const start = cameraToWorld(pointerPos, projection.cameraZ, projection)
  const end = cameraToWorld(pointerPos, projection.cameraZ + 1, projection)
  const ray = Vec.sub(end, start)

  const a = Vec.dot(ray, ray)
  const c = Vec.dot(start, start) - sphereRadius * sphereRadius
  const b = Vec.dot(end, end) - a - c - sphereRadius * sphereRadius

  const deltaSqrt = Math.sqrt(b * b - 4 * a * c)
  if (deltaSqrt >= 0) {
    return Vec.add(start, Vec.scale(ray, (-b - deltaSqrt) / (2 * a)))
  }

  const point = Vec.add(start, Vec.scale(ray, -Vec.dot(start, ray) / a))
  return Vec.scale(point, sphereRadius / Vec.len(point))
}

export function findRotation(from: Pos3D, to: Pos3D) {
  const cross = Vec.cross(from, to)
  const len = Vec.len(cross)

  if (len < 0.0001) {
    return { axis: { x: 1, y: 0, z: 0 }, theta: 0 }
  }

  const theta = asin(len / (Vec.len(from) * Vec.len(to)))
  const axis = Vec.scale(cross, 1 / len)
  return { axis, theta }
}

export const INITIAL_ROTATION_AXIS = { x: -Math.SQRT1_2, y: -Math.SQRT1_2, z: 0 }
