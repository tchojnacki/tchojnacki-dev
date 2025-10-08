import { IconMoon, IconSun } from "@tabler/icons-react"

import { useIsHydrated, useTheme as useThemeImpl } from "~/hooks"

interface ThemeButtonProps {
  useTheme?: () => {
    theme: "dark" | "light"
    toggleTheme: () => void
  }
}

export default function ThemeButton({ useTheme = useThemeImpl }: ThemeButtonProps) {
  const isHydrated = useIsHydrated()
  const { theme, toggleTheme } = useTheme()

  if (!isHydrated) return <div className="h-8 w-12" />

  const ThemeIcon = theme === "dark" ? IconSun : IconMoon

  return (
    <button
      className="group px-3 py-1 duration-200 active:scale-95"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggleTheme}
    >
      <ThemeIcon
        role="presentation"
        className="motion-safe:animate-themeload stroke-neutral-600 duration-200 group-hover:stroke-neutral-900 dark:stroke-neutral-400 dark:group-hover:stroke-neutral-100"
      />
    </button>
  )
}
