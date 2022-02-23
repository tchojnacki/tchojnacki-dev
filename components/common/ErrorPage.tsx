import classNames from 'classnames'

import styles from '@/styles/common/ErrorPage.module.scss'
import onLoad from '@/styles/common/onLoad.module.scss'

interface ErrorPageProps {
  code: number
  children: string
}

const ErrorPage = ({ code, children }: ErrorPageProps) => (
  <main className={styles.errorPage}>
    <header className={classNames(styles.errorText, onLoad.enter, onLoad.scaling)}>
      <h1 className={styles.errorCode}>{code}</h1>
      <h2 className={styles.errorDescription}>{children}</h2>
    </header>
  </main>
)

export default ErrorPage
