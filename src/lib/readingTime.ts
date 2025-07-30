import { toString } from 'mdast-util-to-string'

const WPM = 200

export function getReadingTimeMinutes(text: string): number {
  let insideWord = false
  let count = 0
  for (let i = 0; i < text.length; i++) {
    const char = text[i]! // SAFETY: 0 <= i < text.length
    if (/\s/.test(char)) {
      insideWord = false
    } else if (!insideWord) {
      insideWord = true
      count += 1
    }
  }

  return Math.max(Math.round(count / WPM), 1)
}

export function remarkReadingTime() {
  return (tree: unknown, { data }: { data: any }) => {
    data.astro.frontmatter.readingTime = getReadingTimeMinutes(toString(tree))
  }
}
