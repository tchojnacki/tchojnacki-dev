import { SECTION_SKILLS } from '@/data/skills'

import { SkillCard } from '../SkillCard'
import { SkillCardWrapper } from '../SkillCardWrapper'
import styles from '../skills.module.scss'

export function SkillsSection() {
  return (
    <section className={styles.sectionBackground}>
      <h3 className={styles.sectionHeader}>Skills</h3>
      <div className={styles.tabWrapper}>
        {SECTION_SKILLS.map(({ label, width, height, largest, items }) => (
          <section key={label} className={styles.tab}>
            <h4 className={styles.skillTypeHeader}>{label}</h4>
            <SkillCardWrapper width={width} height={height} largest={largest}>
              {items.map(([skill, size]) => (
                <SkillCard key={skill.name} skill={skill} size={size} />
              ))}
            </SkillCardWrapper>
          </section>
        ))}
      </div>
    </section>
  )
}
