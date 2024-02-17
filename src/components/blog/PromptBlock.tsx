import type { PropsWithChildren } from 'react'

export default function PromptBlock({ children }: PropsWithChildren) {
  return (
    <pre className="my-2 flex overflow-x-auto rounded-md bg-[#24292e] p-1 font-mono text-neutral-200">
      <div className="select-none text-indigo-300">&gt; </div>
      <div>{children}</div>
    </pre>
  )
}
