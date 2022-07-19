import { SECTION_SKILLS } from 'data'

import { SkillCard } from './SkillCard'
import { SkillCardWrapper } from './SkillCardWrapper'

export function SkillsSection() {
  return (
    <section className="my-[-1px] py-1 bg-indigo-11 dark:bg-indigo-4">
      <h3 className="text-center text-4xl font-bold">Skills</h3>
      <div className="flex flex-wrap justify-center pb-8">
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
  )
}
