"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { IconMessageChatbot, IconX, IconSend, IconActivityHeartbeat } from "@tabler/icons-react"

type Msg = { from: "bot" | "user"; text: string }

const GREETING: Msg = {
  from: "bot",
  text: "Hi! I'm the NEET Companion assistant. Ask me about the predictors, the state explorer, choice filling, or pricing.",
}

const QUICK = ["How does it work?", "What is Pro?", "Pricing", "Explore states"]

// Client-side scripted assistant (no backend). Swap `botReply` for a real LLM
// call once an API endpoint exists.
function botReply(text: string): string {
  const t = text.toLowerCase()
  if (/(pric|cost|credit|pay|subscri|plan|money|fee)/.test(t))
    return "Predictors and the explorer are free forever. Pro unlocks the Choice-Filling Assistant using credits — one full choice list is 20 credits. See the Pricing page for plans."
  if (/(choice|counsel|fill|allot|preference|lock|mcc)/.test(t))
    return "The Choice-Filling Assistant (Pro) orders every eligible college into one allotment-ready list — Reach on top, Safe at the bottom. Open “Choice Filling” from the menu."
  if (/(state|college|cutoff|explor|seat)/.test(t))
    return "The State Explorer lets you browse colleges and last cycle's closing ranks, state by state. Check “States” or “Colleges” in the menu."
  if (/(predict|rank|marks|score|air|counsell)/.test(t))
    return "Our free predictors map your NEET score or rank to Safe, Moderate, and Reach colleges — no sign-up. Try the NEET Predictor on the homepage."
  if (/(how|work|start|begin|use)/.test(t))
    return "Enter your score or rank, pick a category and course, and you'll instantly see matching colleges in three honest tiers. Then order them into a choice list with Pro."
  if (/(^|\b)(hi|hii|hello|hey|help)(\b|$)/.test(t))
    return "Hey! I can help with predictors, the state explorer, choice filling, and pricing. What would you like to know?"
  return "I can help with the predictors, the state explorer, the Pro Choice-Filling Assistant, and pricing. Ask about any of those — or tap a quick option."
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([GREETING])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing, open])

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  function send(text: string) {
    const q = text.trim()
    if (!q) return
    setMessages((m) => [...m, { from: "user", text: q }])
    setInput("")
    setTyping(true)
    timer.current = setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: "bot", text: botReply(q) }])
    }, 650)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 z-[60] flex h-[30rem] max-h-[calc(100dvh-7rem)] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border glass shadow-2xl sm:right-5"
          >
            {/* header */}
            <div className="flex items-center justify-between gap-3 border-b bg-primary/[0.06] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                  <IconActivityHeartbeat className="size-5" stroke={2.2} />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">NEET Companion</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-primary" /> Assistant &middot; online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <IconX className="size-4" stroke={2} />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm border bg-background"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border bg-background px-3.5 py-3">
                    <span className="chat-dot size-1.5 rounded-full bg-muted-foreground/70" />
                    <span className="chat-dot size-1.5 rounded-full bg-muted-foreground/70" style={{ animationDelay: "0.15s" }} />
                    <span className="chat-dot size-1.5 rounded-full bg-muted-foreground/70" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              )}
            </div>

            {/* quick replies — only while the conversation hasn't started */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about predictors, pricing…"
                aria-label="Message"
                className="min-w-0 flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim()}
                className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-transform active:scale-95 disabled:opacity-40"
              >
                <IconSend className="size-4" stroke={2} />
              </button>
            </form>

            <p className="px-4 pb-3 text-center text-[10px] text-muted-foreground">
              Automated assistant &middot; answers are general guidance.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="fixed bottom-5 right-4 z-[60] grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 sm:right-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <IconX className="size-6" stroke={2.4} />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <IconMessageChatbot className="size-7" stroke={2} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </>
  )
}
