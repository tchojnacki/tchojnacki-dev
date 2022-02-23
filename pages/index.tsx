import type { NextPage } from 'next'
import Head from 'next/head'

import Landing from '@/components/about/Landing'

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About | Tomasz Chojnacki</title>
      </Head>
      <Landing />
    </>
  )
}

export default About
