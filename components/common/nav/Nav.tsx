import NavHamburger from './NavHamburger'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import styles from '@/styles/common/nav/Nav.module.scss'
import onLoad from '@/styles/common/onLoad.module.scss'

interface NavLinkProps {
  href: string
  children: string
}

function NavLink({ href, children }: NavLinkProps) {
  const router = useRouter()

  return (
    <Link href={href}>
      <a className={classNames({ [styles.active]: router.pathname === href })}>{children}</a>
    </Link>
  )
}

function NavLinks() {
  return (
    <>
      <NavLink href="/">About</NavLink>
      <NavLink href="/projects">Projects</NavLink>
      <NavLink href="/blog">Blog</NavLink>
    </>
  )
}

function useDialog() {
  const [isOpen, setIsOpen] = React.useState(false)

  const dialogRef = React.useRef<HTMLDialogElement | null>(null)

  const toggleDialog = () => {
    if (!isOpen) {
      dialogRef.current?.showModal()
      setIsOpen(true)
      document.body.classList.add(styles.bodyScrollHidden)
    } else {
      dialogRef.current?.close()
    }
  }

  React.useEffect(() => {
    const dialog = dialogRef.current

    const onCloseHandler = () => {
      setIsOpen(false)
      document.body.classList.remove(styles.bodyScrollHidden)
    }

    dialog?.addEventListener('close', onCloseHandler)

    return () => {
      dialog?.removeEventListener('close', onCloseHandler)
    }
  }, [])

  return { isOpen, dialogRef, toggleDialog }
}

export default function Nav() {
  const { isOpen, toggleDialog, dialogRef } = useDialog()

  return (
    <>
      <dialog className={styles.dialog} ref={dialogRef}>
        <NavHamburger menuOpen={isOpen} toggle={toggleDialog} />
        <NavLinks />
      </dialog>
      <nav className={classNames(styles.nav, onLoad.enter, onLoad.fromTop)}>
        <NavLinks />
        <NavHamburger mobileOnly menuOpen={isOpen} toggle={toggleDialog} />
      </nav>
    </>
  )
}
