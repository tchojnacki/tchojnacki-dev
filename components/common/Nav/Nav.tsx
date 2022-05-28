import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import onLoad from '@/styles/onLoad.module.scss'

import { NavHamburger } from '../NavHamburger'
import styles from './Nav.module.scss'

interface NavLinkProps {
  href: string
  children: string
}

function NavLink({ href, children }: NavLinkProps) {
  const router = useRouter()

  return (
    <Link href={href}>
      <a className={classNames(styles.navLink, { [styles.active]: router.pathname === href })}>
        {children}
      </a>
    </Link>
  )
}

function NavLinks() {
  return (
    <ul>
      <li>
        <NavLink href="/">About</NavLink>
      </li>
      <li>
        <NavLink href="/projects">Projects</NavLink>
      </li>
      <li>
        <NavLink href="/blog">Blog</NavLink>
      </li>
    </ul>
  )
}

function useDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const toggleDialog = () => {
    if (!isOpen) {
      dialogRef.current?.showModal()
      setIsOpen(true)
      document.body.classList.add(styles.bodyScrollHidden)
    } else {
      dialogRef.current?.close()
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current

    const onCloseHandler = () => {
      setIsOpen(false)
      document.body.classList.remove(styles.bodyScrollHidden)
    }

    const onClickHandler = (e: MouseEvent) => {
      if (e.target === e.currentTarget || e.target instanceof HTMLAnchorElement) {
        dialog?.close()
      }
    }

    dialog?.addEventListener('close', onCloseHandler)
    dialog?.addEventListener('click', onClickHandler)

    return () => {
      dialog?.removeEventListener('close', onCloseHandler)
      dialog?.removeEventListener('click', onClickHandler)
    }
  }, [])

  return { isOpen, dialogRef, toggleDialog }
}

export function Nav() {
  const { isOpen, toggleDialog, dialogRef } = useDialog()

  return (
    <>
      <dialog className={styles.dialog} ref={dialogRef}>
        <nav>
          <NavHamburger menuOpen={isOpen} toggle={toggleDialog} />
          <NavLinks />
        </nav>
      </dialog>
      <nav className={classNames(styles.nav, onLoad.enter, onLoad.fromTop)}>
        <NavLinks />
        <NavHamburger mobileOnly menuOpen={isOpen} toggle={toggleDialog} />
      </nav>
    </>
  )
}