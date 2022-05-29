import { CSSProperties, ReactElement } from 'react'

import { SkillCardProps } from '../SkillCard'
import styles from '../skills.module.scss'

interface SkillCardWrapperProps {
  children: ReactElement<SkillCardProps> | Array<ReactElement<SkillCardProps>>
  width: number
  height: number
  largest?: number
}

export function SkillCardWrapper({ children, width, height, largest }: SkillCardWrapperProps) {
  return (
    <ul
      className={styles.cardWrapper}
      style={
        {
          '--grid-width': width,
          '--grid-height': height,
          '--grid-largest': largest,
        } as CSSProperties
      }
    >
      {children}
    </ul>
  )
}
