import { describe, expect, it } from 'vitest'
import { cpuBoundLoop } from '~/utils/perf'

describe(cpuBoundLoop, () => {
  it.each([0, 1, 64, 100])('runs a correct number of iterations (%d)', async n => {
    let c = 0
    await cpuBoundLoop(n, async () => {
      c += 1
    })
    expect(c).toBe(n)
  })

  it('passes the correct iteration number to the callback', async () => {
    let c = 0
    await cpuBoundLoop(10, async i => {
      expect(i).toBe(c)
      c += 1
    })
  })
})
