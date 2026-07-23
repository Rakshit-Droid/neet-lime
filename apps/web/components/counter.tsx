"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react"

interface CounterProps {
  to: number
  format?: (n: number) => string
  className?: string
  live?: boolean
  decimals?: number
}

// Spring number roll for stats and live tool results.
export function Counter({ to, format, className, live = false, decimals = 0 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: !live, margin: "-40px" })
  const reduce = useReducedMotion()

  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 90, damping: 22, mass: 0.8 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (reduce) {
      setDisplay(to)
      return
    }
    if (inView) mv.set(to)
  }, [inView, to, mv, reduce])

  useEffect(() => {
    if (reduce) return
    return spring.on("change", (v) => setDisplay(v))
  }, [spring, reduce])

  // Always render `display` so SSR and the client's first render match; the
  // effects below jump `display` to `to` immediately when reduced motion is on.
  const raw = display
  const factor = Math.pow(10, decimals)
  const value = Math.round(raw * factor) / factor

  return (
    <span ref={ref} className={className}>
      {format ? format(value) : value.toLocaleString()}
    </span>
  )
}
