import { useDialog } from 'hooks'

import { Sun } from '../icons'
import { NavHamburger } from './NavHamburger'
import { NavLinkList } from './NavLinkList'

export function Nav() {
  const { isOpen, toggleDialog, dialogRef } = useDialog()

  return (
    <>
      <dialog
        className='invisible mt-0 mr-0 mb-auto ml-auto flex
          h-[100vmin] max-h-16 w-[100vmin] max-w-16 flex-col items-end justify-start
          overflow-hidden rounded-bl-full bg-pure-black/0 bg-[url("/img/menu-blob.svg")] bg-contain
          bg-right-top bg-no-repeat p-0 opacity-0 duration-500 backdrop:bg-pure-black/50
          open:visible open:max-h-full open:max-w-full open:rounded-none open:opacity-100'
        ref={dialogRef}
      >
        <nav className="p-[calc(theme(spacing.nav-height)/4)]">
          <NavHamburger menuOpen={isOpen} toggle={toggleDialog} className="ml-auto" />
          <NavLinkList listClassName="mt-4" itemClassName="px-4 py-3 text-2xl text-right" />
        </nav>
      </dialog>
      <nav className="flex justify-end items-center h-[theme(spacing.nav-height)] animate-enteronload p-[calc(theme(spacing.nav-height)/4)] onenter-fromtop motion-reduce:animate-none">
        <NavLinkList
          listClassName="hidden sm:flex justify-center gap-16 mx-auto"
          itemClassName="px-4 py-[calc(theme(spacing.nav-height)/8)] rounded-lg hover:bg-indigo-11/10"
        />
        <ul className="flex items-center">
          <li>
            <button>
              <Sun className="stroke-slate-11" />
            </button>
          </li>
          <li>
            <NavHamburger menuOpen={isOpen} toggle={toggleDialog} className="sm:hidden" />
          </li>
        </ul>
      </nav>
    </>
  )
}
