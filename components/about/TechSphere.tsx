import React from 'react'
import styles from '@/styles/about/TechSphere.module.css'
import { initialPositions, posToTransform, rotateY } from '@/util/fibonacciSphere'
import { useMouseOffsetX } from '@/util/useMouseOffsetX'
import { useParentSize } from '@/util/useParentSize'
import { isClientSide } from '@/util/isClientSide'

interface TechSphereProps {
  items: string[]
}

const TechSphere = ({ items }: TechSphereProps) => {
  const positions = React.useMemo(() => initialPositions(items.length), [items.length])

  const mouseOffset = useMouseOffsetX()
  const angle = isClientSide() ? (mouseOffset / window.innerWidth) * 2 * Math.PI : 0

  const { width, height, childRef } = useParentSize<HTMLUListElement>()
  const size = Math.max(Math.floor((Math.min(width, height) * 0.75) / 25) * 25, 200)

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

export default TechSphere
