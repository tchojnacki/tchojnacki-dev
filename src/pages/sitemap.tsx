import Link from 'next/link'

import { SEO } from 'components'

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
            <li>
              <Link href="">
                <a className="hover:underline">About</a>
              </Link>
            </li>
            <li>
              <Link href="/projects">
                <a className="hover:underline">Projects</a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a className="hover:underline">Blog</a>
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  )
}
