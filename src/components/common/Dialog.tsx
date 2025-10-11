import { useLayoutEffect, useRef, type HTMLAttributes } from "react"

type DialogProps = Omit<HTMLAttributes<HTMLDialogElement>, "open"> & {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function Dialog({ isOpen, setIsOpen, children, ...props }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  useLayoutEffect(() => {
    if (isOpen) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [isOpen])

  return (
    <dialog ref={ref} onCancel={() => setIsOpen(false)} {...props}>
      {children}
    </dialog>
  )
}
