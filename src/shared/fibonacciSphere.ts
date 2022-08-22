import { Pos2D, Pos3D, v3add, v3scale, v3sub, vcross, vdot, vlen } from './vector'

const { sin, asin, cos, acos, PI } = Math

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2

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

export function pointerToSpherePoint(
  pointerPos: Pos2D,
  sphereRadius: number,
  projection: Projection
): Pos3D {
  const start = cameraToWorld(pointerPos, projection.cameraZ, projection)
  const end = cameraToWorld(pointerPos, projection.cameraZ + 1, projection)
  const ray = v3sub(end, start)

  const a = vdot(ray, ray)
  const c = vdot(start, start) - sphereRadius * sphereRadius
  const b = vdot(end, end) - a - c - sphereRadius * sphereRadius

  const deltaSqrt = Math.sqrt(b * b - 4 * a * c)
  if (deltaSqrt >= 0) {
    return v3add(start, v3scale(ray, (-b - deltaSqrt) / (2 * a)))
  }

  const point = v3add(start, v3scale(ray, -vdot(start, ray) / a))
  return v3scale(point, sphereRadius / vlen(point))
}

export function findRotation(from: Pos3D, to: Pos3D) {
  const cross = vcross(from, to)
  const len = vlen(cross)

  if (len < 0.0001) {
    return { axis: { x: 1, y: 0, z: 0 }, theta: 0 }
  }

  const theta = asin(len / (vlen(from) * vlen(to)))
  const axis = v3scale(cross, 1 / len)
  return { axis, theta }
}

export const INITIAL_ROTATION_AXIS = { x: -Math.SQRT1_2, y: -Math.SQRT1_2, z: 0 }
export const INITIAL_ROTATION_SPEED = 0.5
export const DAMPING_FACTOR = 0.5
