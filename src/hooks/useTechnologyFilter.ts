import { useCallback, useMemo } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

import { Technology } from 'data'

const { LIST } = Technology

function serializeTechnology(technology: Technology | null): string | null {
  return (
    Object.keys(LIST)
      .find(k => LIST[k as keyof typeof LIST] === technology)
      ?.toLowerCase() ?? null
  )
}

function deserializeTechnology(value: string | null): Technology | null {
  return value && value.toUpperCase() in LIST
    ? LIST[value.toUpperCase() as keyof typeof LIST]
    : null
}

export function useTechnologyFilter() {
  const [filterQuery, setFilterQuery] = useQueryParam('filter', withDefault(StringParam, null))

  const filter = useMemo(() => deserializeTechnology(filterQuery), [filterQuery])

  const toggleFilter = useCallback(
    (technology: Technology | null) =>
      setFilterQuery(prev =>
        deserializeTechnology(prev!) === technology ? null : serializeTechnology(technology)
      ),
    [setFilterQuery]
  )

  return { filter, toggleFilter }
}
