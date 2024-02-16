export function clamp(x: number, min: number, max: number): number {
  return Math.min(Math.max(x, min), max)
}

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
