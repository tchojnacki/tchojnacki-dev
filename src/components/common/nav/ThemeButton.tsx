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
        role="presentation"
        className="stroke-neutral-600 group-hover:stroke-neutral-900 dark:stroke-neutral-400
        dark:group-hover:stroke-neutral-100 animate-enteronload duration-200 onenter-scaling motion-reduce:animate-none"
      />
    </button>
  )
}
