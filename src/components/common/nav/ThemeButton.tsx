import { Moon, Sun } from 'tabler-icons-react'
import { useIsMounted, useTheme } from '~/hooks'

export default function ThemeButton() {
  const isMounted = useIsMounted()
  const { theme, toggleTheme } = useTheme()

  if (!isMounted) {
    return <div className="h-8 w-12" />
  }

  const ThemeIcon = theme === 'dark' ? Sun : Moon

  return (
    <button
      className="group px-3 py-1"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      onClick={toggleTheme}
    >
      <ThemeIcon
        className="stroke-legacyslate-8 group-hover:stroke-legacyslate-3 dark:stroke-legacyslate-11 dark:group-hover:stroke-legacyslate-12 animate-enteronload
       duration-200 onenter-scaling motion-reduce:animate-none"
      />
    </button>
  )
}
