import clsx from 'clsx'

interface NavLinkProps {
  href: string
  children: string
  pathname: string
  className?: string
}

export default function NavLink({ href, children, pathname, className }: NavLinkProps) {
  return (
    <a
      href={href}
      className={clsx(
        className,
        'block duration-200',
        pathname === href
          ? 'font-bold text-slate-3 dark:text-slate-12'
          : 'text-slate-8 dark:text-slate-11',
      )}
    >
      {children}
    </a>
  )
}
