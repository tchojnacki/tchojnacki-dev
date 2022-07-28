import { Moon, Sun } from 'tabler-icons-react'

import { useDialog } from 'hooks'

import { NavHamburger } from './NavHamburger'
import { NavLinkList } from './NavLinkList'

interface NavProps {
  toggleTheme: () => void
  currentTheme: 'light' | 'dark'
}

export function Nav({ toggleTheme, currentTheme }: NavProps) {
  const { isOpen, toggleDialog, dialogRef } = useDialog()

  const ThemeIcon = currentTheme === 'dark' ? Sun : Moon

  return (
    <>
      <dialog
        className='invisible mt-0 mr-0 mb-auto ml-auto flex
          h-[min(100vmin,30rem)] max-h-16 w-[min(100vmin,30rem)] max-w-16 flex-col items-end
          justify-start overflow-hidden rounded-bl-[50%] bg-pure-black/0 bg-contain
          bg-[url("/static/img/light-menu-blob.svg")] dark:bg-[url("/static/img/dark-menu-blob.svg")]
          bg-right-top bg-no-repeat p-0 opacity-0 duration-500 backdrop:bg-pure-black/50
          open:visible open:max-h-full open:max-w-full open:rounded-none open:opacity-100'
        ref={dialogRef}
      >
        <nav className="p-[calc(theme(spacing.nav-height)/4)]">
          <NavHamburger menuOpen={isOpen} toggle={toggleDialog} className="ml-auto" />
          <NavLinkList listClassName="mt-2" itemClassName="px-4 py-2 text-xl text-right" />
        </nav>
      </dialog>
      <nav
        className="flex justify-end items-center h-[theme(spacing.nav-height)] animate-enteronload
        p-[calc(theme(spacing.nav-height)/4)] onenter-fromtop motion-reduce:animate-none leading-none"
      >
        <NavLinkList
          listClassName="hidden sm:flex gap-16 mx-auto"
          itemClassName="px-4 py-[calc(theme(spacing.nav-height)/8)] rounded-lg
          hover:bg-indigo-11/30 dark:hover:bg-indigo-11/10"
        />
        <ul className="flex items-center">
          <li>
            <button
              className="px-3 py-1 group"
              aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
              onClick={toggleTheme}
            >
              <ThemeIcon
                className="stroke-slate-8 group-hover:stroke-slate-3
              dark:stroke-slate-11 dark:group-hover:stroke-slate-12 duration-200"
              />
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
