import { useCallback, useEffect, useState } from "react"

function initialTheme() {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    const local = localStorage.getItem("theme")
    if (local === "dark" || local === "light") {
      return local
    }
  }
  return "dark"
}

function adjustHtmlBackground(theme: string) {
  var scroll = document.body.scrollTop || document.documentElement.scrollTop
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight

  if (scroll / height > 0.5) {
    document.documentElement.style.setProperty(
      "background-color",
      theme === "dark" ? "#282566" : "#e0e7ff",
    )
  } else {
    document.documentElement.style.setProperty(
      "background-color",
      theme === "dark" ? "#14122b" : "#f7f9ff",
    )
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(initialTheme())

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)

    adjustHtmlBackground(theme)
    const listener = () => adjustHtmlBackground(theme)
    document.addEventListener("scroll", listener)
    return () => document.removeEventListener("scroll", listener)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme(prev => (prev === "dark" ? "light" : "dark")), [])

  return { theme, toggleTheme }
}
