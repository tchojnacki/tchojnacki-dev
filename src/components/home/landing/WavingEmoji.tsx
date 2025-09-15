import clsx from "clsx"
import { useEffect, useState } from "react"

import Emoji from "~/components/common/Emoji"

const WAVING_DELAY = 1000

export default function WavingEmoji() {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsPlaying(true)
    }, WAVING_DELAY)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <button
      onClick={() => setIsPlaying(true)}
      onAnimationEnd={() => setIsPlaying(false)}
      className={clsx(
        "inline-block origin-[75%_75%] cursor-pointer",
        isPlaying && "motion-safe:animate-emojiwave",
      )}
    >
      <Emoji size={22} text="👋" />
    </button>
  )
}
