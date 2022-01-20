import { siGithub, siLinkedin } from 'simple-icons/icons'
import TechSphere from '@/components/about/TechSphere'
import Wave from '@/components/about/Wave'
import LinkButton from '@/components/about/LinkButton'
import SimpleIconSvg from '@/components/common/SimpleIconSvg'
import WavingEmoji from '@/components/about/WavingEmoji'
import HeroTypewriter from '@/components/about/HeroTypewriter'
import styles from '@/styles/about/Landing.module.scss'
import onLoad from '@/styles/common/onLoad.module.scss'

const Landing = () => {
  return (
    <main className={styles.landing}>
      <section className={[styles.heroText, onLoad.enter, onLoad.fromLeft].join(' ')}>
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
      <section className={[styles.sphereWrapper, onLoad.enter, onLoad.fromRight].join(' ')}>
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

export default Landing
