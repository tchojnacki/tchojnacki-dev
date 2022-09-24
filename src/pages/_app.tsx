import clsx from 'clsx'
import type { AppProps } from 'next/app'
import useLocalStorageState from 'use-local-storage-state'

import { Footer, Nav } from 'components'
import 'styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useLocalStorageState<'dark' | 'light'>('theme', {
    defaultValue: 'dark',
  })
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <div
      className={clsx(
        theme === 'dark' ? 'dark bg-indigo-2 text-slate-12' : 'bg-slate-12 text-slate-3',
        'overflow-x-hidden'
      )}
    >
      <Nav currentTheme={theme} toggleTheme={toggleTheme} />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
