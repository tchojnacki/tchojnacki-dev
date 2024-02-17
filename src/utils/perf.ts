const unblock = () => new Promise(resolve => setTimeout(resolve, 0))

export async function cpuBoundLoop(n: number, body: (i: number) => Promise<void>): Promise<void> {
  await unblock()
  for (let i = 0; i < n; i++) {
    await body(i)
    await unblock()
  }
}
