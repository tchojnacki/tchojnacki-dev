import clamp from 'lodash/clamp'
import { useEffect, useMemo, useRef } from 'react'

import { TECH_SPHERE_SKILL_NAMES } from 'data'
import { useAnimationFrame, useParentSize, usePrefersReducedMotion } from 'hooks'
import {
  INITIAL_ROTATION_AXIS,
  Pos3D,
  findRotation,
  initialPositionsOf,
  pointerToSpherePoint,
  rotateAroundUnitVector,
  vscale,
  worldToCamera,
} from 'shared'

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
  const dragStartPosRef = useRef<Pos3D | null>(null)

  const omegaRef = useRef(0)
  const thetaRef = useRef(0)
  const axisRef = useRef(INITIAL_ROTATION_AXIS)

  useEffect(() => {
    omegaRef.current = prefersReducedMotion ? 0 : 0.5
  }, [prefersReducedMotion])

  useEffect(() => {
    function moveHandler(event: PointerEvent) {
      const rect = canvasRef.current!.getBoundingClientRect()
      hoverPosRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }

      if (dragStartPosRef.current) {
        const end = pointerToSpherePoint(hoverPosRef.current, sphereRadius, projection)
        const { axis, theta } = findRotation(dragStartPosRef.current, end)
        axisRef.current = axis
        thetaRef.current = theta
      }
    }

    function mouseDownHandler() {
      dragStartPosRef.current = pointerToSpherePoint(hoverPosRef.current, sphereRadius, projection)
      pointsRef.current = pointsRef.current.map(({ item, position }) => ({
        item,
        position: rotateAroundUnitVector(position, axisRef.current, thetaRef.current),
      }))

      omegaRef.current = 0
      thetaRef.current = 0
    }

    function upHandler() {
      dragStartPosRef.current = null
      omegaRef.current = 1
    }

    function touchStartHandler(event: TouchEvent) {
      event.preventDefault()
      mouseDownHandler()
    }

    const target = canvasRef.current
    if (target) {
      target.addEventListener('pointermove', moveHandler)
      target.addEventListener('mousedown', mouseDownHandler)
      target.addEventListener('pointerup', upHandler)
      target.addEventListener('pointerleave', upHandler)
      target.addEventListener('touchstart', touchStartHandler)
      return () => {
        target.removeEventListener('pointermove', moveHandler)
        target.removeEventListener('mousedown', mouseDownHandler)
        target.removeEventListener('pointerup', upHandler)
        target.removeEventListener('pointerleave', upHandler)
        target.removeEventListener('touchstart', touchStartHandler)
      }
    }
  }, [canvasRef, projection, sphereRadius])

  useAnimationFrame(deltaTime => {
    thetaRef.current += omegaRef.current * deltaTime

    if (ctx) {
      ctx.clearRect(0, 0, canvasSize, canvasSize)

      ctx.fillStyle = 'currentColor'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `${Math.round(canvasSize * 0.05)}px Inter`

      for (const { item, position } of pointsRef.current) {
        const scaled = vscale(position, sphereRadius)
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
    />
  )
}
