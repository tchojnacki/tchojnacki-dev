import { clamp } from "lodash-es"
import { useEffect, useRef, type PointerEvent, type TouchEvent } from "react"

import {
  DAMPING_FACTOR,
  findRotation,
  INITIAL_ROTATION_AXIS,
  INITIAL_ROTATION_SPEED,
  initialPositionsOf,
  pointerToSpherePoint,
  rotateAroundUnitVector,
  v2add,
  v2scale,
  v2sub,
  v3scale,
  worldToCamera,
  type Vec3D,
} from "~/lib/techSphere"

import { useAnimationFrame } from "./useAnimationFrame"
import { useParentSize } from "./useParentSize"

const FONT_SCALE = 0.05

type UseTechSphereParams = {
  skillNames: string[]
  prefersReducedMotion?: boolean
}

export function useTechSphere({ skillNames, prefersReducedMotion = false }: UseTechSphereParams) {
  const { width, height, childRef: canvasRef } = useParentSize<HTMLCanvasElement>()
  const canvasSize = clamp(Math.min(width, height) - 50, 200, 450)
  const projection = { canvasSize, cameraZ: 2 * canvasSize }
  const sphereRadius = canvasSize * 0.35
  const pointsRef = useRef(initialPositionsOf(skillNames))

  const hoverPosRef = useRef({ x: 0, y: 0 })
  const lastMoveTimeStampRef = useRef(0)
  const dragStartPosRef = useRef<Vec3D | null>(null)
  const dragPixelsPerMsRef = useRef({ x: 0, y: 0 })
  const movementStateRef = useRef<"STABLE" | "DAMPING">("STABLE")

  const omegaRef = useRef(0)
  const thetaRef = useRef(0)
  const axisRef = useRef(INITIAL_ROTATION_AXIS)

  useEffect(() => {
    omegaRef.current = prefersReducedMotion ? 0 : INITIAL_ROTATION_SPEED
  }, [prefersReducedMotion])

  // eslint-disable-next-line react-hooks/immutability -- false positive
  useAnimationFrame(dt => {
    let epsilon: number
    switch (movementStateRef.current) {
      case "STABLE":
        epsilon = 0
        break
      case "DAMPING":
        epsilon = -DAMPING_FACTOR * omegaRef.current
        if (Math.abs(omegaRef.current) < 0.01) {
          pointsRef.current = pointsRef.current.map(({ item, position }) => ({
            item,
            position: rotateAroundUnitVector(position, axisRef.current, thetaRef.current),
          }))
          thetaRef.current = 0
          axisRef.current = INITIAL_ROTATION_AXIS
          omegaRef.current = INITIAL_ROTATION_SPEED
          epsilon = 0
          movementStateRef.current = "STABLE"
        }
        break
    }

    omegaRef.current += epsilon * dt
    thetaRef.current += omegaRef.current * dt

    if (canvasRef.current === null) return
    const ctx = canvasRef.current.getContext("2d")
    if (ctx === null) return
    ctx.clearRect(0, 0, canvasSize, canvasSize)

    ctx.fillStyle = getComputedStyle(canvasRef.current).color
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = `${Math.ceil(canvasSize * FONT_SCALE)}px sans-serif`

    for (const { item, position } of pointsRef.current) {
      const scaled = v3scale(position, sphereRadius)
      const rotated = rotateAroundUnitVector(scaled, axisRef.current, thetaRef.current)
      const projected = worldToCamera(rotated, projection)

      ctx.save()
      ctx.translate(projected.x, projected.y)
      ctx.scale(projected.scale, projected.scale)
      ctx.globalAlpha = (sphereRadius - rotated.z) / (2 * sphereRadius)
      ctx.fillText(item, 0, 0)
      ctx.restore()
    }
  })

  function handlePointerDown() {
    dragStartPosRef.current = pointerToSpherePoint(hoverPosRef.current, sphereRadius, projection)
    pointsRef.current = pointsRef.current.map(({ item, position }) => ({
      item,
      position: rotateAroundUnitVector(position, axisRef.current, thetaRef.current),
    }))
    omegaRef.current = 0
    thetaRef.current = 0
  }

  function handlePointerUp() {
    if (dragStartPosRef.current === null) return
    dragStartPosRef.current = null

    const before = pointerToSpherePoint(
      v2sub(hoverPosRef.current, v2scale(dragPixelsPerMsRef.current, 0.5)),
      sphereRadius,
      projection,
    )
    const after = pointerToSpherePoint(
      v2add(hoverPosRef.current, v2scale(dragPixelsPerMsRef.current, 0.5)),
      sphereRadius,
      projection,
    )

    const { theta } = findRotation(before, after)
    omegaRef.current = theta * 1000
    movementStateRef.current = "DAMPING"
  }

  function handlePointerMove(event: PointerEvent) {
    const now = Date.now()
    const deltaTime = now - lastMoveTimeStampRef.current
    lastMoveTimeStampRef.current = now

    const { offsetX, offsetY } = event.nativeEvent

    dragPixelsPerMsRef.current = {
      x: (offsetX - hoverPosRef.current.x) / deltaTime,
      y: (offsetY - hoverPosRef.current.y) / deltaTime,
    }

    hoverPosRef.current = { x: offsetX, y: offsetY }

    if (dragStartPosRef.current === null) return
    const end = pointerToSpherePoint(hoverPosRef.current, sphereRadius, projection)
    const { axis, theta } = findRotation(dragStartPosRef.current, end)
    axisRef.current = axis
    thetaRef.current = theta
  }

  return {
    canvasRef,
    canvasSize,
    handlers: {
      onMouseDown: handlePointerDown,
      onTouchStart: (e: TouchEvent) => {
        e.preventDefault()
        handlePointerDown()
      },
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp,
      onPointerMove: handlePointerMove,
    },
  }
}
