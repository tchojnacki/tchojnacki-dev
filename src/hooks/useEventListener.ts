import { useEffect, type RefObject } from 'react'

export function useEventListener<K extends keyof HTMLElementEventMap>(
  targetRef: RefObject<HTMLElement | null>,
  eventName: K,
  eventHandler: (e: HTMLElementEventMap[K]) => void,
) {
  useEffect(() => {
    const target = targetRef.current
    target?.addEventListener(eventName, eventHandler)
    return () => target?.removeEventListener(eventName, eventHandler)
  }, [targetRef.current])
}
