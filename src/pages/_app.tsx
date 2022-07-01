import type { AppProps } from 'next/app'

import { Nav } from 'components'
import { useLocalStorage } from 'hooks'
import { classList } from 'shared'
import 'styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('theme', 'dark')
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <div className={classList('bg-indigo-2 text-slate-12', theme === 'dark' && 'dark')}>
      <Nav currentTheme={theme} toggleTheme={toggleTheme} />
      <Component {...pageProps} />
    </div>
  )
}
