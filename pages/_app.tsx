import type { AppProps } from 'next/app'

import { Nav } from '@/components'
import '@/styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-indigo-2 text-slate-12">
      <Nav />
      <Component {...pageProps} />
    </div>
  )
}
