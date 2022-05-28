import React from 'react'

import styles from './HeroTypewriter.module.scss'
import { useTypewriter } from './useTypewriter'

const TYPEWRITER_TEXTS = ['software engineer.', 'student.', 'frontend developer.']

export function HeroTypewriter() {
  const text = useTypewriter(TYPEWRITER_TEXTS, {
    type: 100,
    beforeTyping: 500,
    beforeErasing: 3000,
  })

  return <span className={styles.text}>{text}</span>
}
