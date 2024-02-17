import clamp from 'lodash/clamp'
import Chart from '~/components/blog/Chart'
import { lerp } from '~/utils/math'

type LossFigureProps = { losses: number[] }

export default function LossFigure({ losses }: LossFigureProps) {
  losses = losses.map(l => clamp(l, 0, 1))
  const max = Math.max(...losses)
  const data = losses.map(
    (l, i) => [lerp(i, [0, losses.length - 1], [0, 1]), l / max] as [number, number],
  )

  const loss = losses.at(-1)

  return (
    <figure>
      <Chart
        elements={[
          { type: 'axes', lineWidth: 0.02 },
          { type: 'path', color: 'orange', data },
        ]}
      />
      <figcaption className="text-center">Loss{loss ? ` = ${loss.toFixed(5)}` : null}</figcaption>
    </figure>
  )
}
