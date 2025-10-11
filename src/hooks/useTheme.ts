import { useEffect, useState } from "react"

const indigo100 = "#e7edff"
const indigo900 = "#201e51"
const neudigo50 = "#f7f9ff"
const neudigo950 = "#14122b"

function initialTheme() {
  if (typeof localStorage === "undefined") return "dark"
  const local = localStorage.getItem("theme")
  if (local !== "dark" && local !== "light") return "dark"
  return local
}

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(initialTheme)

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      document.documentElement.dataset.theme = "github-dark"
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.dataset.theme = "github-light"
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    function adjustHtmlBackground() {
      const scroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

      const backgroundColor =
        scroll / height > 0.5
          ? theme === "dark"
            ? indigo900
            : indigo100
          : theme === "dark"
            ? neudigo950
            : neudigo50
      const themeColor = theme === "dark" ? neudigo950 : neudigo50

      document.documentElement.style.setProperty("background-color", backgroundColor)
      document.querySelector("meta[name=theme-color]")?.setAttribute("content", themeColor)
    }

    adjustHtmlBackground()
    document.addEventListener("scroll", adjustHtmlBackground)
    return () => document.removeEventListener("scroll", adjustHtmlBackground)
  }, [theme])

  function toggleTheme() {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }

  return { theme, toggleTheme }
}
