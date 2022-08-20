const { sin, cos, acos, PI } = Math

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2

interface Pos3D {
  x: number
  y: number
  z: number
}

interface PerspectiveOptions {
  perspective: number
  cx: number
  cy: number
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

export function worldToCamera({ x, y, z }: Pos3D, { perspective, cx, cy }: PerspectiveOptions) {
  const scale = perspective / (perspective + z)
  return {
    scale,
    x: cx + x * scale,
    y: cy + y * scale,
  }
}

export const INITIAL_ROTATION_AXIS = { x: -Math.SQRT1_2, y: -Math.SQRT1_2, z: 0 }
