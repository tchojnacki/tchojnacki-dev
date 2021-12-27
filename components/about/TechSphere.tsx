import React from 'react'
import styles from '@/styles/about/TechSphere.module.css'
import { initialPositions, posToTransform, rotateY } from '@/util/fibonacciSphere'
import { useMouseOffsetX } from '@/util/useMouseOffsetX'

interface TechSphereProps {
  items: string[]
}

const TechSphere = ({ items }: TechSphereProps) => {
  const size = 250

  const positions = React.useMemo(() => initialPositions(items.length), [items.length])

  const mouseOffset = useMouseOffsetX()

  const angle = typeof window === 'undefined' ? 0 : (mouseOffset / window.innerWidth) * 2 * Math.PI

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
    <ul className={styles.sphere} style={{ '--sphere-size': `${size}px` } as React.CSSProperties}>
      {elements.map(({ name, style }) => (
        <li className={styles.point} key={name} style={style}>
          {name}
        </li>
      ))}
    </ul>
  )
}

export default TechSphere
