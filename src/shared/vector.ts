export interface Pos3D {
  x: number
  y: number
  z: number
}

export const vdot = (v: Pos3D, w: Pos3D): number => v.x * w.x + v.y * w.y + v.z * w.z

export const vcross = (v: Pos3D, w: Pos3D): Pos3D => ({
  x: v.y * w.z - v.z * w.y,
  y: v.z * w.x - v.x * w.z,
  z: v.x * w.y - v.y * w.x,
})

export const vlen = (v: Pos3D) => Math.sqrt(vdot(v, v))

export const vscale = (v: Pos3D, n: number): Pos3D => ({ x: v.x * n, y: v.y * n, z: v.z * n })

export const vadd = (v: Pos3D, w: Pos3D): Pos3D => ({ x: v.x + w.x, y: v.y + w.y, z: v.z + w.z })

export const vsub = (v: Pos3D, w: Pos3D): Pos3D => ({ x: v.x - w.x, y: v.y - w.y, z: v.z - w.z })
