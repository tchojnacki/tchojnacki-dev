import { useEffect, useRef } from "react"

export function useAnimationFrame(callback: (deltaTimeSeconds: number) => void) {
  const requestIdRef = useRef<number | null>(null)
  const lastTimestampRef = useRef(0)

  useEffect(() => {
    function animationFrame(timestamp: number) {
      callback((timestamp - lastTimestampRef.current) / 1000)
      lastTimestampRef.current = timestamp
      requestIdRef.current = requestAnimationFrame(animationFrame)
    }

    requestIdRef.current = requestAnimationFrame(animationFrame)
    return () => {
      cancelAnimationFrame(requestIdRef.current!)
    }
  }, [callback])
}
