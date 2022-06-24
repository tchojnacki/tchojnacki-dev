import classNames from 'classnames'
import { ReactNode } from 'react'

import onLoad from '@/styles/onLoad.module.scss'

import { Title } from '../Title'
import styles from './ErrorPage.module.scss'

interface ErrorPageProps {
  code: number
  children: ReactNode
}

export function ErrorPage({ code, children }: ErrorPageProps) {
  return (
    <>
      <Title>{code.toString()}</Title>
      <main className="min-h-[100vh] mt-[calc(-1*theme(spacing.nav-height))] grid place-items-center p-4">
        <header className={classNames('text-center', onLoad.enter, onLoad.scaling)}>
          <h1 className="text-6xl mb-4 font-bold text-indigo-11 animate-errshake motion-reduce:animate-none">
            {code}
          </h1>
          <h2 className="text-3xl">{children}</h2>
        </header>
      </main>
    </>
  )
}
