import clsx from 'clsx'
import { Menu2, X } from 'tabler-icons-react'

interface NavHamburgerProps {
  menuOpen: boolean
  toggle: () => void
  className?: string
}

export default function NavHamburger({ menuOpen, toggle, className }: NavHamburgerProps) {
  const Icon = menuOpen ? X : Menu2
  return (
    <button
      className={clsx('group block px-3 py-1', className)}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      onClick={toggle}
    >
      <Icon
        className="stroke-legacyslate-8 group-hover:stroke-legacyslate-3
      dark:stroke-legacyslate-11 dark:group-hover:stroke-legacyslate-12 duration-200"
      />
    </button>
  )
}
