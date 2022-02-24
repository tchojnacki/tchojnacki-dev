import { siReact } from 'simple-icons/icons'

import SkillCard from '@/components/about/skills/SkillCard'

import { SKILL_ARRAY, SKILL_TYPE_NAMES } from '@/data/skills'

import styles from '@/styles/about/skills/SkillsSection.module.scss'

export default function SkillsSection() {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionHeader}>Skills</h3>
      {Object.entries(SKILL_TYPE_NAMES).map(([type, label]) => (
        <>
          <h4 className={styles.skillTypeHeader}>{label}</h4>
          <div className={styles.cardWrapper}>
            {SKILL_ARRAY.filter(skill => skill.type === type).map(skill => (
              <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </>
      ))}
    </section>
  )
}
