import { SITEMAP } from 'data'

import { NavLink } from './NavLink'

interface NavLinkListProps {
  listClassName?: string
  itemClassName?: string
}

export function NavLinkList({ listClassName, itemClassName }: NavLinkListProps) {
  return (
    <ul className={listClassName}>
      {SITEMAP.filter(({ url }) => url !== '/sitemap').map(({ url, label }) => (
        <li key={url}>
          <NavLink className={itemClassName} href={url}>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
