export interface Pos2D {
  x: number
  y: number
}

export const v2scale = (v: Pos2D, n: number): Pos2D => ({ x: v.x * n, y: v.x * n })

export const v2sub = (v: Pos2D, w: Pos2D): Pos2D => ({ x: v.x - w.x, y: v.y - w.y })

export const v2add = (v: Pos2D, w: Pos2D): Pos2D => ({ x: v.x + w.x, y: v.y + w.y })

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

export const v3scale = (v: Pos3D, n: number): Pos3D => ({ x: v.x * n, y: v.y * n, z: v.z * n })

export const v3add = (v: Pos3D, w: Pos3D): Pos3D => ({ x: v.x + w.x, y: v.y + w.y, z: v.z + w.z })

export const v3sub = (v: Pos3D, w: Pos3D): Pos3D => ({ x: v.x - w.x, y: v.y - w.y, z: v.z - w.z })
