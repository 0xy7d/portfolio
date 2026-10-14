"use client"

import { Moon, Sun } from "lucide-react"
import { useSyncExternalStore } from "react"

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, () => document.documentElement.classList.contains("dark"), () => false)

  function toggleTheme() {
    const dark = !isDark
    document.documentElement.classList.toggle("dark", dark)
    try {
      localStorage.setItem("portfolio-theme", dark ? "dark" : "light")
    } catch {
      // Theme switching still works without storage.
    }
  }

  return (
    <button onClick={toggleTheme} type="button" aria-label={`Switch to ${isDark ? "light" : "dark"} theme`} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs hover:bg-muted">
      {isDark ? <Sun aria-hidden="true" className="h-4 w-4" /> : <Moon aria-hidden="true" className="h-4 w-4" />}
      {isDark ? "Light" : "Dark"}
    </button>
  )
}
