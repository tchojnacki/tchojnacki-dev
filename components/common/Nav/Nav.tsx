import classNames from 'classnames'

import onLoad from '@/styles/onLoad.module.scss'

import { NavHamburger } from '../NavHamburger'
import styles from './Nav.module.scss'
import { NavLinks } from './NavLinks'
import { useDialog } from './useDialog'

export function Nav() {
  const { isOpen, toggleDialog, dialogRef } = useDialog()

  return (
    <>
      <dialog
        className='flex flex-col justify-start items-end overflow-hidden mt-0 mr-0 mb-auto ml-auto \
          p-0 bg-pure-black/0 bg-[url("/img/menu-blob.svg")] bg-no-repeat bg-right-top bg-contain \
          backdrop:bg-pure-black/50 w-[100vmin] h-[100vmin] duration-500 \
          invisible opacity-0 max-w-0 max-h-0 rounded-bl-full \
          open:visible open:opacity-100 open:max-w-full open:max-h-full open:rounded-none'
        ref={dialogRef}
      >
        <nav className={classNames('p-[calc(theme(spacing.nav-height)/4)]', styles.dialogNav)}>
          <NavHamburger menuOpen={isOpen} toggle={toggleDialog} />
          <NavLinks />
        </nav>
      </dialog>
      <nav
        className={classNames(
          'p-[calc(theme(spacing.nav-height)/4)] flex justify-end sm:block',
          styles.nav,
          onLoad.enter,
          onLoad.fromTop
        )}
      >
        <NavLinks />
        <NavHamburger mobileOnly menuOpen={isOpen} toggle={toggleDialog} />
      </nav>
    </>
  )
}
