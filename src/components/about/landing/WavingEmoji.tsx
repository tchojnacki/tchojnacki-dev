import { useCallback, useEffect, useRef, useState } from 'react'

import { Emoji } from 'components/common'
import { classList } from 'utils'

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
      ref={ref}
      onClick={startPlaying}
      className={classList(
        'inline-block origin-[75%_75%] cursor-pointer',
        isPlaying && 'animate-emojiwave motion-reduce:animate-none'
      )}
    >
      <Emoji>👋</Emoji>
    </button>
  )
}
