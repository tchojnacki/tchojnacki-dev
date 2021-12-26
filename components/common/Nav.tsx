import Link from 'next/link'
import styles from '@/styles/common/Nav.module.css'
import { useRouter } from 'next/router'

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

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink href="/">About</NavLink>
      <NavLink href="/projects">Projects</NavLink>
      <NavLink href="/experience">Experience</NavLink>
      <NavLink href="/blog">Blog</NavLink>
    </nav>
  )
}

export default Nav
