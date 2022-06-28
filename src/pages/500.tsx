import { Emoji, ErrorPage } from 'components'

export default function Error500() {
  return (
    <ErrorPage code={500}>
      Internal Server Error <Emoji>🥶</Emoji>
    </ErrorPage>
  )
}
