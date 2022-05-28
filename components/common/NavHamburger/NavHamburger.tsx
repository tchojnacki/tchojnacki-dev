import classNames from 'classnames'

import styles from './NavHamburger.module.scss'

interface NavHamburgerProps {
  menuOpen: boolean
  toggle: () => void
  mobileOnly?: boolean
}

export function NavHamburger({ menuOpen, toggle, mobileOnly }: NavHamburgerProps) {
  return (
    <button
      className={classNames(styles.hamburger, { [styles.mobileOnly]: mobileOnly })}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? 'Close' : 'Open'}
      onClick={toggle}
    >
      <div />
      <div className={styles.twoPart} />
      <div />
    </button>
  )
}
