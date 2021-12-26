import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/about/About.module.css'
import Nav from '@/components/common/Nav'

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Tomasz Chojnacki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className={styles.landing}>
        <section className={styles.heroText}>
          <h2 className={styles.heroSubtitle}>Hello 👋, my name is</h2>
          <h1 className={styles.heroTitle}>Tomasz Chojnacki</h1>
          <p className={styles.heroParagraph}>I am a software developer.</p>
        </section>
      </main>
    </div>
  )
}

export default About
