import { useCallback, useEffect, useState } from 'react'
import { useMutationObserver } from 'ahooks'

const extractTheme = () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light')

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => setTheme(extractTheme()), [])

  useMutationObserver(
    () => setTheme(extractTheme()),
    () => document.documentElement,
    {
      attributes: true,
      attributeFilter: ['class'],
    },
  )

  const toggleTheme = useCallback(() => document.documentElement.classList.toggle('dark'), [])

  return { theme, toggleTheme }
}
