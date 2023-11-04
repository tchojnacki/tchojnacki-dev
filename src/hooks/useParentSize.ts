import { useDebugValue, useEffect, useRef, useState } from 'react'

export function useParentSize<ChildElem extends HTMLElement>() {
  const [size, setSize] = useState({ inlineSize: 0, blockSize: 0 })

  const childRef = useRef<ChildElem>(null)

  useEffect(() => {
    let parent = childRef.current?.parentElement
    while (parent && getComputedStyle(parent).display === 'contents') {
      parent = parent.parentElement
    }

    if (!parent) {
      return
    }

    const resizeObserver = new ResizeObserver(event => setSize(event[0]!.contentBoxSize[0]!))

    resizeObserver.observe(parent)

    return () => resizeObserver.unobserve(parent as HTMLElement)
  }, [])

  useDebugValue(`${size.inlineSize} x ${size.blockSize}`)

  return { width: size.inlineSize, height: size.blockSize, childRef }
}
