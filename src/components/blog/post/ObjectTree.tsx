import { IconCaretDownFilled, IconCaretRightFilled } from "@tabler/icons-react"
import clsx from "clsx"
import { useReducer } from "react"

const propertiesOf = (instance: object): [string, unknown][] => {
  const fields = Object.entries(instance)
  const getters = Object.entries(Object.getOwnPropertyDescriptors(Reflect.getPrototypeOf(instance)))
    .filter(e => typeof e[1].get === "function" && e[0] !== "__proto__")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- name is definitely in instance
    .map(([name]) => [name, name in (instance as any)[name]] as [string, unknown])
  return [...fields, ...getters]
}

interface PropertyNodeProps {
  name: string | null
  value: unknown
}

function PropertyNode({ name, value }: PropertyNodeProps) {
  const [open, toggleOpen] = useReducer(prev => !prev, false)

  const nameFrag = (() => {
    if (!name) {
      return <></>
    }
    const formatted = name.replace("$", "#")
    const isIndex = !isNaN(parseInt(name))
    return (
      <>
        <span className={isIndex ? "opacity-50" : ""}>{formatted}</span>
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
    if (typeof value === "object" && value !== null) {
      const constr = Reflect.getPrototypeOf(value)?.constructor.name
      return (
        <span
          className={clsx(
            constr !== "Object" && "font-bold",
            "text-purple-700 opacity-50 dark:text-purple-300",
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
        return " = []"
      }
      if (!open) {
        return " = [ ... ]"
      }
      return (
        <ol>
          {value.map((item, index) => (
            <PropertyNode key={index} name={index.toString()} value={item} />
          ))}
        </ol>
      )
    }
    if (typeof value === "object" && value !== null) {
      if (propertiesOf(value).length === 0) {
        return " = {}"
      }
      if (!open) {
        return " = { ... }"
      }
      return (
        <ul>
          {propertiesOf(value).map(([name, value]) => (
            <PropertyNode key={name} name={name} value={value} />
          ))}
        </ul>
      )
    }
    if (typeof value === "function") {
      return ""
    }
    if (typeof value === "string") {
      return ` = "${value}"`
    }
    return ` = ${value}`
  })()

  const isExpandable = (() => {
    if (Array.isArray(value)) {
      return value.length > 0
    }
    if (typeof value === "object" && value !== null) {
      return propertiesOf(value).length > 0
    }
    return false
  })()

  const caretFrag = (() => {
    if (!isExpandable) {
      return <span className="mr-1 inline-block h-3 w-3"></span>
    }

    const Caret = open ? IconCaretDownFilled : IconCaretRightFilled
    const ariaLabel = open ? "Collapse" : "Expand"

    return (
      <span className="inline-flex items-center">
        <Caret className="mr-1" aria-label={ariaLabel} size={12} />
      </span>
    )
  })()

  return (
    <li
      className="pl-5"
      onClick={e => {
        e.stopPropagation()
        toggleOpen()
      }}
      role="button"
      tabIndex={0}
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
  value: unknown
}

export default function ObjectTree({ name, value }: ObjectTreeProps) {
  return (
    <figure
      className="overflow-x-auto py-5 font-mono whitespace-nowrap"
      aria-label="An object tree."
    >
      <ul>
        <PropertyNode name={name} value={value} />
      </ul>
    </figure>
  )
}
