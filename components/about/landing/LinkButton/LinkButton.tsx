import Link from 'next/link'

import styles from '@/styles/about/landing/LinkButton.module.scss'

interface LinkButtonProps {
  children: string
  href: string
}

export default function LinkButton({ children, href }: LinkButtonProps) {
  return (
    <Link href={href}>
      <a className={styles.button}>{children}</a>
    </Link>
  )
}
