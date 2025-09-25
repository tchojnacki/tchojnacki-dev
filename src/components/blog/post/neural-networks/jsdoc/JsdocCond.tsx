import { useStore } from "@nanostores/react"
import type { PropsWithChildren } from "react"

import { isJsdocShown } from "./store"

export default function JsdocCond({ children, when }: PropsWithChildren<{ when: boolean }>) {
  const $isJsdocShown = useStore(isJsdocShown)
  const isVisible = $isJsdocShown === when
  return (
    <div className={isVisible ? "contents" : "hidden"} aria-hidden={isVisible ? undefined : true}>
      {children}
    </div>
  )
}
