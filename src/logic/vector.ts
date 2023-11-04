export interface Vec2D {
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
