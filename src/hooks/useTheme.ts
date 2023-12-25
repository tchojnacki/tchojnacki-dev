import { useCallback, useEffect, useState } from 'react'

function initialTheme() {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    const local = localStorage.getItem('theme')
    if (local === 'dark' || local === 'light') {
      return local
    }
  }
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(initialTheme())

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark')), [])

  return { theme, toggleTheme }
}
