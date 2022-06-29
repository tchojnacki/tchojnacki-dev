import Link from 'next/link'
import { useRouter } from 'next/router'

import { classList } from 'shared'

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
        className={classList(
          className,
          'block leading-none duration-200',
          router.pathname === href ? 'font-bold text-slate-12' : 'text-slate-11'
        )}
      >
        {children}
      </a>
    </Link>
  )
}
