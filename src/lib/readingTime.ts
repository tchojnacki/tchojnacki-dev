import { toString } from "mdast-util-to-string"

const WPM = 200

export function getReadingTimeMinutes(text: string): number {
  let insideWord = false
  let count = 0
  for (const char of text) {
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
  return (
    tree: unknown,
    { data }: { data: { astro?: { frontmatter?: Record<string, unknown> } } },
  ) => {
    data.astro!.frontmatter!["readingTime"] = getReadingTimeMinutes(toString(tree))
  }
}
