import { IconX } from "@tabler/icons-react"
import { Fragment, useId, useState, type ReactNode } from "react"

import CtaButton from "~/components/common/CtaButton"
import Dialog from "~/components/common/Dialog"
import Link from "~/components/common/Link"
import { statement } from "~/consts/hiring"
import { cn } from "~/lib/cn"

const s = "font-bold text-neutral-1000 dark:text-neutral-0"

export default function HiringDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()

  return (
    <>
      <CtaButton label="Hire me" action={() => setIsOpen(true)} />
      <Dialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        aria-labelledby={titleId}
        className={cn(
          "dark:bg-neudigo-950 bg-neudigo-50 text-neutral-900 dark:text-neutral-100",
          "backdrop:bg-neutral-1000/50 m-auto max-w-[55ch] rounded-3xl text-left shadow-xl",
          "w-[calc(100%-1rem)] sm:w-full",
        )}
      >
        <header
          className={cn(
            "text-neutral-1000 dark:text-neutral-0 flex justify-between bg-indigo-100 text-xl font-bold dark:bg-indigo-900",
            "p-4 sm:px-6",
          )}
        >
          <span id={titleId}>Looking for work</span>
          <button type="button" aria-label="Close" onClick={() => setIsOpen(false)}>
            <IconX role="presentation" />
          </button>
        </header>
        <p className="p-4 text-neutral-600 sm:p-6 sm:text-justify sm:hyphens-auto dark:text-neutral-400">
          {statement.map(p => {
            let node: ReactNode = p.t
            if (p.a) node = <Link href={p.a}>{node}</Link>
            if (p.b) node = <strong className={s}>{node}</strong>
            return <Fragment key={p.t}>{node}</Fragment>
          })}
        </p>
      </Dialog>
    </>
  )
}
