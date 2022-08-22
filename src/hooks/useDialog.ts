import useEvent from '@use-it/event-listener'
import { useRef, useState } from 'react'

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

  useEvent(
    'close',
    () => {
      setIsOpen(false)
      document.body.classList.remove('overflow-hidden')
    },
    dialogRef.current
  )

  useEvent(
    'click',
    e => {
      if (e.target === e.currentTarget || e.target instanceof HTMLAnchorElement) {
        dialogRef.current?.close()
      }
    },
    dialogRef.current
  )

  return { isOpen, dialogRef, toggleDialog }
}
