import classNames from 'classnames'
import { Omit } from 'lodash'
import { CSSProperties } from 'react'

import { SimpleIconSvg } from '@/components/common/SimpleIconSvg'
import { TechnologyDefinition } from '@/data/technologies'

import styles from '../skills.module.scss'

export interface SkillCardProps {
  skill: Omit<TechnologyDefinition, 'type'>
  s?: number
}

export function SkillCard({ skill, s }: SkillCardProps) {
  return (
    <li className={classNames(styles.card)} style={{ '--skill-size': s } as CSSProperties}>
      <h5>{skill.name}</h5>
      <SimpleIconSvg icon={skill.icon} />
    </li>
  )
}
