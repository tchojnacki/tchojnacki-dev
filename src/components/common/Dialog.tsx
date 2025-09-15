import { useLayoutEffect, useRef, type DialogHTMLAttributes, type PropsWithChildren } from "react"

type DialogProps = PropsWithChildren<DialogHTMLAttributes<HTMLDialogElement> & { open?: boolean }>

export default function Dialog({ open = false, children, ...props }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useLayoutEffect(() => {
    if (open) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [open])

  return (
    <dialog ref={ref} {...props}>
      {children}
    </dialog>
  )
}
