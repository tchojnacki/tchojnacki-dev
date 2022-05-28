import Head from 'next/head'

import { Landing, SkillsSection } from '@/components'

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
