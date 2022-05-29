import { TECHNOLOGIES as T } from '@/data/technologies'

import { SkillCard } from '../SkillCard'
import { SkillCardWrapper } from '../SkillCardWrapper'
import styles from '../skills.module.scss'

export function SkillsSection() {
  return (
    <section className={styles.sectionBackground}>
      <h3 className={styles.sectionHeader}>Skills</h3>
      <div className={styles.tabWrapper}>
        <section className={styles.tab}>
          <h4 className={styles.skillTypeHeader}>Frameworks & libraries</h4>
          <SkillCardWrapper w={6} h={5} l={3}>
            <SkillCard skill={T.REACT} s={3} />
            <SkillCard skill={T.NODE} s={3} />
            <SkillCard skill={T.NEXT} s={2} />
            <SkillCard skill={T.NEST} s={2} />
            <SkillCard skill={T.JEST} s={2} />
          </SkillCardWrapper>
        </section>
        <section className={styles.tab}>
          <h4 className={styles.skillTypeHeader}>Languages</h4>
          <SkillCardWrapper w={7} h={6} l={3}>
            <SkillCard skill={T.HTML} s={2} />
            <SkillCard skill={T.TYPESCRIPT} s={3} />
            <SkillCard skill={T.PYTHON} s={2} />
            <SkillCard skill={T.CSS} s={2} />
            <SkillCard skill={T.JAVASCRIPT} s={3} />
            <SkillCard skill={T.RUST} s={2} />
            <SkillCard skill={T.JAVA} s={2} />
            <SkillCard skill={T.SASS} s={2} />
          </SkillCardWrapper>
        </section>
        <section className={styles.tab}>
          <h4 className={styles.skillTypeHeader}>Tools & devops</h4>
          <SkillCardWrapper w={4} h={2} l={1.33}>
            <SkillCard skill={T.GIT} />
            <SkillCard skill={T.GITHUB} />
            <SkillCard skill={T.MONGO} />
            <SkillCard skill={T.NPM} />
            <SkillCard skill={T.YARN} />
            <SkillCard skill={T.DOCKER} />
            <SkillCard skill={T.HEROKU} />
            <SkillCard skill={T.FIGMA} />
          </SkillCardWrapper>
        </section>
      </div>
    </section>
  )
}
