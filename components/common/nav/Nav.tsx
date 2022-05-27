import NavHamburger from './NavHamburger'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import styles from '@/styles/common/nav/Nav.module.scss'
import onLoad from '@/styles/common/onLoad.module.scss'

interface NavLinkProps {
  href: string
  children: string
}

function NavLink({ href, children }: NavLinkProps) {
  const router = useRouter()

  return (
    <Link href={href}>
      <a className={classNames({ [styles.active]: router.pathname === href })}>{children}</a>
    </Link>
  )
}

function NavLinks() {
  return (
    <>
      <NavLink href="/">About</NavLink>
      <NavLink href="/projects">Projects</NavLink>
      <NavLink href="/blog">Blog</NavLink>
    </>
  )
}

export default function Nav() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <nav className={classNames(styles.nav, onLoad.enter, onLoad.fromTop)}>
        <NavLinks />
        <NavHamburger menuOpen={open} toggle={() => setOpen(prev => !prev)} />
      </nav>
      <nav className={classNames(styles.overlay, { [styles.shown]: open })}>
        <NavLinks />
      </nav>
    </>
  )
}
