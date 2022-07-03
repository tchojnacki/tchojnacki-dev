import clsx from 'clsx'

import { Menu, X } from '../icons'

interface NavHamburgerProps {
  menuOpen: boolean
  toggle: () => void
  className?: string
}

export function NavHamburger({ menuOpen, toggle, className }: NavHamburgerProps) {
  const Icon = menuOpen ? X : Menu
  return (
    <button
      className={clsx('block px-3 py-1 group', className)}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      onClick={toggle}
    >
      <Icon className="stroke-slate-8 group-hover:stroke-slate-3 dark:stroke-slate-11 dark:group-hover:stroke-slate-12 duration-200" />
    </button>
  )
}
