import React from 'react'

export function useMouseOffsetX() {
  const [firstX, setFirstX] = React.useState<number | null>(null)
  const [currentXOffset, setCurrentXOffset] = React.useState(0)

  const handleMouseMove = React.useCallback(
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

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  React.useDebugValue(currentXOffset)

  return currentXOffset
}
