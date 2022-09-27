import Link from 'next/link'

import { SEO } from 'components'
import { SITEMAP } from 'data'

export default function Projects() {
  return (
    <>
      <SEO
        name="Sitemap"
        desc="List of all pages in the Tomasz Chojnacki's website."
        path="/sitemap"
      />
      <main className="p-16 text-center">
        <h1 className="pb-8 text-4xl font-bold capitalize">Sitemap</h1>
        <nav>
          <ul>
            {SITEMAP.filter(({ url }) => url !== '/sitemap').map(({ url, label }) => (
              <li key={url}>
                <Link href={url}>
                  <a className="hover:underline">{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </>
  )
}
