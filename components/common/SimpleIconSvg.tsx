import { SimpleIcon } from 'simple-icons'

interface SimpleIconProps {
  icon: SimpleIcon
}

const SimpleIconSvg = ({ icon }: SimpleIconProps) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>{icon.title}</title>
    <path d={icon.path} />
  </svg>
)

export default SimpleIconSvg
