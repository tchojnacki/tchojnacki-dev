import { NextApiRequest, NextApiResponse } from 'next'
import { SitemapStream } from 'sitemap'
import { createGzip } from 'zlib'

function writeSitemap(stream: SitemapStream) {
  stream.write({ url: '', changefreq: 'monthly', priority: 1.0 })
  stream.write({ url: '/projects', changefreq: 'monthly', priority: 0.5 })
  stream.write({ url: '/blog', changefreq: 'monthly', priority: 0.5 })
}

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Content-Encoding', 'gzip')

    const stream = new SitemapStream({ hostname: 'https://tchojnacki.dev' })
    const pipeline = stream.pipe(createGzip())

    writeSitemap(stream)

    stream.end()
    pipeline.pipe(res).on('error', error => {
      throw error
    })
  } catch {
    res.status(500).end()
  }
}
