import { zip } from "lodash-es"
import { useId } from "react"

import { cumSum } from "~/lib/math"

import { CASE_PX_PER_S } from "./TestCase"

const invertPerm = (perm: number[]) => {
  const inv: number[] = Array.from({ length: perm.length })
  for (let i = 0; i < perm.length; i++) {
    inv[perm[i]!] = i
  }
  return inv
}

const computeLines = (oldDurations: number[], perm: number[]) => {
  const oldWidths = oldDurations.map(d => d * CASE_PX_PER_S)
  const oldOffsets = cumSum(oldWidths)
  const oldCenters = zip(oldOffsets, oldWidths).map(([o, w]) => o! + w! / 2)

  const newWidths = perm.map(i => oldWidths[i]!)
  const newOffsets = cumSum(newWidths)
  const newCenters = zip(newOffsets, newWidths).map(([o, w]) => o! + w! / 2)

  const invPerm = invertPerm(perm)
  const unpermutedNewCenters = invPerm.map(i => newCenters[i]!)

  return zip(oldCenters, unpermutedNewCenters).map(([x1, x2]) => ({ x1: x1!, x2: x2! }))
}

type PermArrowsProps = {
  y1: number
  y2: number
  oldDurations: number[]
  perm: number[]
}

export default function PermArrows({ y1, y2, oldDurations, perm }: PermArrowsProps) {
  const headId = useId()
  const lines = computeLines(oldDurations, perm)
  return (
    <g>
      <defs>
        <marker
          id={headId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>

      {lines.map(({ x1, x2 }, i) => (
        <line
          key={i}
          {...{ x1, y1, x2, y2 }}
          stroke="currentColor"
          strokeWidth={3}
          markerEnd={`url(#${headId})`}
        />
      ))}
    </g>
  )
}
