import twemoji from 'twemoji'

interface EmojiProps {
  text: string
  size?: number
}

export default function Emoji({ text, size }: EmojiProps) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: twemoji.parse(text, {
          folder: 'svg',
          ext: '.svg',
          className: 'inline-block h-[1em] align-[-0.125em]',
          attributes: size
            ? () => ({ width: size.toString(), height: size.toString() })
            : () => ({}),
        }),
      }}
    />
  )
}
