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
      <main className="mt-[calc(-1*theme(spacing.nav-height))] grid min-h-[100vh] place-items-center p-4">
        <header className={classNames('text-center', onLoad.enter, onLoad.scaling)}>
          <h1 className="mb-4 animate-errshake text-6xl font-bold text-indigo-11 motion-reduce:animate-none">
            {code}
          </h1>
          <h2 className="text-3xl">{children}</h2>
        </header>
      </main>
    </>
  )
}
