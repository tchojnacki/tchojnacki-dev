import useEvent from '@use-it/event-listener'
import { RefObject } from 'react'

export function usePointerStart(ref: RefObject<HTMLElement>, handler: () => any) {
  useEvent('mousedown', handler, ref.current)
  useEvent(
    'touchstart',
    event => {
      event.preventDefault()
      handler()
    },
    ref.current
  )
}

export function usePointerStop(ref: RefObject<HTMLElement>, handler: () => any) {
  useEvent('pointerup', handler, ref.current)
  useEvent('pointerleave', handler, ref.current)
}
