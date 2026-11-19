import { Fragment } from "react"

import Link from "~/components/common/Link"

interface CiteProps {
  ordinal: number | number[]
}

export default function Cite({ ordinal }: CiteProps) {
  const numbers = Array.isArray(ordinal) ? ordinal : [ordinal]

  return (
    <>
      &nbsp;[
      {numbers.map((n, i) => (
        <Fragment key={n}>
          <Link href={`#cite-${n}`}>{n}</Link>
          {i === numbers.length - 1 ? null : <>,&nbsp;</>}
        </Fragment>
      ))}
      ]
    </>
  )
}
