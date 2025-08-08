import { useEffect, type RefObject } from "react"

export function useEventListener<K extends keyof HTMLElementEventMap>(
  targetRef: RefObject<HTMLElement | null>,
  eventName: K,
  eventHandler: (e: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions,
) {
  useEffect(() => {
    const target = targetRef.current
    target?.addEventListener(eventName, eventHandler, options)
    return () => target?.removeEventListener(eventName, eventHandler)
  }, [targetRef.current])
}
