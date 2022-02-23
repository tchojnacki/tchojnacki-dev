import type { AppProps } from 'next/app'
import React from 'react'

import Nav from '@/components/common/nav/Nav'

import '@/styles/global.scss'
import '@/styles/preflight.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Nav />
    <Component {...pageProps} />
  </>
)

export default MyApp
