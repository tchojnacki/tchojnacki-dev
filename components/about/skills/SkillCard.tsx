import { SimpleIcon } from 'simple-icons'

import SimpleIconSvg from '@/components/common/SimpleIconSvg'

import styles from '@/styles/about/skills/SkillCard.module.scss'

interface SkillCardProps {
  name: string
  icon: SimpleIcon
}

export default function SkillCard({ name, icon }: SkillCardProps) {
  return (
    <div className={styles.card}>
      <h5>{name}</h5>
      <SimpleIconSvg icon={icon} />
    </div>
  )
}
