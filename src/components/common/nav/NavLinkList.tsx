import { routes } from '~/consts/routes'

import NavLink from './NavLink'

const entries = [routes.about, routes.projects, routes.blog]

interface NavLinkListProps {
  listClassName?: string
  itemClassName?: string
  pathname: string
}

export default function NavLinkList({ listClassName, itemClassName, pathname }: NavLinkListProps) {
  return (
    <ul className={listClassName}>
      {entries.map(({ href, label }) => (
        <li key={href}>
          <NavLink className={itemClassName} href={href} pathname={pathname}>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
