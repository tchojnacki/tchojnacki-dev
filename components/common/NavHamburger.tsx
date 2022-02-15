import styles from '@/styles/common/NavHamburger.module.scss'

interface NavHamburgerProps {
  menuOpen: boolean
  toggle: () => void
}

const NavHamburger = ({ menuOpen, toggle }: NavHamburgerProps) => (
  <button
    className={styles.hamburger}
    aria-expanded={menuOpen}
    aria-label={menuOpen ? 'Close' : 'Open'}
    onClick={toggle}
  >
    <div />
    <div className={styles.twoPart} />
    <div />
  </button>
)

export default NavHamburger
