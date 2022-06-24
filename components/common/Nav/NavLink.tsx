import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavLinkProps {
  href: string
  children: string
}

export function NavLink({ href, children }: NavLinkProps) {
  const router = useRouter()

  return (
    <Link href={href}>
      <a
        className={classNames(
          'text-slate-11 block',
          router.pathname === href && 'text-slate-12 font-bold'
        )}
      >
        {children}
      </a>
    </Link>
  )
}
