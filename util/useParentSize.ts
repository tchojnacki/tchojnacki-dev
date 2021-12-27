import React from 'react'

export function useParentSize<ChildElem extends HTMLElement>() {
  const [size, setSize] = React.useState({ inlineSize: 0, blockSize: 0 })

  const childRef = React.useRef<ChildElem>(null)

  React.useEffect(() => {
    const parent = childRef.current?.parentElement

    if (!parent) {
      return
    }

    const resizeObserver = new ResizeObserver(event => setSize(event[0].contentBoxSize[0]))

    resizeObserver.observe(parent)

    return () => resizeObserver.unobserve(parent)
  }, [])

  return { width: size.inlineSize, height: size.blockSize, childRef }
}
