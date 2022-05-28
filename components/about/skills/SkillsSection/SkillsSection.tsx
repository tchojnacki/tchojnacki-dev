import { TECHNOLOGIES as T } from '@/data/technologies'

import { SkillCard } from '../SkillCard'
import { SkillCardWrapper } from '../SkillCardWrapper'
import styles from '../skills.module.scss'

export function SkillsSection() {
  return (
    <section className={styles.sectionBackground}>
      <div className={styles.sectionContent}>
        <h3 className={styles.sectionHeader}>Skills</h3>
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
        <h4 className={styles.skillTypeHeader}>Frameworks, libraries & runtimes</h4>
        <SkillCardWrapper w={6} h={5} l={3}>
          <SkillCard skill={T.REACT} s={3} />
          <SkillCard skill={T.NODE} s={3} />
          <SkillCard skill={T.NEXT} s={2} />
          <SkillCard skill={T.NEST} s={2} />
          <SkillCard skill={T.JEST} s={2} />
        </SkillCardWrapper>
        <h4 className={styles.skillTypeHeader}>Tools & devops</h4>
        <SkillCardWrapper w={20} h={9} l={7}>
          <SkillCard skill={T.GIT} s={5} />
          <SkillCard skill={T.GITHUB} s={5} />
          <SkillCard skill={T.MONGO} s={5} />
          <SkillCard skill={T.NPM} s={5} />
          <SkillCard skill={T.YARN} s={4} />
          <SkillCard skill={T.DOCKER} s={4} />
          <SkillCard skill={T.HEROKU} s={4} />
          <SkillCard skill={T.VSCODE} s={4} />
          <SkillCard skill={T.FIGMA} s={4} />
        </SkillCardWrapper>
      </div>
    </section>
  )
}
