"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { SignatureDrawing, SignaturePad } from "@/components/signature"
import { parseSignature, type Signature } from "@/lib/signature"

type Entry = { id: string; name: string; message: string; createdAt: string; signature?: Signature | null }
type Entries = { entries: Entry[]; nextCursor: string | null }
const field = "w-full min-w-0 rounded-md border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground disabled:opacity-60"
const button = "rounded-md border border-border px-4 py-2.5 text-sm hover:bg-muted disabled:cursor-wait disabled:opacity-50"

async function api<T>(path: string, input?: unknown, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`/api/guestbook/${path}`, {
    method: input === undefined ? "GET" : "POST", credentials: "same-origin", cache: "no-store",
    headers: input === undefined ? undefined : { "Content-Type": "application/json" },
    body: input === undefined ? undefined : JSON.stringify(input),
    signal: signal ?? AbortSignal.timeout(15_000),
  })
  const value = await response.json().catch(() => null)
  if (!response.ok) {
    if (response.status === 401) throw new Error("Your sign-in has expired. Sign out and verify your email again.")
    throw new Error(typeof value?.error === "string" ? value.error : "The guestbook is taking a short break. Please try again later.")
  }
  return value as T
}

export function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [available, setAvailable] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [signaturesAvailable, setSignaturesAvailable] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [signature, setSignature] = useState<Signature | null>(null)
  const [email, setEmail] = useState("")
  const [challenge, setChallenge] = useState<string | null>(null)
  const [code, setCode] = useState("")
  const [resendAt, setResendAt] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [pending, setPending] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const codeRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let active = true
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)
    void Promise.allSettled([
      api<Entries>("entries", undefined, controller.signal),
      api<{ authenticated: boolean; available: boolean; signaturesAvailable?: boolean }>("session", undefined, controller.signal),
    ]).then(([list, session]) => {
      if (!active) return
      if (list.status === "fulfilled") { setEntries(list.value.entries); setCursor(list.value.nextCursor) }
      else setError("Messages are unavailable right now. Please try again later.")
      if (session.status === "fulfilled") { setAuthenticated(session.value.authenticated); setAvailable(session.value.available); setSignaturesAvailable(session.value.signaturesAvailable === true) }
      setLoaded(true)
    }).finally(() => clearTimeout(timeout))
    return () => { active = false; clearTimeout(timeout); controller.abort() }
  }, [])

  useEffect(() => {
    if (!resendAt) return
    const update = () => setSeconds(Math.max(0, Math.ceil((resendAt - Date.now()) / 1000)))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [resendAt])

  async function act(action: string, work: () => Promise<void>) {
    if (pending) return
    setPending(action); setError(""); setNotice("")
    try { await work() }
    catch (error) { setError(error instanceof Error && error.name !== "TimeoutError" && error.name !== "AbortError" ? error.message : "That took too long. Please try again.") }
    finally { setPending(null) }
  }

  function requestCode(event?: FormEvent) {
    event?.preventDefault()
    void act("send", async () => {
      const result = await api<{ challengeId: string; resendAfter: number }>("request-code", { email })
      setChallenge(result.challengeId); setCode(""); setResendAt(Date.now() + result.resendAfter * 1000)
      setNotice("Code sent. Check your inbox and spam folder.")
      setTimeout(() => codeRef.current?.focus(), 0)
    })
  }

  function verify(event: FormEvent) {
    event.preventDefault()
    void act("verify", async () => {
      await api("verify", { challengeId: challenge, code })
      setAuthenticated(true); setChallenge(null); setCode(""); setEmail("")
      setNotice("You're signed in. Leave a little something.")
      setTimeout(() => nameRef.current?.focus(), 0)
    })
  }

  function post(event: FormEvent) {
    event.preventDefault()
    void act("post", async () => {
      const result = await api<{ entry: Entry }>("entries", { name, message, signature })
      setEntries(previous => [result.entry, ...previous]); setMessage(""); setSignature(null); setShowSignature(false)
      setNotice("Thanks for stopping by. Your message is here.")
    })
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      <div className="min-w-0 space-y-5 rounded-lg border border-border p-5 sm:p-6">
        <p className="text-sm leading-7 text-muted-foreground">A hello, a thought, or something worth sharing. Leave a note.</p>
        {!loaded ? <p role="status" className="text-sm text-muted-foreground">Opening the guestbook…</p> : !available ? (
          <p className="text-sm leading-relaxed text-muted-foreground">Signing is unavailable for a moment. Come back soon.</p>
        ) : authenticated ? (
          <form onSubmit={post} className="space-y-4">
            <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <span>Email verified</span>
              <button type="button" disabled={!!pending} className="inline-link" onClick={() => void act("logout", async () => {
                await api("logout", {}); setAuthenticated(false); setSignature(null); setShowSignature(false); setNotice("You're signed out.")
              })}>Sign out</button>
            </div>
            <div className="space-y-2"><label htmlFor="guest-name" className="block text-sm">Name</label><input ref={nameRef} id="guest-name" name="name" autoComplete="name" required maxLength={60} value={name} onChange={event => setName(event.target.value)} className={field} disabled={!!pending} /></div>
            <div className="space-y-2"><label htmlFor="guest-message" className="block text-sm">Your note</label><textarea id="guest-message" name="message" required maxLength={500} rows={4} value={message} onChange={event => setMessage(event.target.value)} className={`${field} resize-y`} disabled={!!pending} /><p className="text-right text-xs text-muted-foreground">{message.length}/500</p></div>
            {signaturesAvailable && <div className="space-y-3">
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={showSignature} disabled={!!pending} onChange={event => { setShowSignature(event.target.checked); if (!event.target.checked) setSignature(null) }} className="h-4 w-4 accent-foreground" />Add a drawn signature</label>
              {showSignature && <SignaturePad value={signature} onChange={setSignature} disabled={!!pending} />}
            </div>}
            <p className="text-xs leading-relaxed text-muted-foreground">Your name, note, and any signature will be public. Your email stays private.</p>
            <button type="submit" disabled={!!pending} className={button}>{pending === "post" ? "Leaving your note…" : "Leave a note"}</button>
          </form>
        ) : challenge ? (
          <form onSubmit={verify} className="space-y-4">
            <p className="break-words text-sm leading-relaxed text-muted-foreground">Enter the code sent to {email}. It expires in 5 minutes.</p>
            <div className="space-y-2"><label htmlFor="guest-code" className="block text-sm">Email code</label><input ref={codeRef} id="guest-code" name="code" autoComplete="one-time-code" inputMode="numeric" pattern="[0-9]{6}" required minLength={6} maxLength={6} value={code} onChange={event => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} className={`${field} tracking-[0.35em]`} disabled={!!pending} /></div>
            <button type="submit" disabled={!!pending} className={button}>{pending === "verify" ? "Verifying…" : "Verify email"}</button>
            <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground">
              <button type="button" disabled={!!pending || seconds > 0} onClick={() => requestCode()} className="inline-link disabled:no-underline disabled:opacity-60">{seconds ? `Resend in ${seconds}s` : "Resend code"}</button>
              <button type="button" disabled={!!pending} onClick={() => { setChallenge(null); setCode(""); setError(""); setNotice("") }} className="inline-link">Change email</button>
            </div>
          </form>
        ) : (
          <form onSubmit={requestCode} className="space-y-4">
            <div className="space-y-2"><label htmlFor="guest-email" className="block text-sm">Email</label><input id="guest-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} className={field} disabled={!!pending} /></div>
            <p className="text-xs leading-relaxed text-muted-foreground">Sign in with a code sent to your inbox. Your email stays private.</p>
            <button type="submit" disabled={!!pending} className={button}>{pending === "send" ? "Sending your code…" : "Send me a code"}</button>
          </form>
        )}
        {error && <p role="alert" className="text-sm leading-relaxed text-red-700 dark:text-red-400">{error}</p>}
        {notice && <p role="status" className="text-sm leading-relaxed text-muted-foreground">{notice}</p>}
      </div>
      <div className="min-w-0 space-y-6">
        {loaded && entries.length === 0 && !error && <p className="text-sm leading-7 text-muted-foreground">A fresh page. Be the first to leave a note.</p>}
        {!loaded && <p className="text-sm text-muted-foreground">Loading notes…</p>}
        <ol aria-label="Guestbook messages" className="divide-y divide-border">
          {entries.map(entry => <li key={entry.id} className="space-y-3 py-5 first:pt-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"><p className="min-w-0 max-w-full break-words text-sm">{entry.name}</p><time dateTime={entry.createdAt} className="text-xs text-muted-foreground">{new Date(entry.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</time></div>
            <p className="whitespace-pre-wrap break-words text-sm leading-7 text-muted-foreground">{entry.message}</p>
            {parseSignature(entry.signature) && <SignatureDrawing value={parseSignature(entry.signature)!} name={entry.name} />}
          </li>)}
        </ol>
        {cursor && <button type="button" disabled={!!pending} className={button} onClick={() => void act("more", async () => {
          const result = await api<Entries>(`entries?before=${encodeURIComponent(cursor)}`)
          setEntries(previous => [...previous, ...result.entries.filter(entry => !previous.some(item => item.id === entry.id))]); setCursor(result.nextCursor)
        })}>{pending === "more" ? "Loading…" : "Older notes"}</button>}
      </div>
    </div>
  )
}
