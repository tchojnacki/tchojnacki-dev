import { cn } from "~/lib/cn"
import { canonize } from "~/lib/format"

interface NavLinkProps {
  href: string
  children: string
  pathname: string
  className?: string
}

export default function NavLink({ href, children, pathname, className }: NavLinkProps) {
  return (
    <a
      href={href}
      draggable={false}
      className={cn(
        className,
        "block duration-200 select-none active:scale-95",
        pathsMatch(href, pathname)
          ? "font-bold text-neutral-900 dark:text-neutral-100"
          : "text-neutral-600 dark:text-neutral-400",
      )}
    >
      {children}
    </a>
  )
}

function pathsMatch(t: string, c: string): boolean {
  const target = canonize(t)
  const current = canonize(c)
  return target === "" ? current === "" : current.startsWith(target)
}
