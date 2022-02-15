import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import NavHamburger from './NavHamburger'
import styles from '@/styles/common/Nav.module.scss'
import onLoad from '@/styles/common/onLoad.module.scss'

interface NavLinkProps {
  href: string
  children: string
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <a className={router.pathname === href ? styles.active : ''}>{children}</a>
    </Link>
  )
}

const NavLinks = () => (
  <>
    <NavLink href="/">About</NavLink>
    <NavLink href="/projects">Projects</NavLink>
    <NavLink href="/experience">Experience</NavLink>
    <NavLink href="/blog">Blog</NavLink>
  </>
)

const Nav = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <nav className={[styles.nav, onLoad.enter, onLoad.fromTop].join(' ')}>
        <NavLinks />
        <NavHamburger menuOpen={open} toggle={() => setOpen(prev => !prev)} />
      </nav>
      <nav className={styles.overlay + (open ? ` ${styles.shown}` : '')}>
        <NavLinks />
      </nav>
    </>
  )
}

export default Nav
