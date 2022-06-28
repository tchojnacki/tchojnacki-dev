import { classList } from 'utils'

interface NavHamburgerProps {
  menuOpen: boolean
  toggle: () => void
  mobileOnly?: boolean
}

export function NavHamburger({ menuOpen, toggle, mobileOnly }: NavHamburgerProps) {
  const singularBarClass = classList(
    'w-full h-0.5 bg-slate-11 group-hover:bg-slate-12 duration-200 rounded-sm',
    menuOpen && 'scale-0'
  )

  const doubleBarClass = classList(
    'w-full h-0.5 relative pseudo:bg-slate-11 group-hover:pseudo:bg-slate-12 pseudo:block pseudo:content-[""] pseudo:absolute pseudo:w-full pseudo:h-full pseudo:rounded-sm pseudo:duration-200',
    menuOpen && 'before:rotate-[-45deg] after:rotate-[45deg] pseudo:scale-[1.41]'
  )

  return (
    <button
      className={classList(
        'group ml-auto box-content flex h-hamburger-size w-hamburger-size shrink-0 flex-col justify-between px-4 py-[calc((theme(spacing.nav-height)/2_-_theme(spacing.hamburger-size))/2)]',
        mobileOnly && 'sm:hidden'
      )}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? 'Close' : 'Open'}
      onClick={toggle}
    >
      <div className={singularBarClass} />
      <div className={doubleBarClass} />
      <div className={singularBarClass} />
    </button>
  )
}
