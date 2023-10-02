import { SITEMAP } from '~/data/sitemap'

import { NavLink } from './NavLink'

interface NavLinkListProps {
  listClassName?: string
  itemClassName?: string
  pathname: string
}

export function NavLinkList({ listClassName, itemClassName, pathname }: NavLinkListProps) {
  return (
    <ul className={listClassName}>
      {SITEMAP.filter(({ url }) => url !== '/sitemap').map(({ url, label }) => (
        <li key={url}>
          <NavLink className={itemClassName} href={url} pathname={pathname}>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
