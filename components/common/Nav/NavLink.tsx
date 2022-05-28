import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './Nav.module.scss'

interface NavLinkProps {
  href: string
  children: string
}

export function NavLink({ href, children }: NavLinkProps) {
  const router = useRouter()

  return (
    <Link href={href}>
      <a className={classNames(styles.navLink, { [styles.active]: router.pathname === href })}>
        {children}
      </a>
    </Link>
  )
}
