import { IconMenu2, IconX } from "@tabler/icons-react"

import { cn } from "~/lib/cn"

interface NavHamburgerProps {
  menuOpen: boolean
  onClick: () => void
  className?: string
}

export default function NavHamburger({ menuOpen, onClick, className }: NavHamburgerProps) {
  const Icon = menuOpen ? IconX : IconMenu2
  return (
    <button
      className={cn("group block px-3 py-1 duration-200 active:scale-95", className)}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      onClick={onClick}
    >
      <Icon
        role="presentation"
        className="stroke-neutral-600 duration-200 group-hover:stroke-neutral-900 dark:stroke-neutral-400 dark:group-hover:stroke-neutral-100"
      />
    </button>
  )
}
