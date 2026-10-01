"use client"

import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import { parseThoughtsFeed, thoughtsSite, type Thought } from "@/lib/thoughts"

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
})

type FeedState =
  | { status: "loading" }
  | { status: "ready"; thoughts: Thought[] }
  | { status: "error" }

export function RecentThoughts() {
  const [state, setState] = useState<FeedState>({ status: "loading" })

  useEffect(() => {
    const controller = new AbortController()
    let disposed = false
    const timeout = window.setTimeout(() => controller.abort(), 8000)

    async function load() {
      try {
        const response = await fetch(`${thoughtsSite}/feed.json`, {
          signal: controller.signal, cache: "no-cache", credentials: "omit",
        })
        if (!response.ok) throw new Error("Writing is unavailable")
        const thoughts = parseThoughtsFeed(await response.json())
        if (!disposed) setState({ status: "ready", thoughts })
      } catch {
        if (!disposed) setState({ status: "error" })
      } finally {
        window.clearTimeout(timeout)
      }
    }
    void load()
    return () => {
      disposed = true
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [])

  if (state.status === "loading") {
    return <p role="status" className="text-sm text-muted-foreground">Loading recent writing...</p>
  }

  if (state.status === "error") {
    return <p role="status" className="text-sm leading-7 text-muted-foreground">Recent writing is available on <a href={thoughtsSite} target="_blank" rel="noopener noreferrer" className="inline-link">my thoughts site</a>.</p>
  }

  if (state.thoughts.length === 0) {
    return <p className="text-sm text-muted-foreground">New writing will appear here when published.</p>
  }

  return (
    <div className="divide-y divide-border">
      {state.thoughts.map((thought) => (
        <article key={thought.url} className="py-6 first:pt-0 last:pb-0">
          <a href={thought.url} target="_blank" rel="noopener noreferrer" className="group grid items-start gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
            <div className="min-w-0 space-y-2">
              <h3 className="text-lg leading-snug transition-colors group-hover:text-muted-foreground sm:text-xl">{thought.title}</h3>
              {thought.category && <p className="eyebrow">{thought.category}</p>}
            </div>
            <div className="flex items-center gap-3 text-xs leading-7 text-muted-foreground">
              <time dateTime={thought.date}>{dateFormat.format(new Date(thought.date))}</time>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </div>
          </a>
        </article>
      ))}
    </div>
  )
}
