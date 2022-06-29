import twemoji from 'twemoji'

interface EmojiProps {
  children: string
}

export function Emoji({ children }: EmojiProps) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: twemoji.parse(children, {
          folder: 'svg',
          ext: '.svg',
          className: 'inline-block h-[1em] align-[-0.125em]',
        }),
      }}
    />
  )
}
