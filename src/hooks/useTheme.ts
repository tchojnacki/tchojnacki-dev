import { useEffect, useState } from "react"

function initialTheme() {
  if (typeof localStorage === "undefined") return "dark"
  const local = localStorage.getItem("theme")
  if (local !== "dark" && local !== "light") return "dark"
  return local
}

function adjustHtmlBackground(theme: string) {
  var scroll = document.body.scrollTop || document.documentElement.scrollTop
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight

  const backgroundColor =
    scroll / height > 0.5
      ? theme === "dark"
        ? "#282566"
        : "#e0e7ff"
      : theme === "dark"
        ? "#14122b"
        : "#f7f9ff"
  const themeColor = theme === "dark" ? "#14122b" : "#f7f9ff"

  document.documentElement.style.setProperty("background-color", backgroundColor)
  document.querySelector("meta[name=theme-color]")?.setAttribute("content", themeColor)
}

export function useTheme() {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
    adjustHtmlBackground(theme)

    function listener() {
      adjustHtmlBackground(theme)
    }
    document.addEventListener("scroll", listener)
    return () => document.removeEventListener("scroll", listener)
  }, [theme])

  function toggleTheme() {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }

  return { theme, toggleTheme }
}
