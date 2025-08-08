import eyes from '~/assets/emojis/eyes.svg'
import wave from '~/assets/emojis/wave.svg'

function source(text: string): string {
  switch (text) {
    case '👀':
      return eyes.src
    case '👋':
      return wave.src
    default:
      throw new Error(`Unsupported emoji: ${text}`)
  }
}

interface EmojiProps {
  text: string
  size?: number
}

export default function Emoji({ text, size }: EmojiProps) {
  return (
    <img
      src={source(text)}
      alt={text}
      width={size}
      height={size}
      draggable="false"
      className="inline-block h-[1em] align-[-0.125em]"
    />
  )
}
