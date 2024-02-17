type ParamSelectProps<T> = {
  options: T[]
  current: T
  setCurrent: (t: T) => void
  serialize: (t: T) => string
  deserialize: (s: string) => T
  display?: (t: T) => string
  onChange?: (t: T) => void
  disabled?: boolean
}

export default function Select<T>({
  options,
  current,
  setCurrent,
  serialize,
  deserialize,
  display = serialize,
  onChange,
  disabled = false,
}: ParamSelectProps<T>) {
  return (
    <select
      className="rounded-md bg-neutral-600 px-2 py-0.5 text-neutral-0 disabled:opacity-50"
      autoComplete="off"
      value={serialize(current)}
      onChange={e => {
        const value = deserialize(e.target.value)
        onChange?.(value)
        setCurrent(value)
      }}
      disabled={disabled}
    >
      {options.map(o => (
        <option key={serialize(o)} value={serialize(o)}>
          {display(o)}
        </option>
      ))}
    </select>
  )
}
