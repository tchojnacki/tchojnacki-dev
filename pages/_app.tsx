import type { AppProps } from 'next/app'
import Nav from '@/components/common/Nav'
import '@/styles/preflight.css'
import '@/styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Nav />
    <Component {...pageProps} />
  </>
)

export default MyApp
