import classNames from 'classnames'
import { Omit } from 'lodash'
import { CSSProperties } from 'react'

import { SimpleIconSvg } from '@/components/common/SimpleIconSvg'
import { TechnologyDefinition } from '@/data/technologies'

import styles from '../skills.module.scss'

export interface SkillCardProps {
  skill: Omit<TechnologyDefinition, 'type'>
  size?: number
}

export function SkillCard({ skill, size }: SkillCardProps) {
  return (
    <li className={classNames(styles.card)} style={{ '--skill-size': size } as CSSProperties}>
      <SimpleIconSvg icon={skill.icon} />
      <h5>{skill.name}</h5>
    </li>
  )
}
