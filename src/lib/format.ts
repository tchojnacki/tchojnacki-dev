export function canonize(url: string): string {
  return url.replaceAll(/(^[/\\]+|[/\\]+$)/g, "")
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[^a-z -_]/g, "")
    .replaceAll(/[ -_]+/g, "-")
}
