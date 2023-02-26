import useEvent from '@use-it/event-listener'
import clamp from 'lodash/clamp'
import { useEffect, useMemo, useRef } from 'react'

import { TECH_SPHERE_SKILL_NAMES } from 'data'
import {
  useAnimationFrame,
  useParentSize,
  usePointerStart,
  usePointerStop,
  usePrefersReducedMotion,
} from 'hooks'
import {
  DAMPING_FACTOR,
  INITIAL_ROTATION_AXIS,
  INITIAL_ROTATION_SPEED,
  Vec3D,
  findRotation,
  initialPositionsOf,
  pointerToSpherePoint,
  rotateAroundUnitVector,
  v2add,
  v2scale,
  v2sub,
  v3scale,
  worldToCamera,
} from 'logic'

const FONT_SCALE = 0.05

export function TechSphere() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { width, height, childRef: canvasRef } = useParentSize<HTMLCanvasElement>()
  const canvasSize = clamp(Math.min(width, height) - 50, 200, 450)
  const cameraZ = 2 * canvasSize
  const projection = useMemo(() => ({ cameraZ, canvasSize }), [cameraZ, canvasSize])
  const sphereRadius = canvasSize * 0.35
  const pointsRef = useRef(initialPositionsOf(TECH_SPHERE_SKILL_NAMES))

  const ctx = canvasRef.current?.getContext('2d')

  const hoverPosRef = useRef({ x: 0, y: 0 })
  const lastMoveTimeStampRef = useRef(Date.now())
  const dragStartPosRef = useRef<Vec3D | null>(null)
  const dragPixelsPerMsRef = useRef({ x: 0, y: 0 })
  const movementStateRef = useRef<'STABLE' | 'DAMPING'>('STABLE')

  const omegaRef = useRef(0)
  const thetaRef = useRef(0)
  const axisRef = useRef(INITIAL_ROTATION_AXIS)

  useEffect(() => {
    omegaRef.current = prefersReducedMotion ? 0 : INITIAL_ROTATION_SPEED
  }, [prefersReducedMotion])

  usePointerStart(canvasRef, () => {
    dragStartPosRef.current = pointerToSpherePoint(hoverPosRef.current, sphereRadius, projection)
    pointsRef.current = pointsRef.current.map(({ item, position }) => ({
      item,
      position: rotateAroundUnitVector(position, axisRef.current, thetaRef.current),
    }))

    omegaRef.current = 0
    thetaRef.current = 0
  })

  usePointerStop(canvasRef, () => {
    if (dragStartPosRef.current !== null) {
      dragStartPosRef.current = null

      const before = pointerToSpherePoint(
        v2sub(hoverPosRef.current, v2scale(dragPixelsPerMsRef.current, 0.5)),
        sphereRadius,
        projection
      )
      const after = pointerToSpherePoint(
        v2add(hoverPosRef.current, v2scale(dragPixelsPerMsRef.current, 0.5)),
        sphereRadius,
        projection
      )

      const { theta } = findRotation(before, after)
      omegaRef.current = theta * 1000
      movementStateRef.current = 'DAMPING'
    }
  })

  useEvent(
    'pointermove',
    (event: PointerEvent) => {
      const now = Date.now()
      const deltaTime = now - lastMoveTimeStampRef.current
      lastMoveTimeStampRef.current = now

      dragPixelsPerMsRef.current = {
        x: (event.offsetX - hoverPosRef.current.x) / deltaTime,
        y: (event.offsetY - hoverPosRef.current.y) / deltaTime,
      }

      hoverPosRef.current = { x: event.offsetX, y: event.offsetY }

      if (dragStartPosRef.current) {
        const end = pointerToSpherePoint(hoverPosRef.current, sphereRadius, projection)
        const { axis, theta } = findRotation(dragStartPosRef.current, end)
        axisRef.current = axis
        thetaRef.current = theta
      }
    },
    canvasRef.current
  )

  useAnimationFrame(deltaTime => {
    let epsilon: number
    if (movementStateRef.current === 'STABLE') {
      epsilon = 0
    } else if (movementStateRef.current === 'DAMPING') {
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

        movementStateRef.current = 'STABLE'
      }
    } else {
      throw new Error('Unreachable state!')
    }

    omegaRef.current += epsilon * deltaTime
    thetaRef.current += omegaRef.current * deltaTime

    if (canvasRef.current && ctx) {
      ctx.clearRect(0, 0, canvasSize, canvasSize)

      ctx.fillStyle = getComputedStyle(canvasRef.current).color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `${Math.round(canvasSize * FONT_SCALE)}px Inter`

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
    }
  })

  return (
    <canvas
      className="touch-none cursor-grab active:cursor-grabbing select-none"
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      data-testid="tech-sphere"
    />
  )
}
