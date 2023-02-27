import clsx from 'clsx'
import { NextAdapter } from 'next-query-params'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import useLocalStorageState from 'use-local-storage-state'
import { QueryParamProvider } from 'use-query-params'

import { Footer, Nav } from 'components'
import 'styles/global.css'

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin', 'latin-ext'],
  fallback: [
    'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
})

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useLocalStorageState<'dark' | 'light'>('theme', {
    defaultValue: 'dark',
  })
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <div
      className={clsx(
        theme === 'dark' ? 'dark bg-indigo-2 text-slate-12' : 'bg-slate-12 text-slate-3',
        inter.className,
        'overflow-x-hidden'
      )}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Nav currentTheme={theme} toggleTheme={toggleTheme} />
      <QueryParamProvider adapter={NextAdapter}>
        <Component {...pageProps} />
      </QueryParamProvider>
      <Footer />
    </div>
  )
}
