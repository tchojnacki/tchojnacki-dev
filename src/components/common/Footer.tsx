import Link from 'next/link'

import { Wave } from 'components'
import { SITEMAP, SOCIAL_LINKS } from 'data'

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
            {SITEMAP.filter(({ url }) => url !== '/sitemap').map(({ url, label }) => (
              <li key={url}>
                <Link href={url} className="hover:underline">
                  {label}
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
            <Link href="/sitemap" className="hover:underline">
              Sitemap
            </Link>
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
            Designed and developed by <strong>Tomasz&nbsp;Chojnacki</strong>
          </p>
        </section>
      </footer>
    </>
  )
}
