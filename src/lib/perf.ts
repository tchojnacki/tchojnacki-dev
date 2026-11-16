import { delay } from "es-toolkit"

export async function cpuBoundLoop(n: number, body: (i: number) => Promise<void>): Promise<void> {
  await delay(0)
  for (let i = 0; i < n; i++) {
    await body(i)
    await delay(0)
  }
}
