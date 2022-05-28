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
