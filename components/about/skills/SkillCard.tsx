import classNames from 'classnames'
import { Omit } from 'lodash'
import React from 'react'

import SimpleIconSvg from '@/components/common/SimpleIconSvg'

import { SkillDefinition } from '@/data/skills'

import styles from '@/styles/about/skills/SkillCard.module.scss'

type SkillCardProps = Omit<SkillDefinition, 'type'>

export default function SkillCard({ skill }: { skill: SkillCardProps }) {
  return (
    <div className={classNames(styles.card, { [styles.minor]: skill.minor })}>
      <h5>{skill.name}</h5>
      <SimpleIconSvg icon={skill.icon} />
    </div>
  )
}
