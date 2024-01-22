import clsx from 'clsx'
import clamp from 'lodash/clamp'
import { useEffect, useMemo, useRef } from 'react'

import {
  useAnimationFrame,
  useEventListener,
  useIsMounted,
  useParentSize,
  usePointerStart,
  usePointerStop,
  usePrefersReducedMotion,
} from '~/hooks'
import { type Vec3D, v2add, v2scale, v2sub, v3scale } from '~/logic/vector'
import {
  DAMPING_FACTOR,
  INITIAL_ROTATION_AXIS,
  INITIAL_ROTATION_SPEED,
  findRotation,
  initialPositionsOf,
  pointerToSpherePoint,
  rotateAroundUnitVector,
  worldToCamera,
} from '~/logic/techSphere'

const FONT_SCALE = 0.05

interface TechSphereProps {
  skillNames: string[]
}

export default function TechSphere({ skillNames }: TechSphereProps) {
  const isMounted = useIsMounted()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { width, height, childRef: canvasRef } = useParentSize<HTMLCanvasElement>()
  const canvasSize = clamp(Math.min(width, height) - 50, 200, 450)
  const cameraZ = 2 * canvasSize
  const projection = useMemo(() => ({ cameraZ, canvasSize }), [cameraZ, canvasSize])
  const sphereRadius = canvasSize * 0.35
  const pointsRef = useRef(initialPositionsOf(skillNames))

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
        projection,
      )
      const after = pointerToSpherePoint(
        v2add(hoverPosRef.current, v2scale(dragPixelsPerMsRef.current, 0.5)),
        sphereRadius,
        projection,
      )

      const { theta } = findRotation(before, after)
      omegaRef.current = theta * 1000
      movementStateRef.current = 'DAMPING'
    }
  })

  useEventListener(canvasRef, 'pointermove', (event: PointerEvent) => {
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
  })

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
    }
  })

  return (
    <canvas
      role="presentation"
      className={clsx(
        'cursor-grab touch-none select-none active:cursor-grabbing',
        isMounted
          ? 'animate-enteronload opacity-100 onenter-fromright motion-reduce:animate-none'
          : 'opacity-0',
      )}
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      data-testid="tech-sphere"
    />
  )
}
