import { useState, type CSSProperties } from "react"

import { cn } from "~/lib/cn"

import Dialog from "../Dialog"
import NavHamburger from "./NavHamburger"
import NavLinkList from "./NavLinkList"
import ThemeButton from "./ThemeButton"

interface NavInternalProps {
  pathname: string
  blobDarkUrl: string
  blobLightUrl: string
}

export default function NavInternal({ pathname, blobDarkUrl, blobLightUrl }: NavInternalProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog
        open={open}
        style={
          {
            "--blob-dark-url": blobDarkUrl,
            "--blob-light-url": blobLightUrl,
          } as CSSProperties
        }
        className={cn(
          "z-10 mt-0 mr-0 mb-auto ml-auto h-[min(100vmin,30rem)] w-[min(100vmin,30rem)] overflow-hidden p-0",
          "flex flex-col items-end justify-start",
          "bg-neutral-1000/0 backdrop:bg-neutral-1000/50 bg-contain bg-top-right bg-no-repeat",
          "bg-(image:--blob-light-url) dark:bg-(image:--blob-dark-url)",
          "invisible max-h-16 max-w-16 rounded-bl-[50%] opacity-0 duration-500",
          "open:visible open:max-h-full open:max-w-full open:rounded-none open:opacity-100",
        )}
      >
        <nav className="p-[calc(var(--spacing-nav-height)/4)]">
          <NavHamburger menuOpen={open} onClick={() => setOpen(false)} className="ml-auto" />
          <NavLinkList
            listClassName="mt-2"
            itemClassName="px-4 py-2 text-xl text-right"
            pathname={pathname}
          />
        </nav>
      </Dialog>
      <nav className="flex h-(--spacing-nav-height) items-center justify-end p-[calc(var(--spacing-nav-height)/4)] leading-none">
        <NavLinkList
          listClassName="hidden sm:flex gap-16 mx-auto"
          itemClassName="px-4 py-[calc(var(--spacing-nav-height)/8)] rounded-lg
           hover:bg-indigo-700/10 dark:hover:bg-indigo-300/10"
          pathname={pathname}
        />
        <ul className="flex items-center">
          <li>
            <ThemeButton />
          </li>
          <li>
            <NavHamburger menuOpen={open} onClick={() => setOpen(true)} className="sm:hidden" />
          </li>
        </ul>
      </nav>
    </>
  )
}
