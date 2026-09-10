import { cn } from "~/lib/cn"

import styles from "./TestCase.module.css"

export const CASE_HEIGHT_PX = 100
export const CASE_PX_PER_S = 100

type TestCaseProps = {
  name?: string
  x?: number
  y?: number
  delay?: number
  duration?: number
  fail?: boolean
}

export default function TestCase({
  name = "",
  x = 0,
  y = 0,
  delay = 0.0,
  duration = 1.0,
  fail = false,
}: TestCaseProps) {
  const d = { width: duration * CASE_PX_PER_S, height: CASE_HEIGHT_PX }
  return (
    <g
      transform={`translate(${x}, ${y})`}
      style={{
        "--width": `${d.width}px`,
        "--duration": `${duration}s`,
        "--delay": `${delay}s`,
      }}
      className={cn(
        "[--fail-color:#ff6467] [--pass-color:#b9f8cf] [--progress-color:#8ec5ff]",
        "dark:[--fail-color:#9f0712] dark:[--pass-color:#002c22] dark:[--progress-color:#1447e6]",
      )}
    >
      <rect {...d} className="fill-indigo-100 dark:fill-indigo-900" />
      <rect {...d} className={styles.animateTcpProgress} />
      <rect {...d} className={fail ? styles.animateTcpFail : styles.animateTcpPass} />
      <rect {...d} className="fill-transparent stroke-[#626264] stroke-3 dark:stroke-[#a7a6ae]" />
      <text
        x={d.width / 2}
        y={d.height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="24"
        className="fill-[currentColor]"
      >
        {name}
      </text>
    </g>
  )
}
