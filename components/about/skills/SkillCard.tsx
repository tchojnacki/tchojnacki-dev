import { Omit } from 'lodash'
import React from 'react'

import SimpleIconSvg from '@/components/common/SimpleIconSvg'

import { SkillDefinition } from '@/data/skills'

import styles from '@/styles/about/skills/SkillCard.module.scss'

type SkillCardProps = Omit<SkillDefinition, 'type'>

export default function SkillCard({ skill }: { skill: SkillCardProps }) {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <h5>{skill.name}</h5>
        <SimpleIconSvg icon={skill.icon} />
      </div>
      {skill.subskills?.length && (
        <ul className={styles.cardFooter}>
          {skill.subskills.map(subskill => (
            <li key={subskill.name}>
              <SimpleIconSvg icon={subskill.icon} /> {subskill.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
