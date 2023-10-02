import twemoji from 'twemoji'

interface EmojiProps {
  children: string
  size?: number
}

export function Emoji({ children, size }: EmojiProps) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: twemoji.parse(children, {
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
