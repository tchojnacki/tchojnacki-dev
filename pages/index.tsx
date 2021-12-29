import type { NextPage } from 'next'
import Head from 'next/head'
import Landing from '@/components/about/Landing'

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tomasz Chojnacki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </>
  )
}

export default About
