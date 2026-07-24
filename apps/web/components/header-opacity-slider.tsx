"use client"

// TEMPORARY tuning tool: drag to find the header background opacity you like,
// tell me the %, and I'll bake it in and remove this slider.

import { useEffect, useState } from "react"

export function HeaderOpacitySlider() {
  const [val, setVal] = useState(100)

  useEffect(() => {
    document.documentElement.style.setProperty("--header-opacity", `${val}%`)
  }, [val])

  return (
    <div className="fixed bottom-5 left-5 z-[70] flex items-center gap-3 rounded-xl border bg-background/95 px-4 py-3 shadow-lg backdrop-blur">
      <label htmlFor="hdr-op" className="whitespace-nowrap text-xs font-semibold">
        Header opacity
      </label>
      <input
        id="hdr-op"
        type="range"
        min={0}
        max={100}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-40 accent-[var(--primary)]"
      />
      <span className="w-11 text-right font-mono text-sm font-semibold text-primary">{val}%</span>
    </div>
  )
}
