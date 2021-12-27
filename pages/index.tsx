import type { NextPage } from 'next'
import Head from 'next/head'
import Nav from '@/components/common/Nav'
import Landing from '@/components/about/Landing'

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tomasz Chojnacki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Landing />
    </>
  )
}

export default About
