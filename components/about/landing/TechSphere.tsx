import _ from 'lodash'
import React from 'react'

import { initialPositions, posToTransform, rotateY } from '@/util/fibonacciSphere'
import { useMouseOffsetX } from '@/util/hooks/useMouseOffsetX'
import { useParentSize } from '@/util/hooks/useParentSize'
import { usePrefersReducedMotion } from '@/util/hooks/usePrefersReducedMotion'
import { isClientSide } from '@/util/isClientSide'

import styles from '@/styles/about/landing/TechSphere.module.scss'

interface TechSphereProps {
  items: string[]
}

export default function TechSphere({ items }: TechSphereProps) {
  const positions = React.useMemo(() => initialPositions(items.length), [items.length])

  const prefersReducedMotion = usePrefersReducedMotion()

  const mouseOffset = useMouseOffsetX()
  const angle =
    isClientSide() && !prefersReducedMotion ? (mouseOffset / window.innerWidth) * 2 * Math.PI : 0

  const { width, height, childRef } = useParentSize<HTMLUListElement>()
  const size = _.clamp(_.round(Math.min(width, height) * 0.75, 25), 200, 600)

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
      className={styles.sphere}
      style={{ '--sphere-size': `${size}px` } as React.CSSProperties}
    >
      {elements.map(({ name, style }) => (
        <li className={styles.point} key={name} style={style}>
          {name}
        </li>
      ))}
    </ul>
  )
}