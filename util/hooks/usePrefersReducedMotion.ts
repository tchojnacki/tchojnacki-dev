import React from 'react'

const QUERY = '(prefers-reduced-motion: no-preference)'

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(true)

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)
    setPrefersReducedMotion(!mediaQueryList.matches)

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches)
    }

    mediaQueryList.addEventListener('change', listener)

    return () => mediaQueryList.removeEventListener('change', listener)
  }, [])

  React.useDebugValue(prefersReducedMotion)

  return prefersReducedMotion
}
