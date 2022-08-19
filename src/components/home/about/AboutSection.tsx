import Image from 'next/image'

import headshotImage from '../../../media/tchojnacki.png'
import { SectionHeader, Wave } from '../common'

export function AboutSection() {
  return (
    <>
      <section className="p-8 bg-indigo-11 dark:bg-indigo-4">
        <SectionHeader>About Me</SectionHeader>
        <div className="mx-auto flex flex-col md:flex-row gap-8 justify-center items-center py-8">
          <div
            className="flex overflow-hidden rounded-full
          shadow-md shadow-indigo-2/25 dark:shadow-indigo-11/10"
          >
            <Image
              alt="Photo of Tomasz Chojnacki."
              src={headshotImage}
              width={96}
              height={96}
              layout="fixed"
              placeholder="blur"
            />
          </div>
          <div className="text-slate-8 dark:text-slate-11">
            <ul className="list-disc ml-8 md:ml-16">
              <li>Software developer based in Wrocław, Poland.</li>
              <li>
                Student of Applied Computer Science at{' '}
                <a
                  className="text-indigo-8 dark:text-pure-white hover:underline"
                  href="https://pwr.edu.pl/en/"
                  target="_blank"
                  rel="noreferrer"
                  title="Wrocław University of Science and Technology"
                >
                  WUST
                </a>
                .
              </li>
              <li>Experienced at front-end development using React.</li>
              <li>Learning .NET back-end development in my free time.</li>
            </ul>
          </div>
        </div>
      </section>
      <Wave inverted />
    </>
  )
}
