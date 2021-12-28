import React from 'react'
import { useTypewriter } from '@/util/useTypewriter'
import styles from '@/styles/about/HeroTypewriter.module.css'

const HeroTypewriter = () => {
  const text = useTypewriter(['software engineer.', 'student.', 'frontend developer.'], {
    type: 100,
    beforeTyping: 500,
    beforeErasing: 3000,
  })

  return <span className={styles.text}>{text}</span>
}

export default HeroTypewriter
