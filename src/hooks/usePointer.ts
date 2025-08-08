import type { RefObject } from 'react'

import { useEventListener } from './useEventListener'

export function usePointerStart(target: RefObject<HTMLElement | null>, handler: () => any) {
  useEventListener(target, 'mousedown', handler, { passive: true })
  useEventListener(
    target,
    'touchstart',
    event => {
      event.preventDefault()
      handler()
    },
    { passive: false },
  )
}

export function usePointerStop(target: RefObject<HTMLElement | null>, handler: () => any) {
  useEventListener(target, 'pointerup', handler, { passive: true })
  useEventListener(target, 'pointerleave', handler, { passive: true })
}
