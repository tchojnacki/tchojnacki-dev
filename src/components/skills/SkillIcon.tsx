import type { Skill } from "~/content"

interface SkillIconProps {
  skill: Skill
  className?: string
  decoration?: boolean
}

export default function SkillIcon({
  skill: { icon, name },
  className,
  decoration,
}: SkillIconProps) {
  return (
    <svg
      className={className}
      role={decoration ? "presentation" : "img"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {decoration ? null : <title>{name}</title>}
      {typeof icon === "string" ? (
        <text
          x="50%"
          y="50%"
          fontSize={24}
          fontWeight="bold"
          fontFamily="monospace"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-current select-none"
        >
          {name.charAt(0)}
        </text>
      ) : (
        <path className="fill-current" d={icon.path} />
      )}
    </svg>
  )
}
