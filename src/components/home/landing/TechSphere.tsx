import clamp from 'lodash/clamp'
import { useRef } from 'react'

import { TECH_SPHERE_SKILL_NAMES } from 'data'
import { useAnimationFrame, useParentSize, usePrefersReducedMotion } from 'hooks'
import {
  INITIAL_ROTATION_AXIS,
  initialPositionsOf,
  rotateAroundUnitVector,
  worldToCamera,
} from 'shared'

export function TechSphere() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { width, height, childRef: canvasRef } = useParentSize<HTMLCanvasElement>()
  const size = clamp(Math.min(width, height) - 50, 200, 450)
  const projection = { perspective: 2 * size, cx: size / 2, cy: size / 2 }
  const sphereRadius = size * 0.35
  const points = initialPositionsOf(TECH_SPHERE_SKILL_NAMES, sphereRadius)

  const context = canvasRef.current?.getContext('2d')

  const omega = prefersReducedMotion ? 0 : 0.5
  const thetaRef = useRef(0)
  const axisRef = useRef(INITIAL_ROTATION_AXIS)

  useAnimationFrame(deltaTime => {
    thetaRef.current += omega * deltaTime

    if (context) {
      context.clearRect(0, 0, size, size)

      context.fillStyle = 'currentColor'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.font = `${Math.round(size * 0.05)}px Inter`

      for (const { item, position } of points) {
        const rotated = rotateAroundUnitVector(position, axisRef.current, thetaRef.current)
        const projected = worldToCamera(rotated, projection)

        context.save()
        context.translate(projected.x, projected.y)
        context.scale(projected.scale, projected.scale)
        context.globalAlpha = (sphereRadius - rotated.z) / (2 * sphereRadius)
        context.fillText(item, 0, 0)
        context.restore()
      }
    }
  })

  return <canvas ref={canvasRef} width={size} height={size} />
}
