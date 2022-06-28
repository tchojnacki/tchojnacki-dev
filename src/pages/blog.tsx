import { Emoji, ErrorPage } from 'components'

export default function Blog() {
  return (
    <ErrorPage code={503}>
      Under Construction <Emoji>🏗</Emoji>
    </ErrorPage>
  )
}
