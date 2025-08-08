import { IconMenu2, IconX } from "@tabler/icons-react"
import clsx from "clsx"

interface NavHamburgerProps {
  menuOpen: boolean
  toggle: () => void
  className?: string
}

export default function NavHamburger({ menuOpen, toggle, className }: NavHamburgerProps) {
  const Icon = menuOpen ? IconX : IconMenu2
  return (
    <button
      className={clsx("group block px-3 py-1", className)}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      onClick={toggle}
    >
      <Icon
        role="presentation"
        className="stroke-neutral-600 duration-200 group-hover:stroke-neutral-900 dark:stroke-neutral-400 dark:group-hover:stroke-neutral-100"
      />
    </button>
  )
}
