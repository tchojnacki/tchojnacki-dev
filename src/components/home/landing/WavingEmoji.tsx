import useEvent from '@use-it/event-listener'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Emoji } from 'components'

const WAVING_DELAY = 1000

export function WavingEmoji() {
  const [isPlaying, setIsPlaying] = useState(false)
  const startPlaying = useCallback(() => setIsPlaying(true), [])
  const stopPlaying = useCallback(() => setIsPlaying(false), [])

  const ref = useRef<HTMLButtonElement>(null)
  useEvent('animationend', stopPlaying, ref.current)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsPlaying(true)
    }, WAVING_DELAY)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <button
      ref={ref}
      onClick={startPlaying}
      className={clsx(
        'inline-block origin-[75%_75%] cursor-pointer',
        isPlaying && 'animate-emojiwave motion-reduce:animate-none'
      )}
    >
      <Emoji size={24}>👋</Emoji>
    </button>
  )
}
