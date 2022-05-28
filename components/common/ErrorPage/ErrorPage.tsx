import classNames from 'classnames'

import onLoad from '@/styles/onLoad.module.scss'

import { Title } from '../Title'
import styles from './ErrorPage.module.scss'

interface ErrorPageProps {
  code: number
  children: string
}

export function ErrorPage({ code, children }: ErrorPageProps) {
  return (
    <>
      <Title>{code.toString()}</Title>
      <main className={styles.errorPage}>
        <header className={classNames(styles.errorText, onLoad.enter, onLoad.scaling)}>
          <h1 className={styles.errorCode}>{code}</h1>
          <h2 className={styles.errorDescription}>{children}</h2>
        </header>
      </main>
    </>
  )
}
