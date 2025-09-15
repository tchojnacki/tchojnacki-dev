import { useEffect, useRef } from "react"

export function useAnimationFrame(callback: (deltaTimeSeconds: number) => void) {
  const requestIdRef = useRef<number | null>(null)
  const lastTimeStampRef = useRef(0)

  useEffect(() => {
    function animationFrame(timeStamp: number) {
      callback((timeStamp - lastTimeStampRef.current) / 1000)
      lastTimeStampRef.current = timeStamp
      requestIdRef.current = requestAnimationFrame(animationFrame)
    }

    requestIdRef.current = requestAnimationFrame(animationFrame)
    return () => cancelAnimationFrame(requestIdRef.current!)
  }, [callback])
}
