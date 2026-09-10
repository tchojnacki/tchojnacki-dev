import { cumSum } from "~/lib/math"

import TestCase, { CASE_PX_PER_S } from "./TestCase"

type TestSuiteProps = {
  x?: number
  y?: number
  caseDurations: number[]
  caseNames: string[]
  caseFails: boolean[]
}

export default function TestSuite({
  x = 0,
  y = 0,
  caseDurations,
  caseNames,
  caseFails,
}: TestSuiteProps) {
  const caseCount = caseDurations.length
  const caseDelays = cumSum(caseDurations)
  const firstFailIdx = caseFails.findIndex(Boolean)
  return (
    <g transform={`translate(${x}, ${y})`}>
      {Array.from({ length: caseCount }).map((_, i) => (
        <TestCase
          key={i}
          name={caseNames[i]}
          x={caseDelays[i]! * CASE_PX_PER_S}
          duration={caseDurations[i]}
          delay={i <= firstFailIdx ? caseDelays[i] : Infinity}
          fail={caseFails[i]}
        />
      ))}
    </g>
  )
}
