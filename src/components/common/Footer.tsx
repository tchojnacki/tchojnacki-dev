import Link from 'next/link'

import { Wave } from 'components'
import { SOCIAL_LINKS } from 'data'

const internalLinks = [
  { href: '/', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
]

const projectLinks = [
  { href: 'https://github.com/tchojnacki/tchojnacki-dev', label: 'Source' },
  { href: 'https://github.com/tchojnacki/tchojnacki-dev/issues', label: 'Issues' },
]

export function Footer() {
  return (
    <>
      <Wave className="!max-h-24" />
      <footer className="bg-indigo-11 dark:bg-indigo-4 text-slate-8 dark:text-slate-11 px-8 text-sm">
        <section className="flex flex-col sm:flex-row justify-center sm:gap-32 text-center sm:text-left">
          <ul>
            {internalLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}>
                  <a className="hover:underline">{label}</a>
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            {SOCIAL_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a className="hover:underline" href={href} target="_blank" rel="noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ul>
            {projectLinks.map(({ href, label }) => (
              <li key={href}>
                <a className="hover:underline" href={href} target="_blank" rel="noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <p className="text-center text-slate-8 dark:text-slate-11 py-8">
            Designed and developed by <strong>Tomasz Chojnacki</strong>
          </p>
        </section>
      </footer>
    </>
  )
}
