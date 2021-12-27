import Link from 'next/link'
import styles from '@/styles/about/LinkButton.module.css'

interface LinkButtonProps {
  children: string
  href: string
}

const LinkButton = ({ children, href }: LinkButtonProps) => (
  <Link href={href}>
    <a className={styles.button}>{children}</a>
  </Link>
)

export default LinkButton
