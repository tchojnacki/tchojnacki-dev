import useLocalStorageState from 'use-local-storage-state'

// Adapter to provide consistent interface in case the underlying implementation changes
export function useLocalStorage<T>(key: string, defaultValue: T) {
  return useLocalStorageState(key, { defaultValue })
}
