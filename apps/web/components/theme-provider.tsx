"use client"

import * as React from "react"
import { MotionConfig } from "motion/react"

type Theme = "light" | "dark"

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: Theme
  setTheme: (t: Theme | "system") => void
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)
const STORAGE_KEY = "theme"

function systemTheme(): Theme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

// Self-owned theme provider. The no-flash class is applied by an inline script
// in the server-rendered RootLayout, so this client component renders no
// <script> of its own (which is what next-themes did and React 19 warns about).
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light")

  // Adopt whatever the pre-hydration script already put on <html>.
  React.useEffect(() => {
    setThemeState(document.documentElement.classList.contains("dark") ? "dark" : "light")
  }, [])

  const apply = React.useCallback((t: Theme) => {
    document.documentElement.classList.toggle("dark", t === "dark")
    setThemeState(t)
  }, [])

  const setTheme = React.useCallback(
    (t: Theme | "system") => {
      if (t === "system") {
        try {
          localStorage.removeItem(STORAGE_KEY)
        } catch {}
        apply(systemTheme())
      } else {
        try {
          localStorage.setItem(STORAGE_KEY, t)
        } catch {}
        apply(t)
      }
    },
    [apply],
  )

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  // 'd' toggles the theme (preserved from the scaffold).
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.defaultPrevented || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key.toLowerCase() !== "d") return
      if (isTypingTarget(e.target)) return
      toggleTheme()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [toggleTheme])

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme: theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
