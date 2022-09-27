import { NextSeo, NextSeoProps } from 'next-seo'

import { WEBSITE_ROOT } from 'data'

const DEFAULT_TITLE = 'Tomasz Chojnacki'
const DEFAULT_DESCRIPTION =
  'Personal website of Tomasz Chojnacki, a software developer based in Wrocław.'

interface SEOProps {
  name?: string
  desc?: string
  path?: string
}

export function SEO({ path, name, desc }: SEOProps) {
  const title = name ? `${name} | ${DEFAULT_TITLE}` : DEFAULT_TITLE
  const description = desc ?? DEFAULT_DESCRIPTION
  const canonical = WEBSITE_ROOT + path

  const config: NextSeoProps = path
    ? {
        title,
        description,
        canonical,
        twitter: {
          cardType: 'summary',
        },
        openGraph: {
          type: 'website',
          url: canonical,
          title,
          description,
          site_name: DEFAULT_TITLE,
          images: [
            {
              url: `${WEBSITE_ROOT}/static/img/open-graph.png`,
              width: 1280,
              height: 720,
              alt: 'Image of the website.',
            },
          ],
        },
      }
    : {
        title,
        description,
      }

  return <NextSeo {...config} />
}
