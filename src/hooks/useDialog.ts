import { useEffect, useRef, useState } from 'react'

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const dialogRef = useRef<HTMLDialogElement>(null)

  const toggleDialog = () => {
    if (!isOpen) {
      dialogRef.current?.showModal()
      setIsOpen(true)
      document.body.classList.add('overflow-hidden')
    } else {
      dialogRef.current?.close()
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current

    const onCloseHandler = () => {
      setIsOpen(false)
      document.body.classList.remove('overflow-hidden')
    }

    const onClickHandler = (e: MouseEvent) => {
      if (e.target === e.currentTarget || e.target instanceof HTMLAnchorElement) {
        dialog?.close()
      }
    }

    dialog?.addEventListener('close', onCloseHandler)
    dialog?.addEventListener('click', onClickHandler)

    return () => {
      dialog?.removeEventListener('close', onCloseHandler)
      dialog?.removeEventListener('click', onClickHandler)
    }
  }, [])

  return { isOpen, dialogRef, toggleDialog }
}
