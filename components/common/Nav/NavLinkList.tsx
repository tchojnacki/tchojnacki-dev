import { NavLink } from './NavLink'

interface NavLinkListProps {
  listClassName?: string
  itemClassName?: string
}

export function NavLinkList({ listClassName, itemClassName }: NavLinkListProps) {
  return (
    <ul className={listClassName}>
      <li>
        <NavLink className={itemClassName} href="/">
          About
        </NavLink>
      </li>
      <li>
        <NavLink className={itemClassName} href="/projects">
          Projects
        </NavLink>
      </li>
      <li>
        <NavLink className={itemClassName} href="/blog">
          Blog
        </NavLink>
      </li>
    </ul>
  )
}
