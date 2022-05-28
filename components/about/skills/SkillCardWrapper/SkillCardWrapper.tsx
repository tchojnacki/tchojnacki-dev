import { CSSProperties, ReactElement } from 'react'

import { SkillCardProps } from '../SkillCard'
import styles from '../skills.module.scss'

interface SkillCardWrapperProps {
  children: ReactElement<SkillCardProps> | Array<ReactElement<SkillCardProps>>
  w: number
  h: number
  l?: number
}

export function SkillCardWrapper({ children, w, h, l = 1 }: SkillCardWrapperProps) {
  return (
    <ul
      className={styles.cardWrapper}
      style={{ '--grid-width': w, '--grid-height': h, '--grid-largest': l } as CSSProperties}
    >
      {children}
    </ul>
  )
}
