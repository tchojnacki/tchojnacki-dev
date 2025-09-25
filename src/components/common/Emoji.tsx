import type { ImageMetadata } from "astro"

import eyes from "~/assets/emojis/eyes.svg?no-inline"
import wave from "~/assets/emojis/wave.svg?no-inline"

function asset(text: string): ImageMetadata | string {
  switch (text) {
    case "👀":
      return eyes
    case "👋":
      return wave
    default:
      throw new Error(`Unsupported emoji: ${text}`)
  }
}

// Makes assets work in both Astro and Vite contexts
function source(asset: ImageMetadata | string): string {
  if (typeof asset === "string") return asset
  return asset.src
}

interface EmojiProps {
  text: string
}

export default function Emoji({ text }: EmojiProps) {
  console.log(eyes)
  return (
    <img
      src={source(asset(text))}
      alt={text}
      draggable="false"
      className="inline-block h-[1em] w-[1em] align-[-0.125em]"
    />
  )
}
