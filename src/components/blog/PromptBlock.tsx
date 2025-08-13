import { IconChevronRight } from "@tabler/icons-react"
import type { PropsWithChildren } from "react"

export default function PromptBlock({ children }: PropsWithChildren) {
  return (
    <pre className="my-2 flex overflow-x-auto rounded-md bg-[#24292e] p-1 font-mono text-neutral-200">
      <IconChevronRight className="my-1 mr-1 text-indigo-300" size={20} role="presentation" />
      <div>{children}</div>
    </pre>
  )
}
