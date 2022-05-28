import React from 'react'

import { SKILL_ARRAY, SKILL_TYPE_NAMES } from '@/data/skills'

import { SkillCard } from '../SkillCard'

import styles from './SkillsSection.module.scss'

export function SkillsSection() {
  return (
    <section className={styles.sectionBackground}>
      <div className={styles.sectionContent}>
        <h3 className={styles.sectionHeader}>Skills</h3>
        {Object.entries(SKILL_TYPE_NAMES).map(([type, label]) => (
          <React.Fragment key={type}>
            <h4 className={styles.skillTypeHeader}>{label}</h4>
            <ul className={styles.cardWrapper}>
              {SKILL_ARRAY.filter(skill => skill.type === type).map(skill => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}
