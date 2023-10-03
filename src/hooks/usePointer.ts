import { useEventListener } from 'ahooks'
import type { RefObject } from 'react'

export function usePointerStart(target: RefObject<HTMLElement>, handler: () => any) {
  useEventListener('mousedown', handler, { target })
  useEventListener(
    'touchstart',
    event => {
      event.preventDefault()
      handler()
    },
    { target },
  )
}

export function usePointerStop(target: RefObject<HTMLElement>, handler: () => any) {
  useEventListener('pointerup', handler, { target })
  useEventListener('pointerleave', handler, { target })
}
