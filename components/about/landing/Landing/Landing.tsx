import classNames from 'classnames'
import { siGithub, siLinkedin } from 'simple-icons/icons'

import { SimpleIconSvg } from '@/components/common/SimpleIconSvg'
import onLoad from '@/styles/onLoad.module.scss'

import { LinkButton } from '../LinkButton'
import { TechSphere } from '../TechSphere'
import { Wave } from '../Wave'
import { WavingEmoji } from '../WavingEmoji'
import styles from './Landing.module.scss'

export function Landing() {
  return (
    <main className={styles.landing}>
      <section className={classNames(styles.heroText, onLoad.enter, onLoad.fromLeft)}>
        <h2 className={styles.heroSubtitle}>
          Hello <WavingEmoji />, my name is
        </h2>
        <h1 className={styles.heroTitle}>Tomasz Chojnacki</h1>
        <p className={styles.heroParagraph}>I am a software developer.</p>
        <div className={styles.heroButtons}>
          <LinkButton href="/projects">View Projects</LinkButton>
          <a
            className={styles.heroSocialLink}
            href="https://github.com/tchojnacki"
            aria-label="GitHub"
          >
            <SimpleIconSvg icon={siGithub} />
          </a>
          <a
            className={styles.heroSocialLink}
            href="https://www.linkedin.com/in/tchojnacki"
            aria-label="LinkedIn"
          >
            <SimpleIconSvg icon={siLinkedin} />
          </a>
        </div>
      </section>
      <section className={classNames(styles.sphereWrapper, onLoad.enter, onLoad.fromRight)}>
        <TechSphere />
      </section>
      <div className={styles.waveWrapper}>
        <Wave />
      </div>
    </main>
  )
}
