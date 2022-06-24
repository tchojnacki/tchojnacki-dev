import twemoji from 'twemoji'

import styles from './Emoji.module.scss'

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
          className: styles.emoji,
        }),
      }}
    />
  )
}
