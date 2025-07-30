export function comparator<T, K>(
  extract: (item: T) => K,
  direction: 'asc' | 'desc' = 'asc',
): (a: T, b: T) => number {
  return (a, b) => {
    const ka = extract(a)
    const kb = extract(b)
    const order = ka < kb ? -1 : ka > kb ? 1 : 0
    return direction === 'asc' ? order : -order
  }
}
