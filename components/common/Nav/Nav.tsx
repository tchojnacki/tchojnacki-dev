import { NavHamburger } from '../NavHamburger'
import { NavLinkList } from './NavLinkList'
import { useDialog } from './useDialog'

export function Nav() {
  const { isOpen, toggleDialog, dialogRef } = useDialog()

  return (
    <>
      <dialog
        className='invisible mt-0 mr-0 mb-auto ml-auto flex
          h-[100vmin] max-h-0 w-[100vmin] max-w-0 flex-col items-end justify-start
          overflow-hidden rounded-bl-full bg-pure-black/0 bg-[url("/img/menu-blob.svg")] bg-contain
          bg-right-top bg-no-repeat p-0 opacity-0 duration-500 backdrop:bg-pure-black/50
          open:visible open:max-h-full open:max-w-full open:rounded-none open:opacity-100'
        ref={dialogRef}
      >
        <nav className="p-[calc(theme(spacing.nav-height)/4)]">
          <NavHamburger menuOpen={isOpen} toggle={toggleDialog} />
          <NavLinkList listClassName="mt-4" itemClassName="px-4 py-3 text-2xl text-right" />
        </nav>
      </dialog>
      <nav className="flex h-[theme(spacing.nav-height)] animate-enteronload justify-end p-[calc(theme(spacing.nav-height)/4)] onenter-fromtop motion-reduce:animate-none sm:block">
        <NavLinkList
          listClassName="hidden sm:flex justify-center gap-16"
          itemClassName="px-4 py-[calc(theme(spacing.nav-height)/8)] rounded-lg hover:bg-pure-white/5"
        />
        <NavHamburger mobileOnly menuOpen={isOpen} toggle={toggleDialog} />
      </nav>
    </>
  )
}
