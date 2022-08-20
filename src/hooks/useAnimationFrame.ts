import { useCallback, useEffect, useRef } from 'react'

export function useAnimationFrame(callback: (deltaTimeSeconds: number) => void) {
  const requestIdRef = useRef<number | null>(null)
  const lastTimeStampRef = useRef<number>(0)

  const animationFrame = useCallback(
    (highResTimeStamp: number) => {
      callback((highResTimeStamp - lastTimeStampRef.current) / 1000)
      lastTimeStampRef.current = highResTimeStamp
      requestIdRef.current = requestAnimationFrame(animationFrame)
    },
    [callback]
  )

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(animationFrame)
    return () => cancelAnimationFrame(requestIdRef.current!)
  }, [animationFrame])
}
