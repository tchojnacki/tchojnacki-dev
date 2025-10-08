import clsx from "clsx"

import { useIsHydrated, usePrefersReducedMotion, useTechSphere } from "~/hooks"

interface TechSphereProps {
  skillNames: string[]
}

export default function TechSphere({ skillNames }: TechSphereProps) {
  const isHydrated = useIsHydrated()
  const prefersReducedMotion = usePrefersReducedMotion()

  const { canvasRef, canvasSize, handlers } = useTechSphere({ skillNames, prefersReducedMotion })

  return (
    <canvas
      role="presentation"
      className={clsx(
        "cursor-grab touch-none select-none active:cursor-grabbing",
        "transition-[opacity,_scale] ease-out will-change-[opacity,_scale] motion-safe:duration-500",
        isHydrated ? "scale-100 opacity-100" : "scale-0 opacity-0",
      )}
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      {...handlers}
    />
  )
}
