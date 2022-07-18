import { ProjectDefinition } from 'data'

interface FeaturedProjectProps {
  project: ProjectDefinition
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <li className="max-w-[64rem] grid grid-cols-8 grid-rows-1 items-center">
      <div className="col-start-1 col-span-5 row-span-full">
        <picture>
          <img alt={project.name} src="/static/projects/placeholder.png" />
        </picture>
      </div>
      <div className="col-start-4 col-span-5 row-span-full">
        <div className="rounded-3xl bg-indigo-11 dark:bg-indigo-4 p-8 flex flex-col gap-4">
          <h4 className="text-3xl">{project.name}</h4>
          <ul className="flex gap-2">
            {project.tags.map(({ displayName, color }) => (
              <li key={displayName} style={{ backgroundColor: color }} className="rounded-lg px-2">
                {displayName}
              </li>
            ))}
          </ul>
          <p>{project.description}</p>
          {project.parts.map(({ name, technologies }) => (
            <div key={name}>
              <h5 className="text-xl">{name}</h5>
              <ul className="flex gap-2">
                {technologies.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </li>
  )
}
