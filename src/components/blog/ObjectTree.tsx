import { IconCaretDownFilled, IconCaretRightFilled } from '@tabler/icons-react'
import clsx from 'clsx'
import { useState } from 'react'

const propertiesOf = (instance: any): [string, any][] => {
  const fields = Object.entries(instance)
  const getters = Object.entries(Object.getOwnPropertyDescriptors(Reflect.getPrototypeOf(instance)))
    .filter(e => typeof e[1].get === 'function' && e[0] !== '__proto__')
    .map(([name]) => [name, instance[name]] as [string, any])
  return [...fields, ...getters]
}

interface PropertyNodeProps {
  name: string | null
  value: any
}

function PropertyNode({ name, value }: PropertyNodeProps) {
  const [open, setOpen] = useState(false)

  const nameFrag = (() => {
    if (!name) {
      return <></>
    }
    const formatted = name.replace('$', '#')
    const isIndex = !isNaN(parseInt(name))
    return (
      <>
        <span className={isIndex ? 'opacity-50' : ''}>{formatted}</span>
        <span className="opacity-50">:&nbsp;</span>
      </>
    )
  })()

  const typeFrag = (() => {
    if (Array.isArray(value)) {
      return (
        <span className="text-purple-700 opacity-50 dark:text-purple-300">
          Array({value.length})
        </span>
      )
    }
    if (typeof value === 'object') {
      const constr = Reflect.getPrototypeOf(value)?.constructor.name
      return (
        <span
          className={clsx(
            constr !== 'Object' && 'font-bold',
            'text-purple-700 opacity-50 dark:text-purple-300',
          )}
        >
          {constr}
        </span>
      )
    }
    return <span className="text-purple-700 opacity-50 dark:text-purple-300">{typeof value}</span>
  })()

  const childrenFrag = (() => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return ' = []'
      }
      if (!open) {
        return ' = [ ... ]'
      }
      return (
        <ol>
          {value.map((item, index) => (
            <PropertyNode key={index} name={index.toString()} value={item} />
          ))}
        </ol>
      )
    }
    if (typeof value === 'object') {
      if (propertiesOf(value).length === 0) {
        return ' = {}'
      }
      if (!open) {
        return ' = { ... }'
      }
      return (
        <ul>
          {propertiesOf(value).map(([name, value]) => (
            <PropertyNode key={name} name={name} value={value} />
          ))}
        </ul>
      )
    }
    if (typeof value === 'function') {
      return ''
    }
    if (typeof value === 'string') {
      return ` = "${value}"`
    }
    return ` = ${value}`
  })()

  const isExpandable = (() => {
    if (Array.isArray(value)) {
      return value.length > 0
    }
    if (typeof value === 'object') {
      return propertiesOf(value).length > 0
    }
    return false
  })()

  const caretFrag = (() => {
    if (!isExpandable) {
      return <span className="mr-1 inline-block h-3 w-3"></span>
    }

    const Caret = open ? IconCaretDownFilled : IconCaretRightFilled

    return (
      <span className="inline-flex items-center">
        <Caret className="mr-1" size={12} />
      </span>
    )
  })()

  return (
    <li
      className="pl-5"
      onClick={e => {
        e.stopPropagation()
        setOpen(o => !o)
      }}
    >
      <span className="inline-flex items-center">
        {caretFrag}
        {nameFrag}
        {typeFrag}
      </span>
      {childrenFrag}
    </li>
  )
}

interface ObjectTreeProps {
  name: string | null
  value: any
}

export default function ObjectTree({ name, value }: ObjectTreeProps) {
  return (
    <figure className="overflow-x-auto py-5 font-mono whitespace-nowrap">
      <ul>
        <PropertyNode name={name} value={value} />
      </ul>
    </figure>
  )
}
