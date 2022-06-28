import clamp from 'lodash/clamp'
import round from 'lodash/round'

import { SPHERE_SKILL_ARRAY } from 'data/skills'
import { isClientSide, useMouseOffsetX, useParentSize, usePrefersReducedMotion } from 'utils'

import { initialPositions, posToTransform, rotateY } from './fibonacciSphere'

const items = SPHERE_SKILL_ARRAY.map(skill => skill.name)
const positions = initialPositions(items.length)

export function TechSphere() {
  const prefersReducedMotion = usePrefersReducedMotion()

  const mouseOffset = useMouseOffsetX()
  const angle =
    isClientSide() && !prefersReducedMotion ? (mouseOffset / window.innerWidth) * 2 * Math.PI : 0

  const { width, height, childRef } = useParentSize<HTMLUListElement>()
  const size = clamp(round(Math.min(width, height) * 0.75, 25), 200, 600)

  const elements = items.map((item, i) => {
    const pos = rotateY(positions[i], angle)

    return {
      name: item,
      style: {
        transform: posToTransform(pos, size),
        opacity: (1 + pos.z) / 2,
      },
    }
  })

  return (
    <ul
      ref={childRef}
      className="relative h-[var(--sphere-size)] w-[var(--sphere-size)] bg-[radial-gradient(theme(colors.indigo.4),transparent_50%)]"
      style={{ '--sphere-size': `${size}px` } as React.CSSProperties}
    >
      {elements.map(({ name, style }) => (
        <li
          className="absolute flex w-0 justify-center"
          key={name}
          style={{ ...style, fontSize: 'calc(0.064 * var(--sphere-size))' }}
        >
          {name}
        </li>
      ))}
    </ul>
  )
}
