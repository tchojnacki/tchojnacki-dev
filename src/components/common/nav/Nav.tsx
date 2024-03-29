import { useDialog } from '~/hooks'

import NavHamburger from './NavHamburger'
import NavLinkList from './NavLinkList'
import ThemeButton from './ThemeButton'

interface NavProps {
  pathname: string
}

export default function Nav({ pathname }: NavProps) {
  const { isOpen, toggleDialog, dialogRef } = useDialog()

  return (
    <>
      <dialog
        className='max-w-16 bg-neutral-1000/0 backdrop:bg-neutral-1000/50 invisible z-10 mb-auto
          ml-auto mr-0 mt-0 flex h-[min(100vmin,30rem)] max-h-16
          w-[min(100vmin,30rem)] flex-col items-end justify-start overflow-hidden
          rounded-bl-[50%] bg-[url("/static/img/light-menu-blob.svg")] bg-contain
          bg-right-top bg-no-repeat p-0 opacity-0 duration-500 open:visible
          open:max-h-full open:max-w-full open:rounded-none open:opacity-100 dark:bg-[url("/static/img/dark-menu-blob.svg")]'
        ref={dialogRef}
      >
        <nav className="p-[calc(theme(spacing.nav-height)/4)]">
          <NavHamburger menuOpen={isOpen} toggle={toggleDialog} className="ml-auto" />
          <NavLinkList
            listClassName="mt-2"
            itemClassName="px-4 py-2 text-xl text-right"
            pathname={pathname}
          />
        </nav>
      </dialog>
      <nav
        className="flex h-[theme(spacing.nav-height)] animate-enteronload items-center justify-end
          p-[calc(theme(spacing.nav-height)/4)] leading-none onenter-fromtop motion-reduce:animate-none"
      >
        <NavLinkList
          listClassName="hidden sm:flex gap-16 mx-auto"
          itemClassName="px-4 py-[calc(theme(spacing.nav-height)/8)] rounded-lg
           hover:bg-indigo-700/10 dark:hover:bg-indigo-300/10"
          pathname={pathname}
        />
        <ul className="flex items-center">
          <li>
            <ThemeButton />
          </li>
          <li>
            <NavHamburger menuOpen={isOpen} toggle={toggleDialog} className="sm:hidden" />
          </li>
        </ul>
      </nav>
    </>
  )
}
