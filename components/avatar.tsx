"use client"

import { RotateCcw } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { KeyboardEvent, PointerEvent } from "react"
import type { mountAvatar } from "@/lib/avatar-viewer"

type Viewer = ReturnType<typeof mountAvatar>

export function Avatar() {
  const container = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const viewer = useRef<Viewer | null>(null)
  const drag = useRef<{ id: number; x: number; y: number } | null>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    let cancelled = false
    let started = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return
      started = true
      observer.disconnect()
      // Three.js and the sculpture load independently of the homepage content.
      import("@/lib/avatar-viewer").then(({ mountAvatar }) => {
        if (cancelled || !canvas.current) return
        viewer.current = mountAvatar(canvas.current, () => {
          setReady(false)
          setFailed(true)
          drag.current = null
          setDragging(false)
          viewer.current?.dispose()
          viewer.current = null
        })
        setReady(true)
      }).catch(() => { if (!cancelled) setFailed(true) })
    }, { rootMargin: "100px" })
    if (container.current) observer.observe(container.current)
    return () => {
      cancelled = true
      observer.disconnect()
      viewer.current?.dispose()
      viewer.current = null
    }
  }, [])

  function startDrag(event: PointerEvent<HTMLCanvasElement>) {
    if (!ready || !event.isPrimary || event.button !== 0) return
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.focus({ preventScroll: true })
    setDragging(true)
  }
  function moveDrag(event: PointerEvent<HTMLCanvasElement>) {
    const previous = drag.current
    if (!previous || previous.id !== event.pointerId) return
    viewer.current?.rotate((event.clientX - previous.x) * 0.012, (event.clientY - previous.y) * 0.008)
    previous.x = event.clientX
    previous.y = event.clientY
  }
  function endDrag() {
    drag.current = null
    setDragging(false)
  }
  function rotateWithKeys(event: KeyboardEvent<HTMLCanvasElement>) {
    const steps: Record<string, [number, number]> = {
      ArrowLeft: [-0.15, 0], ArrowRight: [0.15, 0], ArrowUp: [0, -0.08], ArrowDown: [0, 0.08],
    }
    if (event.key === "Home" || event.key === "Escape") {
      event.preventDefault()
      viewer.current?.reset()
    } else if (steps[event.key]) {
      event.preventDefault()
      viewer.current?.rotate(...steps[event.key])
    }
  }

  return (
    <div ref={container} className="avatar mx-auto w-full max-w-64 lg:max-w-none">
      <div className="avatar-stage relative aspect-[1/1.13]">
        <div className="avatar-halo" aria-hidden="true" />
        {/* The static portrait also covers loading and devices without WebGL. */}
        <img src="/avatar.png" alt="Maleek's avatar with silver hair and brown eyes" width="320" height="360"
          className={`absolute inset-0 h-full w-full object-contain ${ready ? "invisible" : "visible"}`} />
        <canvas ref={canvas} width="320" height="360" tabIndex={ready ? 0 : -1}
          role="img" aria-label="Rotatable 3D avatar of Maleek, with silver hair and brown eyes"
          aria-describedby="avatar-instructions" onKeyDown={rotateWithKeys}
          onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag}
          onPointerCancel={endDrag} onLostPointerCapture={endDrag}
          className={`absolute inset-0 h-full w-full touch-pan-y rounded-full outline-offset-4 ${ready ? "visible" : "invisible"} ${dragging ? "cursor-grabbing" : "cursor-grab"}`} />
      </div>
      <div className="mt-2 flex min-h-8 items-center justify-center gap-3 text-xs text-muted-foreground">
        <p id="avatar-instructions">{ready && !failed ? "Drag to look around" : "Hello, I'm Maleek."}<span className="sr-only">. Use arrow keys to rotate and Home to reset.</span></p>
        {ready && <button type="button" onClick={() => viewer.current?.reset()} aria-label="Reset avatar rotation"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted hover:text-foreground">
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
        </button>}
      </div>
    </div>
  )
}
