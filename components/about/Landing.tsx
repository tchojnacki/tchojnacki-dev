import { siGithub, siLinkedin } from 'simple-icons/icons'
import TechSphere from '@/components/about/TechSphere'
import Wave from '@/components/about/Wave'
import LinkButton from '@/components/about/LinkButton'
import SimpleIconSvg from '@/components/common/SimpleIconSvg'
import styles from '@/styles/about/Landing.module.css'
import WavingEmoji from './WavingEmoji'

const Landing = () => (
  <main className={styles.landing}>
    <section className={styles.heroText}>
      <h2 className={styles.heroSubtitle}>
        Hello <WavingEmoji />, my name is
      </h2>
      <h1 className={styles.heroTitle}>Tomasz Chojnacki</h1>
      <p className={styles.heroParagraph}>I am a software developer.</p>
      <div className={styles.heroButtons}>
        <LinkButton href="/projects">View Projects</LinkButton>
        <a className={styles.heroSocialLink} href="https://github.com/tchojnacki">
          <SimpleIconSvg icon={siGithub} />
        </a>
        <a className={styles.heroSocialLink} href="https://www.linkedin.com/in/tchojnacki">
          <SimpleIconSvg icon={siLinkedin} />
        </a>
      </div>
    </section>
    <section className={styles.sphereWrapper}>
      <TechSphere
        items={[
          'React',
          'Next.js',
          'TypeScript',
          'Flutter',
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

export default Landing
