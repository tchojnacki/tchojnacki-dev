import type { APIContext } from 'astro'
import rss from '@astrojs/rss'
import { getPosts } from '~/utils/content'

const posts = await getPosts()

export function GET(context: APIContext) {
  return rss({
    title: 'Tomasz Chojnacki',
    description: 'A personal blog of Tomasz Chojnacki centered around software development.',
    site: context.site!,
    stylesheet: '/static/pretty-feed-v3.xsl',
    trailingSlash: false,
    items: posts.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.abstract,
      link: `/blog/${p.slug}`,
    })),
  })
}
