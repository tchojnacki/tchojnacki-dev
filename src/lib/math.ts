import { clamp } from "lodash-es"

export function lerpUnbound(
  x: number,
  [inMin, inMax]: [number, number],
  [outMin, outMax]: [number, number],
): number {
  return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function lerp(x: number, [inMin, inMax]: [number, number], out: [number, number]): number {
  return lerpUnbound(clamp(x, inMin, inMax), [inMin, inMax], out)
}

export const cumSum = (arr: number[]) =>
  arr.slice(0, -1).reduce((acc, v) => [...acc, (acc[acc.length - 1] ?? 0) + v], [0])
