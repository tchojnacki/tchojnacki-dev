import styles from '@/styles/about/landing/Wave.module.scss'

export default function Wave() {
  return (
    <svg
      aria-hidden="true"
      className={styles.waveSvg}
      viewBox="0 0 1280 185"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        className={styles.wavePath}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 52.7916L53.3333 39.4789C106.667 26.1663 213.333 0 320 0C426.667 0 533.333 26.1663 640 52.7916C746.667 79.4169 853.333 105.583 960 101.452C1066.67 96.861 1173.33 61.5136 1226.67 44.0695L1280 26.1663V185H1226.67C1173.33 185 1066.67 185 960 185C853.333 185 746.667 185 640 185C533.333 185 426.667 185 320 185C213.333 185 106.667 185 53.3333 185H0V52.7916Z"
      />
    </svg>
  )
}
