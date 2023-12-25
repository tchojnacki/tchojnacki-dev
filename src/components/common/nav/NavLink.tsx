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
        pathsEqual(href, pathname)
          ? 'text-legacyslate-3 dark:text-legacyslate-12 font-bold'
          : 'text-legacyslate-8 dark:text-legacyslate-11',
      )}
    >
      {children}
    </a>
  )
}

function pathsEqual(a: string, b: string): boolean {
  const canonize = (path: string) => path.replace(/(^[/\\]+|[/\\]+$)/g, '').replace(/[/\\]+/g, '/')

  return canonize(a) === canonize(b)
}
