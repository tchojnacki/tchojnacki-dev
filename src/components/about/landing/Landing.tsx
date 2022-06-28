import { SimpleIconSvg } from '@/components/common/SimpleIconSvg'
import { SOCIAL_LINKS } from '@/data/socials'

import { LinkButton } from './LinkButton'
import { TechSphere } from '../techSphere'
import { Wave } from './Wave'
import { WavingEmoji } from './WavingEmoji'

export function Landing() {
  return (
    <main className="relative grid min-h-[calc(100vh-theme(spacing.nav-height))] grid-cols-1 grid-rows-[auto_auto_10vh] place-items-center gap-x-0 gap-y-8 overflow-x-hidden grid-areas-landing-mobile lg:grid-cols-2 lg:grid-rows-[1fr_5vh_15vh] lg:gap-x-8 lg:gap-y-0 lg:grid-areas-landing-desktop">
      <section className="animate-enteronload place-self-center p-4 pt-8 text-center grid-in-text onenter-fromleft motion-reduce:animate-none lg:text-left">
        <h2 className="text-2xl font-bold">
          Hello <WavingEmoji />, my name is
        </h2>
        <h1 className="text-5xl font-bold leading-tight text-indigo-11">Tomasz Chojnacki</h1>
        <p className="mt-6 mb-16 inline-block text-2xl text-slate-11">I am a software developer.</p>
        <div className="flex items-center justify-center gap-8 lg:justify-start">
          <LinkButton href="/projects">View Projects</LinkButton>
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a className="group inline-block h-8 w-8" href={href} aria-label={label} key={label}>
              <SimpleIconSvg
                icon={icon}
                pathClassName="fill-slate-11 group-hover:fill-slate-12 duration-200"
              />
            </a>
          ))}
        </div>
      </section>
      <section className="grid h-full min-h-[75vw] w-full animate-enteronload items-center justify-items-center overflow-hidden p-4 grid-in-sphere onenter-fromright motion-reduce:animate-none lg:min-h-full lg:items-end">
        <TechSphere />
      </section>
      <div className="absolute bottom-0 h-[10vh] w-full lg:h-[20vh]">
        <Wave />
      </div>
    </main>
  )
}
