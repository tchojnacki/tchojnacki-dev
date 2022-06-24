import classNames from 'classnames'
import { siGithub, siLinkedin } from 'simple-icons/icons'

import { SimpleIconSvg } from '@/components/common/SimpleIconSvg'
import onLoad from '@/styles/onLoad.module.scss'

import { LinkButton } from '../LinkButton'
import { TechSphere } from '../TechSphere'
import { Wave } from '../Wave'
import { WavingEmoji } from '../WavingEmoji'

export function Landing() {
  return (
    <main className="min-h-[calc(100vh-theme(space.nav-height))] grid grid-rows-[auto_auto_10vh] lg:grid-rows-[1fr_5vh_15vh] grid-cols-1 lg:grid-cols-2 grid-areas-landing-mobile lg:grid-areas-landing-desktop gap-x-0 lg:gap-x-8 gap-y-8 lg:gap-y-0 place-items-center relative overflow-x-hidden">
      <section
        className={classNames(
          'grid-in-text place-self-center p-4 pt-8 text-center lg:text-left',
          onLoad.enter,
          onLoad.fromLeft
        )}
      >
        <h2 className="text-2xl font-bold">
          Hello <WavingEmoji />, my name is
        </h2>
        <h1 className="text-5xl leading-tight font-bold text-indigo-11">Tomasz Chojnacki</h1>
        <p className="text-slate-11 text-2xl mt-6 mb-16 inline-block">I am a software developer.</p>
        <div className="flex gap-8 items-center justify-center lg:justify-start">
          <LinkButton href="/projects">View Projects</LinkButton>
          <a
            className="group inline-block h-8 w-8"
            href="https://github.com/tchojnacki"
            aria-label="GitHub"
          >
            <SimpleIconSvg
              icon={siGithub}
              pathClassName="fill-slate-11 group-hover:fill-slate-12 duration-200"
            />
          </a>
          <a
            className="group inline-block h-8 w-8"
            href="https://www.linkedin.com/in/tchojnacki"
            aria-label="LinkedIn"
          >
            <SimpleIconSvg
              icon={siLinkedin}
              pathClassName="fill-slate-11 group-hover:fill-slate-12 duration-200"
            />
          </a>
        </div>
      </section>
      <section
        className={classNames(
          'grid-in-sphere p-4 w-full h-full grid items-center lg:items-end justify-items-center overflow-hidden min-h-[75vw] lg:min-h-full',
          onLoad.enter,
          onLoad.fromRight
        )}
      >
        <TechSphere />
      </section>
      <div className="absolute bottom-0 w-full h-[10vh] lg:h-[20vh] -z-10">
        <Wave />
      </div>
    </main>
  )
}
