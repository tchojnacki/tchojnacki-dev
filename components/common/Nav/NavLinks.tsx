import { NavLink } from './NavLink'

export function NavLinks() {
  return (
    <ul>
      <li>
        <NavLink href="/">About</NavLink>
      </li>
      <li>
        <NavLink href="/projects">Projects</NavLink>
      </li>
      <li>
        <NavLink href="/blog">Blog</NavLink>
      </li>
    </ul>
  )
}
