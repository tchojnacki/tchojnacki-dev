export function classList(...classes: (string | null | undefined | false)[]): string {
  return classes.filter(cls => cls).join(' ')
}
