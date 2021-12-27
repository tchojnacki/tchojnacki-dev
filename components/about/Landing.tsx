import { siGithub, siLinkedin } from 'simple-icons/icons'
import TechSphere from '@/components/about/TechSphere'
import Wave from '@/components/about/Wave'
import LinkButton from '@/components/about/LinkButton'
import SimpleIconSvg from '@/components/common/SimpleIconSvg'
import styles from '@/styles/about/Landing.module.css'

const Landing = () => (
  <main className={styles.landing}>
    <section className={styles.heroText}>
      <h2 className={styles.heroSubtitle}>Hello 👋, my name is</h2>
      <h1 className={styles.heroTitle}>Tomasz Chojnacki</h1>
      <p className={styles.heroParagraph}>I am a software developer.</p>
      <div className={styles.heroButtons}>
        <LinkButton href="/projects">View Projects</LinkButton>
        <a className={styles.heroSocialLink} href="https://github.com/tchojnacki">
          <SimpleIconSvg icon={siGithub} size="2rem" />
        </a>
        <a className={styles.heroSocialLink} href="https://www.linkedin.com/in/tchojnacki">
          <SimpleIconSvg icon={siLinkedin} size="2rem" />
        </a>
      </div>
    </section>
    <section className={styles.sphereWrapper}>
      <TechSphere />
    </section>
    <section className={styles.waveSection}>
      <Wave />
    </section>
  </main>
)

export default Landing
