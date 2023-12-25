import { useRef, useState } from 'react'
import { useEventListener } from './useEventListener'

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

  useEventListener(dialogRef, 'close', () => {
    setIsOpen(false)
    document.body.classList.remove('overflow-hidden')
  })

  useEventListener(dialogRef, 'click', e => {
    if (e.target === e.currentTarget || e.target instanceof HTMLAnchorElement) {
      dialogRef.current?.close()
    }
  })

  return { isOpen, dialogRef, toggleDialog }
}
