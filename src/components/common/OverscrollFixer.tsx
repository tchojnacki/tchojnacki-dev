import { useEffect } from 'react'
import { useTheme } from '~/hooks'

function adjustHtmlBackground(theme: 'light' | 'dark') {
  var scroll = document.body.scrollTop || document.documentElement.scrollTop
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight

  if (scroll / height > 0.5) {
    document.documentElement.style.setProperty(
      'background-color',
      theme === 'dark' ? '#1C274F' : '#C2CEFF',
    )
  } else {
    document.documentElement.style.setProperty(
      'background-color',
      theme === 'dark' ? '#15192D' : '#ECEDEE',
    )
  }
}

export default function OverscrollFixer() {
  const { theme } = useTheme()

  useEffect(() => {
    adjustHtmlBackground(theme)

    const listener = () => adjustHtmlBackground(theme)
    document.addEventListener('scroll', listener)
    return () => document.removeEventListener('scroll', listener)
  }, [theme])
}
