import { Fragment } from 'react'

type SeriesColor = 'orange' | 'blue'

const fillColors = {
  orange: 'fill-[#FE5B1F] stroke-none',
  blue: 'fill-[#0074D9] stroke-none',
}

const strokeColors = {
  orange: 'stroke-[#FE5B1F] fill-none',
  blue: 'stroke-[#0074D9] fill-none',
}

type ChartElement =
  | { type: 'axes'; tickSize?: number; lineWidth?: number }
  | { type: 'scatter'; color: SeriesColor; data?: [number, number][]; radius?: number }
  | {
      type: 'line'
      color: SeriesColor
      start: [number, number]
      end: [number, number]
      lineWidth?: number
    }
  | { type: 'path'; color: SeriesColor; data?: [number, number][]; lineWidth?: number }

type ChartProps = {
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  defaultLineWidth?: number
  defaultRadius?: number
  elements?: ChartElement[]
}

export default function Chart({
  xMin = 0,
  xMax = 1,
  yMin = 0,
  yMax = 1,
  defaultLineWidth = 0.01,
  defaultRadius = 0.05,
  elements = [],
}: ChartProps) {
  const xSpan = xMax - xMin
  const ySpan = yMax - yMin

  return (
    <svg
      viewBox={`${xMin} ${yMin} ${xSpan} ${ySpan}`}
      className="-scale-y-100 bg-[#EEEEEE] dark:bg-[#222222]"
    >
      {elements.map((element, fi) => {
        switch (element.type) {
          case 'axes': {
            const { tickSize = 0, lineWidth = defaultLineWidth } = element
            const props = {
              className: 'stroke-[#555555] dark:stroke-[#666666] fill-none',
              strokeWidth: String(lineWidth),
            }
            return (
              <Fragment key={fi}>
                <line x1={String(xMin)} y1="0" x2={String(xMax)} y2="0" {...props} />
                <line x1="0" y1={String(yMin)} x2="0" y2={String(yMax)} {...props} />
                {tickSize > 0 ? (
                  <>
                    <line x1={String(-tickSize)} y1="-1" x2={String(tickSize)} y2="-1" {...props} />
                    <line x1={String(-tickSize)} y1="1" x2={String(tickSize)} y2="1" {...props} />
                    <line x1="-1" y1={String(-tickSize)} x2="-1" y2={String(tickSize)} {...props} />
                    <line x1="1" y1={String(-tickSize)} x2="1" y2={String(tickSize)} {...props} />
                  </>
                ) : null}
              </Fragment>
            )
          }
          case 'scatter': {
            const { color, data = [], radius = defaultRadius } = element
            return (
              <Fragment key={fi}>
                {data.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={String(x)}
                    cy={String(y)}
                    r={String(radius)}
                    className={fillColors[color]}
                  />
                ))}
              </Fragment>
            )
          }
          case 'line': {
            const { color, start, end, lineWidth = defaultLineWidth } = element
            const [x1, y1] = start
            const [x2, y2] = end
            return (
              <line
                key={fi}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={String(lineWidth)}
                className={strokeColors[color]}
              />
            )
          }
          case 'path': {
            const { color, data = [], lineWidth = defaultLineWidth } = element
            return (
              <path
                key={fi}
                d={`M ${data.map(([x, y]) => `${x} ${y}`).join(' L ')}`}
                strokeWidth={lineWidth}
                className={strokeColors[color]}
              />
            )
          }
        }
      })}
    </svg>
  )
}
