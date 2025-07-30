export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z -_]/g, '')
    .replace(/[ -_]+/g, '-')
}
