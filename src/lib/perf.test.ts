import { describe, expect, it } from "vitest"

import { cpuBoundLoop } from "~/lib/perf"

describe(cpuBoundLoop, () => {
  it.each([0, 1, 64, 100])("runs a correct number of iterations (%d)", async n => {
    let c = 0
    await cpuBoundLoop(n, () => {
      c += 1
    })
    expect(c).toBe(n)
  })

  it("passes the correct iteration number to the callback", async () => {
    let c = 0
    await cpuBoundLoop(10, i => {
      expect(i).toBe(c)
      c += 1
    })
  })
})
