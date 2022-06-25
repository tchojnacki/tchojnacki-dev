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
          'text-slate-11 block leading-none duration-200',
          router.pathname === href && 'text-slate-12 font-bold'
        )}
      >
        {children}
      </a>
    </Link>
  )
}
