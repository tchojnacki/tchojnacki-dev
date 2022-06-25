import classNames from 'classnames'

import onLoad from '@/styles/onLoad.module.scss'

import { NavHamburger } from '../NavHamburger'
import { NavLinkList } from './NavLinkList'
import { useDialog } from './useDialog'

export function Nav() {
  const { isOpen, toggleDialog, dialogRef } = useDialog()

  return (
    <>
      <dialog
        className='flex flex-col justify-start items-end overflow-hidden mt-0 mr-0 mb-auto ml-auto \
          p-0 bg-pure-black/0 bg-[url("/img/menu-blob.svg")] bg-no-repeat bg-right-top bg-contain \
          backdrop:bg-pure-black/50 w-[100vmin] h-[100vmin] duration-500 \
          invisible opacity-0 max-w-0 max-h-0 rounded-bl-full \
          open:visible open:opacity-100 open:max-w-full open:max-h-full open:rounded-none'
        ref={dialogRef}
      >
        <nav className="p-[calc(theme(spacing.nav-height)/4)]">
          <NavHamburger menuOpen={isOpen} toggle={toggleDialog} />
          <NavLinkList listClassName="mt-4" itemClassName="px-4 py-3 text-2xl text-right" />
        </nav>
      </dialog>
      <nav
        className={classNames(
          'h-[theme(spacing.nav-height)] p-[calc(theme(spacing.nav-height)/4)] \
          flex justify-end sm:block',
          onLoad.enter,
          onLoad.fromTop
        )}
      >
        <NavLinkList
          listClassName="hidden sm:flex justify-center gap-16"
          itemClassName="px-4 py-[calc(theme(spacing.nav-height)/8)] rounded-lg hover:bg-pure-white/5"
        />
        <NavHamburger mobileOnly menuOpen={isOpen} toggle={toggleDialog} />
      </nav>
    </>
  )
}
