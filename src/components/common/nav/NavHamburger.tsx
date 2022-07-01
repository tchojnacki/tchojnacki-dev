import { classList } from 'shared'

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
      className={classList('block px-3 py-1', className)}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      onClick={toggle}
    >
      <Icon className="stroke-slate-11 hover:stroke-slate-12 duration-200" />
    </button>
  )
}
