import { useCallback, useDebugValue, useEffect, useState } from 'react'

export function useMouseOffsetX() {
  const [firstX, setFirstX] = useState<number | null>(null)
  const [currentXOffset, setCurrentXOffset] = useState(0)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      let localFirstX = firstX

      if (localFirstX === null) {
        localFirstX = e.pageX - e.movementX
        setFirstX(localFirstX)
      }

      setCurrentXOffset(e.pageX - localFirstX)
    },
    [firstX]
  )

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  useDebugValue(currentXOffset)

  return currentXOffset
}
