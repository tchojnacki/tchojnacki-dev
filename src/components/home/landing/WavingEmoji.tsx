import { useEffect, useState } from "react"

import Emoji from "~/components/common/Emoji"
import { cn } from "~/lib/cn"

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
      className={cn(
        "inline-block origin-[75%_75%] cursor-pointer",
        isPlaying && "motion-safe:animate-emojiwave",
      )}
    >
      <Emoji text="👋" />
    </button>
  )
}
