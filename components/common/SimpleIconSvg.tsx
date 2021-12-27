import { SimpleIcon } from 'simple-icons'

interface SimpleIconProps {
  icon: SimpleIcon
  size?: string
}

const SimpleIconSvg = ({ icon, size = '1rem' }: SimpleIconProps) => (
  <svg width={size} height={size} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>{icon.title}</title>
    <path d={icon.path} />
  </svg>
)

export default SimpleIconSvg
