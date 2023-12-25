import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

import Emoji from '~/components/common/Emoji'
import { useEventListener } from '~/hooks'

const WAVING_DELAY = 1000

export default function WavingEmoji() {
  const [isPlaying, setIsPlaying] = useState(false)
  const startPlaying = useCallback(() => setIsPlaying(true), [])
  const stopPlaying = useCallback(() => setIsPlaying(false), [])

  const ref = useRef<HTMLButtonElement>(null)
  useEventListener(ref, 'animationend', stopPlaying)

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
        isPlaying && 'animate-emojiwave motion-reduce:animate-none',
      )}
    >
      <Emoji size={24} text="👋" />
    </button>
  )
}
