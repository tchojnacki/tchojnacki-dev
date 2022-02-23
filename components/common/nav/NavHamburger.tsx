import styles from '@/styles/common/nav/NavHamburger.module.scss'

interface NavHamburgerProps {
  menuOpen: boolean
  toggle: () => void
}

export default function NavHamburger({ menuOpen, toggle }: NavHamburgerProps) {
  return (
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
}
