import classNames from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'

import styles from './WavingEmoji.module.scss'

const WAVING_DELAY = 1000

export function WavingEmoji() {
  const [isPlaying, setIsPlaying] = useState(false)
  const startPlaying = useCallback(() => setIsPlaying(true), [])
  const stopPlaying = useCallback(() => setIsPlaying(false), [])

  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const elem = ref.current
    elem?.addEventListener('animationend', stopPlaying)

    return () => elem?.removeEventListener('animationend', stopPlaying)
  }, [stopPlaying])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsPlaying(true)
    }, WAVING_DELAY)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <button
      aria-label=":wave:"
      ref={ref}
      onClick={startPlaying}
      className={classNames(styles.container, { [styles.playing]: isPlaying })}
    >
      👋
    </button>
  )
}
