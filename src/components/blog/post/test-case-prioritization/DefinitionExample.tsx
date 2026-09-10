import { useState } from "react"

import PermArrows from "./PermArrows"
import { CASE_HEIGHT_PX, CASE_PX_PER_S } from "./TestCase"
import TestSuite from "./TestSuite"

const TOTAL_TIME_S = 10
const MARGIN_PX = 10
const NUM_CASES = 10

const dr = (seed: number) => {
  let x = Math.sin(seed * 1000) * 1000
  x -= Math.floor(x)
  return x
}

const genDurations = (round: number) => {
  const weights = Array.from({ length: NUM_CASES }).map((_, i) => 1 + dr(1000 * round + i))
  const weightSum = weights.reduce((a, b) => a + b, 0)
  return weights.map(w => (w / weightSum) * TOTAL_TIME_S)
}

const genFails = (round: number) => {
  const failIdx = 6 + Math.floor(dr(1000 * round) * 4)
  return Array.from({ length: NUM_CASES }).map((_, i) => i === failIdx)
}

const genPermutation = (round: number) => {
  const oldFails = genFails(round)
  const perm = Array.from({ length: NUM_CASES }, (_, i) => i)
  let seed = round
  do {
    for (let i = perm.length - 1; i > 0; i--) {
      const j = Math.floor(dr(seed++) * (i + 1))
      ;[perm[i], perm[j]] = [perm[j]!, perm[i]!]
    }
  } while (perm.map(i => oldFails[i]).findIndex(Boolean) > 3)
  return perm
}

export default function DefinitionExample() {
  const [round, setRound] = useState(0)

  const oldDurations = genDurations(round)
  const oldNames = oldDurations.map((_, i) => `#${i + 1}`)
  const oldFails = genFails(round)

  const perm = genPermutation(round)

  const newDurations = perm.map(i => oldDurations[i]!)
  const newNames = perm.map(i => oldNames[i]!)
  const newFails = perm.map(i => oldFails[i]!)

  return (
    <figure className="my-2">
      <svg
        viewBox={`${-MARGIN_PX} ${-MARGIN_PX} ${TOTAL_TIME_S * CASE_PX_PER_S + 2 * MARGIN_PX} ${4 * CASE_HEIGHT_PX + 2 * MARGIN_PX}`}
        role="img"
        key={round}
      >
        <title>Illustrative example of TCP applied in practice.</title>
        <TestSuite caseDurations={oldDurations} caseNames={oldNames} caseFails={oldFails} />
        <TestSuite
          y={3 * CASE_HEIGHT_PX}
          caseDurations={newDurations}
          caseNames={newNames}
          caseFails={newFails}
        />
        <PermArrows
          y1={CASE_HEIGHT_PX}
          y2={3 * CASE_HEIGHT_PX}
          oldDurations={oldDurations}
          perm={perm}
        />
      </svg>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => setRound(r => r + 1)}
          className="text-neutral-0 rounded-lg bg-indigo-600 p-2 leading-none duration-200 select-none hover:bg-indigo-500 active:scale-95"
        >
          Regenerate
        </button>
      </div>
    </figure>
  )
}
