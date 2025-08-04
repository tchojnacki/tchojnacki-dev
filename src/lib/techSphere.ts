const { sin, asin, cos, acos, PI } = Math

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2

interface Vec2D {
  x: number
  y: number
}

export const v2scale = (v: Vec2D, n: number): Vec2D => ({ x: v.x * n, y: v.y * n })

export const v2sub = (v: Vec2D, w: Vec2D): Vec2D => ({ x: v.x - w.x, y: v.y - w.y })

export const v2add = (v: Vec2D, w: Vec2D): Vec2D => ({ x: v.x + w.x, y: v.y + w.y })

export interface Vec3D {
  x: number
  y: number
  z: number
}

export const v3dot = (v: Vec3D, w: Vec3D): number => v.x * w.x + v.y * w.y + v.z * w.z

export const v3cross = (v: Vec3D, w: Vec3D): Vec3D => ({
  x: v.y * w.z - v.z * w.y,
  y: v.z * w.x - v.x * w.z,
  z: v.x * w.y - v.y * w.x,
})

export const v3len = (v: Vec3D) => Math.sqrt(v3dot(v, v))

export const v3scale = (v: Vec3D, n: number): Vec3D => ({ x: v.x * n, y: v.y * n, z: v.z * n })

export const v3add = (v: Vec3D, w: Vec3D): Vec3D => ({ x: v.x + w.x, y: v.y + w.y, z: v.z + w.z })

export const v3sub = (v: Vec3D, w: Vec3D): Vec3D => ({ x: v.x - w.x, y: v.y - w.y, z: v.z - w.z })

interface Projection {
  cameraZ: number
  canvasSize: number
}

export function rotateAroundUnitVector(pos: Vec3D, axis: Vec3D, angle: number) {
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

export const initialPositionsOf = <T>(items: readonly T[]) =>
  items.map((item, i) => {
    const theta = (2 * PI * i) / GOLDEN_RATIO
    const phi = acos(1 - (2 * (i + 0.5)) / items.length)

    return {
      item,
      position: {
        x: cos(theta) * sin(phi),
        y: sin(theta) * sin(phi),
        z: cos(phi),
      },
    }
  })

export function worldToCamera(
  { x, y, z }: Vec3D,
  { cameraZ, canvasSize }: Projection,
): Vec2D & { scale: number } {
  const scale = cameraZ / (cameraZ + z)
  return {
    scale,
    x: canvasSize / 2 + x * scale,
    y: canvasSize / 2 + y * scale,
  }
}

function cameraToWorld(
  { x, y }: Vec2D,
  targetZ: number,
  { cameraZ, canvasSize }: Projection,
): Vec3D {
  const scale = cameraZ / (cameraZ + targetZ)
  return {
    x: (x - canvasSize / 2) / scale,
    y: (y - canvasSize / 2) / scale,
    z: targetZ,
  }
}

export function pointerToSpherePoint(
  pointerPos: Vec2D,
  sphereRadius: number,
  projection: Projection,
): Vec3D {
  const start = cameraToWorld(pointerPos, projection.cameraZ, projection)
  const end = cameraToWorld(pointerPos, projection.cameraZ + 1, projection)
  const ray = v3sub(end, start)

  const a = v3dot(ray, ray)
  const c = v3dot(start, start) - sphereRadius * sphereRadius
  const b = v3dot(end, end) - a - c - sphereRadius * sphereRadius

  const deltaSqrt = Math.sqrt(b * b - 4 * a * c)
  if (deltaSqrt >= 0) {
    return v3add(start, v3scale(ray, (-b - deltaSqrt) / (2 * a)))
  }

  const point = v3add(start, v3scale(ray, -v3dot(start, ray) / a))
  return v3scale(point, sphereRadius / v3len(point))
}

export function findRotation(from: Vec3D, to: Vec3D) {
  const cross = v3cross(from, to)
  const len = v3len(cross)

  if (len < 0.0001) {
    return { axis: { x: 1, y: 0, z: 0 }, theta: 0 }
  }

  const theta = asin(len / (v3len(from) * v3len(to)))
  const axis = v3scale(cross, 1 / len)
  return { axis, theta }
}

export const INITIAL_ROTATION_AXIS = { x: -Math.SQRT1_2, y: -Math.SQRT1_2, z: 0 }
export const INITIAL_ROTATION_SPEED = 0.5
export const DAMPING_FACTOR = 0.5
