import { LinkButton, SimpleIconSvg } from 'components'
import { SOCIAL_LINKS } from 'data'

import { Wave } from '../common'
import { TechSphere } from './TechSphere'
import { WavingEmoji } from './WavingEmoji'

export function Landing() {
  return (
    <main
      className="relative grid min-h-[calc(min(100vh,64rem)-theme(spacing.nav-height))] grid-cols-1
      grid-rows-[repeat(3,auto)] place-items-center grid-areas-landing-mobile
      lg:grid-cols-[minmax(0,1fr)_repeat(2,minmax(0,48rem))_minmax(0,1fr)] lg:grid-rows-[1fr_repeat(2,10vh)]
      lg:grid-areas-landing-desktop"
    >
      <section
        className="animate-enteronload place-self-center p-8 text-center grid-in-text
        onenter-fromleft motion-reduce:animate-none lg:text-left"
      >
        <h2 className="text-2xl font-bold">
          Hello <WavingEmoji />, my name is
        </h2>
        <h1 className="text-5xl font-bold leading-tight text-indigo-8 dark:text-indigo-11">
          Tomasz Chojnacki
        </h1>
        <p className="mt-6 mb-16 inline-block text-2xl text-slate-8 dark:text-slate-11">
          I am a software developer.
        </p>
        <div className="flex items-center justify-center gap-8 lg:justify-start">
          <LinkButton href="/projects">View Projects</LinkButton>
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a
              className="group inline-block h-8 w-8"
              href={href}
              target="_blank"
              rel="noreferrer"
              title={label}
              aria-label={label}
              key={label}
            >
              <SimpleIconSvg
                icon={icon}
                pathClassName="fill-slate-8 group-hover:fill-slate-3 dark:fill-slate-11
                dark:group-hover:fill-slate-12 duration-200"
              />
            </a>
          ))}
        </div>
      </section>
      <section
        className="grid h-full min-h-[75vw] w-full animate-enteronload items-center justify-items-center
        overflow-hidden p-8 grid-in-sphere onenter-fromright motion-reduce:animate-none lg:min-h-full lg:items-end"
      >
        <TechSphere />
      </section>
      <div className="lg:absolute bottom-0 w-full h-full lg:h-[20vh] flex flex-col justify-end">
        <Wave />
      </div>
    </main>
  )
}
