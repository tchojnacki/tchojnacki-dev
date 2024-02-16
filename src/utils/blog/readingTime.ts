import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

export function remarkReadingTime() {
  return (tree: unknown, { data }: { data: any }) => {
    const textOnPage = toString(tree)
    const { minutes } = getReadingTime(textOnPage)
    data.astro.frontmatter.readingTime = minutes < 1 ? 1 : Math.round(minutes)
  }
}
