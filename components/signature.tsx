"use client"

import { useRef, useState, type PointerEvent } from "react"
import { maxSignaturePoints, maxSignatureStrokes, signatureHeight, signatureWidth, type Signature } from "@/lib/signature"

function Ink({ value }: { value: Signature }) {
  return value.map((stroke, index) => stroke.length === 1
    ? <circle key={index} cx={stroke[0][0]} cy={stroke[0][1]} r={1.5} fill="currentColor" />
    : <polyline key={index} points={stroke.map(point => point.join(",")).join(" ")} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />)
}

export function SignatureDrawing({ value, name }: { value: Signature; name: string }) {
  return <svg role="img" aria-label={`Handwritten signature by ${name}`} viewBox={`0 0 ${signatureWidth} ${signatureHeight}`} className="h-auto w-full max-w-[16rem] text-foreground"><Ink value={value} /></svg>
}

export function SignaturePad({ value, onChange, disabled }: { value: Signature | null; onChange: (value: Signature | null) => void; disabled: boolean }) {
  const drawing = useRef<Signature>(value ?? [])
  const pointer = useRef<number | null>(null)
  const [full, setFull] = useState(false)
  const count = () => drawing.current.reduce((total, stroke) => total + stroke.length, 0)
  function point(event: PointerEvent<SVGSVGElement>): [number, number] {
    const box = event.currentTarget.getBoundingClientRect()
    return [
      Math.round(Math.max(0, Math.min(signatureWidth, (event.clientX - box.left) / box.width * signatureWidth)) * 10) / 10,
      Math.round(Math.max(0, Math.min(signatureHeight, (event.clientY - box.top) / box.height * signatureHeight)) * 10) / 10,
    ]
  }
  function publish(next: Signature) { drawing.current = next; onChange(next.length ? next : null) }
  function start(event: PointerEvent<SVGSVGElement>) {
    if (disabled || pointer.current !== null || event.button !== 0) return
    drawing.current = value ?? []
    if (drawing.current.length >= maxSignatureStrokes || count() >= maxSignaturePoints) { setFull(true); return }
    pointer.current = event.pointerId
    event.currentTarget.setPointerCapture(event.pointerId)
    publish([...drawing.current, [point(event)]])
  }
  function move(event: PointerEvent<SVGSVGElement>) {
    if (disabled || pointer.current !== event.pointerId) return
    if (count() >= maxSignaturePoints) { setFull(true); return }
    const next = point(event), last = drawing.current.at(-1)!
    const previous = last.at(-1)!
    if (Math.hypot(next[0] - previous[0], next[1] - previous[1]) < 1) return
    publish([...drawing.current.slice(0, -1), [...last, next]])
  }
  function stop(event: PointerEvent<SVGSVGElement>) {
    if (pointer.current !== event.pointerId) return
    pointer.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  return (
    <div className="space-y-3">
      <p id="signature-help" className="text-xs leading-relaxed text-muted-foreground">Optional. Draw with your mouse, touch, or pen.</p>
      <svg role="img" aria-label="Signature drawing area" aria-describedby="signature-help" viewBox={`0 0 ${signatureWidth} ${signatureHeight}`}
        className={`h-auto w-full touch-none rounded-md border border-border bg-background text-foreground ${disabled ? "opacity-60" : "cursor-crosshair"}`}
        onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={() => { pointer.current = null }}>
        <line x1={20} y1={125} x2={380} y2={125} stroke="currentColor" opacity={0.15} strokeDasharray="3 5" />
        <Ink value={value ?? []} />
      </svg>
      <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
        <button type="button" className="inline-link disabled:opacity-50" disabled={disabled || !value?.length} onClick={() => { publish((value ?? []).slice(0, -1)); setFull(false) }}>Undo stroke</button>
        <button type="button" className="inline-link disabled:opacity-50" disabled={disabled || !value?.length} onClick={() => { publish([]); setFull(false) }}>Clear signature</button>
      </div>
      {full && <p role="status" className="text-xs text-muted-foreground">This signature is full. Clear it to start again.</p>}
    </div>
  )
}
