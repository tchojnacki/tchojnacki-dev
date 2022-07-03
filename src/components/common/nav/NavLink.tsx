import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavLinkProps {
  href: string
  children: string
  className?: string
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const router = useRouter()

  return (
    <Link href={href}>
      <a
        className={clsx(
          className,
          'block duration-200',
          router.pathname === href
            ? 'font-bold text-slate-3 dark:text-slate-12'
            : 'text-slate-8 dark:text-slate-11'
        )}
      >
        {children}
      </a>
    </Link>
  )
}
