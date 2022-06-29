import times from 'lodash/times'

const { sin, cos, PI } = Math

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2

interface Pos3D {
  x: number
  y: number
  z: number
}

export const rotateY = ({ x, y, z }: Pos3D, alpha: number): Pos3D => ({
  x: x * cos(alpha) + z * sin(alpha),
  y: y,
  z: -x * sin(alpha) + z * cos(alpha),
})

export const initialPositions = (n: number) => {
  const positions = times(n, i => {
    const theta = (2 * PI * i) / GOLDEN_RATIO
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n)

    return {
      x: cos(theta) * sin(phi),
      y: sin(theta) * sin(phi),
      z: cos(phi),
    }
  })

  positions.sort((a, b) => b.z - a.z)

  return positions
}

export const posToTransform = ({ x, y, z }: Pos3D, size: number): string => {
  const scale = (dim: number) => Math.round(((size / 2) * dim + size / 2) * 100) / 100

  return `translate3D(${scale(x)}px, ${scale(y)}px, ${scale(z)}px)`
}
