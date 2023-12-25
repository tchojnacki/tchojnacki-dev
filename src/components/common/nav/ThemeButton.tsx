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
        className="animate-enteronload stroke-slate-8 duration-200 onenter-scaling group-hover:stroke-slate-3
       motion-reduce:animate-none dark:stroke-slate-11 dark:group-hover:stroke-slate-12"
      />
    </button>
  )
}
