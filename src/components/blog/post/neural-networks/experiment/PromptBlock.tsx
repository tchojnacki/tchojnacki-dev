import { IconChevronRight } from "@tabler/icons-react"
import type { PropsWithChildren } from "react"

export default function PromptBlock({ children }: PropsWithChildren) {
  return (
    <pre className="bg-ghl-background border-ghl-border dark:bg-ghd-background dark:border-ghd-border my-2 flex overflow-x-auto rounded-md border-[1.5px] p-1 font-mono">
      <IconChevronRight
        className="my-1 mr-1 text-indigo-700 dark:text-indigo-300"
        size={20}
        role="presentation"
      />
      <div>{children}</div>
    </pre>
  )
}
