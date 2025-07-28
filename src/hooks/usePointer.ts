import type { RefObject } from 'react'
import { useEventListener } from './useEventListener'

export function usePointerStart(target: RefObject<HTMLElement | null>, handler: () => any) {
  useEventListener(target, 'mousedown', handler)
  useEventListener(target, 'touchstart', event => {
    event.preventDefault()
    handler()
  })
}

export function usePointerStop(target: RefObject<HTMLElement | null>, handler: () => any) {
  useEventListener(target, 'pointerup', handler)
  useEventListener(target, 'pointerleave', handler)
}
