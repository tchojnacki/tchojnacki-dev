import { Emoji, ErrorPage } from '@/components'

export default function Error404() {
  return (
    <ErrorPage code={404}>
      Not Found <Emoji>👀</Emoji>
    </ErrorPage>
  )
}
