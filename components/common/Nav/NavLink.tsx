import classNames from 'classnames'
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
        className={classNames(
          className,
          'block leading-none text-slate-11 duration-200',
          router.pathname === href && 'font-bold text-slate-12'
        )}
      >
        {children}
      </a>
    </Link>
  )
}
