import classNames from 'classnames'
import { siGithub, siLinkedin } from 'simple-icons/icons'

import HeroTypewriter from '@/components/about/landing/HeroTypewriter'
import LinkButton from '@/components/about/landing/LinkButton'
import TechSphere from '@/components/about/landing/TechSphere'
import Wave from '@/components/about/landing/Wave'
import WavingEmoji from '@/components/about/landing/WavingEmoji'
import SimpleIconSvg from '@/components/common/SimpleIconSvg'

import styles from '@/styles/about/landing/Landing.module.scss'
import onLoad from '@/styles/common/onLoad.module.scss'

export default function Landing() {
  return (
    <main className={styles.landing}>
      <section className={classNames(styles.heroText, onLoad.enter, onLoad.fromLeft)}>
        <h2 className={styles.heroSubtitle}>
          Hello <WavingEmoji />, my name is
        </h2>
        <h1 className={styles.heroTitle}>Tomasz Chojnacki</h1>
        <p className={styles.heroParagraph}>
          I am a <HeroTypewriter />
        </p>
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
        <TechSphere
          items={[
            'React',
            'Next.js',
            'TypeScript',
            'Flutter',
            'Node.js',
            'JavaScript',
            'CSS',
            'HTML',
            'Dart',
            'Java',
          ]}
        />
      </section>
      <section className={styles.waveSection}>
        <Wave />
      </section>
    </main>
  )
}
