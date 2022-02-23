import React from 'react'

import { useTypewriter } from '@/util/hooks/useTypewriter'

import styles from '@/styles/about/HeroTypewriter.module.scss'

const TYPEWRITER_TEXTS = ['software engineer.', 'student.', 'frontend developer.']

const HeroTypewriter = () => {
  const text = useTypewriter(TYPEWRITER_TEXTS, {
    type: 100,
    beforeTyping: 500,
    beforeErasing: 3000,
  })

  return <span className={styles.text}>{text}</span>
}

export default HeroTypewriter
