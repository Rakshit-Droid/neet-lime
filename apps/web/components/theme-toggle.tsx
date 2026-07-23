"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { IconSun, IconMoon } from "@tabler/icons-react"

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative grid size-9 place-items-center rounded-lg text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
    >
      {mounted && (
        <>
          <IconSun
            className={`absolute size-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
            stroke={2}
          />
          <IconMoon
            className={`absolute size-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
            stroke={2}
          />
        </>
      )}
    </button>
  )
}
