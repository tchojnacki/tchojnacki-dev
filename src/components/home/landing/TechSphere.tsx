import clsx from "clsx"

import { useIsMounted, usePrefersReducedMotion, useTechSphere } from "~/hooks"

interface TechSphereProps {
  skillNames: string[]
}

export default function TechSphere({ skillNames }: TechSphereProps) {
  const isMounted = useIsMounted()
  const prefersReducedMotion = usePrefersReducedMotion()

  const { canvasRef, canvasSize, handlers } = useTechSphere({ skillNames, prefersReducedMotion })

  return (
    <canvas
      role="presentation"
      className={clsx(
        "cursor-grab touch-none select-none active:cursor-grabbing",
        "transition-[scale,_opacity] ease-out will-change-[scale,_opacity] motion-safe:duration-500",
        isMounted ? "scale-100 opacity-100" : "scale-0 opacity-0",
      )}
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      {...handlers}
    />
  )
}
