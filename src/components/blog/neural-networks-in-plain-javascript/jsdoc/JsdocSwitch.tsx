import { useStore } from '@nanostores/react'
import { useId } from 'react'
import { isJsdocShown } from '~/components/blog/neural-networks-in-plain-javascript/jsdoc/store'

export default function JsdocSwitch() {
  const id = useId()
  const $isJsdocShown = useStore(isJsdocShown)

  return (
    <label htmlFor={id} className="mx-auto my-1 flex items-center justify-center gap-2">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={$isJsdocShown}
        autoComplete="off"
        onChange={e => isJsdocShown.set(e.target.checked)}
      />
      Enable JSDoc type annotations in code snippets.
    </label>
  )
}
