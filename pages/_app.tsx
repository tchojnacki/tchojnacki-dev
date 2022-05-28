import type { AppProps } from 'next/app'
import React from 'react'

import { Nav } from '@/components'
import '@/styles/global.scss'
import '@/styles/preflight.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}
