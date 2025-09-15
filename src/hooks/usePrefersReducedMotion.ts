// Adapted from: https://www.joshwcomeau.com/react/prefers-reduced-motion

import { useEffect, useState } from "react"

const QUERY = "(prefers-reduced-motion: no-preference)"

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)
    setPrefersReducedMotion(!mediaQueryList.matches)

    function listener(event: MediaQueryListEvent) {
      setPrefersReducedMotion(!event.matches)
    }

    mediaQueryList.addEventListener("change", listener)

    return () => mediaQueryList.removeEventListener("change", listener)
  }, [])

  return prefersReducedMotion
}
