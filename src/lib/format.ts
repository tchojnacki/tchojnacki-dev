export function canonize(url: string): string {
  return url.replace(/(^[/\\]+|[/\\]+$)/g, '')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z -_]/g, '')
    .replace(/[ -_]+/g, '-')
}
