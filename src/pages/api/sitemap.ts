import { NextApiRequest, NextApiResponse } from 'next'
import { SitemapStream } from 'sitemap'
import { createGzip } from 'zlib'

import { SITEMAP, WEBSITE_ROOT } from 'data'

function writeSitemap(stream: SitemapStream) {
  SITEMAP.forEach(({ url, changefreq, priority }) => {
    stream.write({ url, changefreq, priority })
  })
}

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Content-Encoding', 'gzip')

    const stream = new SitemapStream({ hostname: WEBSITE_ROOT })
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
