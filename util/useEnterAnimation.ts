import React from 'react'
import styles from '@/styles/common/useEnterAnimation.module.css'

type EnterDirection = 'left' | 'top' | 'right'

const directionClasses = Object.freeze({
  left: styles.enterFromLeft,
  top: styles.enterFromTop,
  right: styles.enterFromRight,
})

export function useEnterAnimation(from: EnterDirection) {
  const elemRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    elemRef.current?.classList.add(directionClasses[from])

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        elemRef.current?.classList.add(styles.enterAnimate)
      })
    })
  }, [from])

  return elemRef
}
