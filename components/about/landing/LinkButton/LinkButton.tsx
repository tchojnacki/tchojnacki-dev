import Link from 'next/link'

import styles from './LinkButton.module.scss'

interface LinkButtonProps {
  children: string
  href: string
}

export function LinkButton({ children, href }: LinkButtonProps) {
  return (
    <Link href={href}>
      <a className={styles.button}>{children}</a>
    </Link>
  )
}
