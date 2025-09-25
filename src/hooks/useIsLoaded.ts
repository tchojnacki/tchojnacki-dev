import { useReducer } from "react"

export function useIsLoaded() {
  const [isLoaded, handleLoad] = useReducer(() => true, false)

  const imgRef = (node: HTMLImageElement) => {
    if (node.complete) return handleLoad()

    node.addEventListener("load", handleLoad)
    return () => {
      node.removeEventListener("load", handleLoad)
    }
  }

  return { isLoaded, imgRef }
}
