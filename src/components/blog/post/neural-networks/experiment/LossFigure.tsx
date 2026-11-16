import { clamp } from "lodash-es"

import Chart from "~/components/blog/post/Chart"
import { lerp } from "~/lib/math"

type LossFigureProps = { losses: number[] }

export default function LossFigure({ losses }: LossFigureProps) {
  const clamped = losses.map(l => clamp(l, 0, 1))
  const max = Math.max(...clamped)
  const data = clamped.map(
    (l, i) => [lerp(i, [0, clamped.length - 1], [0, 1]), l / max] as [number, number],
  )

  const loss = clamped.at(-1)

  return (
    <figure>
      <Chart
        elements={[
          { type: "axes", lineWidth: 0.02 },
          { type: "path", color: "orange", data },
        ]}
      />
      <figcaption className="text-center">Loss{loss ? ` = ${loss.toFixed(5)}` : null}</figcaption>
    </figure>
  )
}
