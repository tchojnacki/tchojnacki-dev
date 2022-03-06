import Head from 'next/head'

import Landing from '@/components/about/landing/Landing'
import SkillsSection from '@/components/about/skills/SkillsSection'

export default function About() {
  return (
    <>
      <Head>
        <title>About | Tomasz Chojnacki</title>
      </Head>
      <Landing />
      <SkillsSection />
    </>
  )
}
