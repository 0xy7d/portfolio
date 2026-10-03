"use client"

import { ArrowUpRight, Music2 } from "lucide-react"
import { useEffect, useState } from "react"
import { emptyMusic, parseMusic, type MusicStatus } from "@/lib/music"

export function Listening() {
  const [music, setMusic] = useState<MusicStatus>(emptyMusic)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    let controller: AbortController | null = null
    async function update() {
      if (document.hidden || controller) return
      controller = new AbortController()
      const timeout = setTimeout(() => controller?.abort(), 8_000)
      try {
        const response = await fetch("/api/music", { signal: controller.signal, cache: "no-store" })
        if (!response.ok) throw new Error("Music unavailable")
        const status = parseMusic(await response.json())
        if (active) setMusic(status)
      } catch {
        if (active) setMusic(previous => ({ ...previous, isPlaying: false, available: false }))
      } finally {
        clearTimeout(timeout)
        controller = null
        if (active) setReady(true)
      }
    }
    void update()
    const interval = setInterval(update, 45_000)
    document.addEventListener("visibilitychange", update)
    return () => { active = false; clearInterval(interval); controller?.abort(); document.removeEventListener("visibilitychange", update) }
  }, [])

  return (
    <div className="space-y-3 border-t border-border pt-6">
      <div className="flex items-center gap-2">
        <p className="eyebrow">{music.track ? music.isPlaying ? "Now listening" : "Recently listened" : "Listening"}</p>
        {music.isPlaying && <span aria-label="Live" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />}
      </div>
      {music.track ? (
        <a href={music.track.url ?? music.profileUrl} target="_blank" rel="noopener noreferrer" className="group flex min-w-0 items-start gap-3 rounded-md">
          {music.track.artworkUrl ? (
            // Native images work with the static export; only Apple artwork is accepted.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={music.track.artworkUrl} alt="" width={48} height={48} loading="lazy" referrerPolicy="no-referrer" className="h-12 w-12 shrink-0 rounded border border-border object-cover" />
          ) : <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-border bg-muted"><Music2 aria-hidden="true" className="h-5 w-5 text-muted-foreground" /></span>}
          <div className="min-w-0 space-y-1 text-sm leading-relaxed">
            <p className="break-words group-hover:underline underline-offset-4">{music.track.title}</p>
            <p className="break-words text-xs text-muted-foreground">{music.track.artist}</p>
          </div>
        </a>
      ) : <p className="text-sm leading-relaxed text-muted-foreground">{ready ? music.available ? "No listening updates yet." : "Listening updates are unavailable." : "Checking the record player…"}</p>}
      <a href={music.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-link inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        My Apple Music<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
