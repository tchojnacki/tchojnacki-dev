import { useEffect, useState } from "react"

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect -- we want to cause a re-render
  useEffect(() => setIsMounted(true), [])
  return isMounted
}
