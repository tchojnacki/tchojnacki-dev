import React from 'react'
import styles from '@/styles/about/WavingEmoji.module.scss'
import classNames from 'classnames'

const WAVING_DELAY = 1000

const WavingEmoji = () => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const startPlaying = React.useCallback(() => setIsPlaying(true), [])
  const stopPlaying = React.useCallback(() => setIsPlaying(false), [])

  const ref = React.useRef<HTMLSpanElement>(null)
  React.useEffect(() => {
    const elem = ref.current
    elem?.addEventListener('animationend', stopPlaying)

    return () => elem?.removeEventListener('animationend', stopPlaying)
  }, [stopPlaying])

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsPlaying(true)
    }, WAVING_DELAY)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <span
      ref={ref}
      onClick={startPlaying}
      className={classNames(styles.container, { [styles.playing]: isPlaying })}
    >
      👋
    </span>
  )
}

export default WavingEmoji
