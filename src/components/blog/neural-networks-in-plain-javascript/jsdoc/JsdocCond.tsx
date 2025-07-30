import { useStore } from '@nanostores/react'
import type { PropsWithChildren } from 'react'
import { isJsdocShown } from '~/components/blog/neural-networks-in-plain-javascript/jsdoc/store'

export default function JsdocCond({ children, when }: PropsWithChildren<{ when: boolean }>) {
  const $isJsdocShown = useStore(isJsdocShown)
  return $isJsdocShown === when ? children : null
}
