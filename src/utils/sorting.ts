export function keyComparator<T, K>(
  extract: (item: T) => K,
  descending: boolean = false,
): (a: T, b: T) => number {
  return (a, b) => {
    const ka = extract(a)
    const kb = extract(b)
    const order = ka < kb ? -1 : ka > kb ? 1 : 0
    return descending ? -order : order
  }
}
