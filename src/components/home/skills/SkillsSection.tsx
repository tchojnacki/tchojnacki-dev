import { SECTION_SKILLS } from 'data'

import { SectionHeader, Wave } from '../common'
import { SkillCard } from './SkillCard'
import { SkillCardWrapper } from './SkillCardWrapper'

export function SkillsSection() {
  return (
    <>
      <Wave />
      <section className="bg-indigo-11 dark:bg-indigo-4">
        <SectionHeader>Skills</SectionHeader>
        <div className="flex flex-wrap justify-center">
          {SECTION_SKILLS.map(({ label, width, height, largest, items }) => (
            <section key={label} className="p-8 flex flex-col items-center">
              <h4 className="my-6 text-2xl">{label}</h4>
              <SkillCardWrapper width={width} height={height} largest={largest}>
                {items.map(([skill, size]) => (
                  <SkillCard key={skill.name} skill={skill} size={size} />
                ))}
              </SkillCardWrapper>
            </section>
          ))}
        </div>
      </section>
      <Wave inverted />
    </>
  )
}
