type Result<T = unknown> = { results: T[]; meta: { changes: number } }
type Statement = {
  bind(...values: unknown[]): Statement
  first<T = Record<string, unknown>>(): Promise<T | null>
  all<T = Record<string, unknown>>(): Promise<Result<T>>
  run(): Promise<Result>
}
export type Database = {
  prepare(sql: string): Statement
  batch(statements: Statement[]): Promise<Result[]>
}
export type Env = {
  PORTFOLIO_DB?: Database
  RESEND_API_KEY?: string
  RESEND_FROM?: string
  APP_SECRET?: string
  MUSIC_WEBHOOK_TOKEN?: string
  APPLE_MUSIC_PROFILE_URL?: string
}

type Session = { email_key: string }
type Music = {
  title: string; artist: string; album: string | null; url: string | null
  artwork_url: string | null; is_playing: number; updated_at: number
}
const encoder = new TextEncoder()
const cookieName = "guestbook_session"
const minute = 60_000
const hour = 60 * minute
const sessionLifetime = 7 * 24 * hour

class ApiError extends Error {
  status: number
  constructor(status: number, message: string) { super(message); this.status = status }
}
function json(value: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(value), {
    status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...extra },
  })
}
function db(env: Env) {
  if (!env.PORTFOLIO_DB) throw new ApiError(503, "This feature is taking a short break. Please try again later.")
  return env.PORTFOLIO_DB
}
function authConfigured(env: Env) {
  return !!(env.PORTFOLIO_DB && env.RESEND_API_KEY && env.APP_SECRET && env.APP_SECRET.length >= 32)
}

/** Operational checks expose names and readiness only, never credentials or user data. */
async function runtimeStatus(env: Env) {
  const tables = ["otp_challenges", "guestbook_sessions", "guestbook_entries", "rate_limits", "music_status"]
  let database: "ready" | "unbound" | "unavailable" = env.PORTFOLIO_DB ? "unavailable" : "unbound"
  let missingTables = env.PORTFOLIO_DB ? [] as string[] : tables
  let receivedMusicUpdate = false
  if (env.PORTFOLIO_DB) {
    try {
      const result = await env.PORTFOLIO_DB.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('otp_challenges', 'guestbook_sessions', 'guestbook_entries', 'rate_limits', 'music_status')").all<{ name: string }>()
      const present = new Set(result.results.map(row => row.name))
      missingTables = tables.filter(name => !present.has(name))
      database = "ready"
      if (present.has("music_status")) receivedMusicUpdate = !!await env.PORTFOLIO_DB.prepare("SELECT id FROM music_status WHERE id = 1").first()
    } catch { database = "unavailable" }
  }
  const guestbookMissing = [
    ...(!env.PORTFOLIO_DB ? ["PORTFOLIO_DB"] : []),
    ...(!env.RESEND_API_KEY ? ["RESEND_API_KEY"] : []),
    ...(!env.APP_SECRET || env.APP_SECRET.length < 32 ? ["APP_SECRET (at least 32 characters)"] : []),
    ...missingTables.filter(name => name !== "music_status"),
  ]
  const musicMissing = [
    ...(!env.PORTFOLIO_DB ? ["PORTFOLIO_DB"] : []),
    ...(!env.MUSIC_WEBHOOK_TOKEN || env.MUSIC_WEBHOOK_TOKEN.length < 32 ? ["MUSIC_WEBHOOK_TOKEN (at least 32 characters)"] : []),
    ...missingTables.filter(name => name === "music_status"),
  ]
  return {
    database: { status: database, missingTables },
    guestbook: { configured: database === "ready" && guestbookMissing.length === 0, missing: guestbookMissing },
    music: { configured: database === "ready" && musicMissing.length === 0, missing: musicMissing, receivedUpdate: receivedMusicUpdate },
  }
}
function sameOrigin(request: Request) {
  if (request.headers.get("Origin") !== new URL(request.url).origin) {
    throw new ApiError(403, "Please use the form on this website.")
  }
}
async function body(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get("Content-Type")?.startsWith("application/json")) throw new ApiError(415, "Please send a valid form.")
  const reader = request.body?.getReader()
  if (!reader) throw new ApiError(400, "Please complete the form.")
  const chunks: Uint8Array[] = []
  let size = 0
  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > 8192) { await reader.cancel(); throw new ApiError(413, "This message is too long.") }
    chunks.push(value)
  }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length }
  try {
    const value: unknown = JSON.parse(new TextDecoder().decode(bytes))
    if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, unknown>
  } catch { /* Return a form error below. */ }
  throw new ApiError(400, "Please send a valid form.")
}
function text(value: unknown, max: number, label: string) {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) {
    throw new ApiError(400, `${label} must be between 1 and ${max} characters.`)
  }
  return value.trim()
}
function hex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, "0")).join("")
}
async function hash(value: string) { return hex(await crypto.subtle.digest("SHA-256", encoder.encode(value))) }
async function sign(secret: string, value: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
  return hex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)))
}
function equal(a: string, b: string) {
  const left = encoder.encode(a), right = encoder.encode(b)
  let different = left.length ^ right.length
  const length = Math.max(left.length, right.length)
  for (let i = 0; i < length; i++) different |= (left[i] ?? 0) ^ (right[i] ?? 0)
  return different === 0
}
function randomToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, "0")).join("")
}
function randomCode() {
  const values = new Uint32Array(1)
  do { crypto.getRandomValues(values) } while (values[0] >= 4_294_000_000)
  return String(values[0] % 1_000_000).padStart(6, "0")
}
function cookie(request: Request, token: string, maxAge: number) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : ""
  return `${cookieName}=${token}; Path=/api/guestbook; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`
}
function sessionToken(request: Request) {
  const value = request.headers.get("Cookie")?.split(";").map(s => s.trim()).find(s => s.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1)
  return value && /^[a-f0-9]{64}$/.test(value) ? value : null
}
async function session(request: Request, env: Env, now: number): Promise<Session | null> {
  const token = sessionToken(request)
  if (!token) return null
  return db(env).prepare("SELECT email_key FROM guestbook_sessions WHERE token_hash = ? AND expires_at > ?").bind(await hash(token), now).first<Session>()
}
async function rate(database: Database, key: string, limit: number, window: number, now: number) {
  const bucket = Math.floor(now / window)
  const allowed = await database.prepare(
    "INSERT INTO rate_limits (key, count, expires_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count = count + 1 WHERE count < ? RETURNING count",
  ).bind(`${key}:${bucket}`, (bucket + 1) * window, limit).first()
  if (!allowed) throw new ApiError(429, "Please wait a little before trying again.")
}
async function cooldown(database: Database, key: string, duration: number, now: number) {
  const allowed = await database.prepare(
    "INSERT INTO rate_limits (key, count, expires_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET expires_at = excluded.expires_at WHERE rate_limits.expires_at <= ? RETURNING count",
  ).bind(key, now + duration, now).first()
  if (!allowed) throw new ApiError(429, "Please wait a minute before trying again.")
}
async function cleanup(database: Database, now: number) {
  await database.batch([
    database.prepare("DELETE FROM otp_challenges WHERE expires_at <= ?").bind(now),
    database.prepare("DELETE FROM guestbook_sessions WHERE expires_at <= ?").bind(now),
    database.prepare("DELETE FROM rate_limits WHERE expires_at <= ?").bind(now),
  ])
}
function appleUrl(value: unknown) {
  if (typeof value !== "string") return null
  try {
    const url = new URL(value)
    return url.protocol === "https:" && url.hostname === "music.apple.com" && !url.username && !url.password ? url.href : null
  } catch { return null }
}
function artworkUrl(value: unknown) {
  if (typeof value !== "string") return null
  try {
    const url = new URL(value)
    return url.protocol === "https:" && (url.hostname.endsWith(".mzstatic.com") || url.hostname === "images.apple.com") && !url.username && !url.password ? url.href : null
  } catch { return null }
}

/** Same-origin API used by Cloudflare Pages Functions. All secrets stay server-side. */
export async function handleApi(request: Request, env: Env, fetcher: typeof fetch = fetch, now = Date.now()): Promise<Response> {
  try {
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/$/, "")
    const method = request.method
    if (path === "/api/status" && method === "GET") return json(await runtimeStatus(env))
    if (path === "/api/music" && method === "GET") {
      const profileUrl = appleUrl(env.APPLE_MUSIC_PROFILE_URL) ?? "https://music.apple.com/profile/0xy7d"
      if (!env.PORTFOLIO_DB) return json({ track: null, isPlaying: false, profileUrl, available: false })
      const track = await env.PORTFOLIO_DB.prepare("SELECT title, artist, album, url, artwork_url, is_playing, updated_at FROM music_status WHERE id = 1").first<Music>()
      return json({ track: track ? { title: track.title, artist: track.artist, album: track.album, url: track.url, artworkUrl: track.artwork_url, updatedAt: new Date(track.updated_at).toISOString() } : null,
        isPlaying: !!track && track.is_playing === 1 && now - track.updated_at < 120_000, profileUrl, available: true })
    }
    if (path === "/api/music" && method === "POST") {
      if (!env.MUSIC_WEBHOOK_TOKEN || env.MUSIC_WEBHOOK_TOKEN.length < 32) throw new ApiError(503, "Music updates are unavailable.")
      const token = request.headers.get("Authorization")?.replace(/^Bearer /, "") ?? ""
      if (!equal(token, env.MUSIC_WEBHOOK_TOKEN)) throw new ApiError(401, "Unauthorised.")
      const input = await body(request)
      if (typeof input.playing !== "boolean") throw new ApiError(400, "Include the playback state.")
      if (input.playing === false && input.title === undefined) {
        await db(env).prepare("UPDATE music_status SET is_playing = 0 WHERE id = 1").run()
        return json({ updated: true })
      }
      const title = text(input.title, 200, "Track title")
      const artist = text(input.artist, 200, "Artist")
      const album = input.album === undefined ? null : text(input.album, 200, "Album")
      const link = input.url === undefined ? null : appleUrl(input.url)
      const artwork = input.artworkUrl === undefined ? null : artworkUrl(input.artworkUrl)
      if (input.url !== undefined && !link) throw new ApiError(400, "Use an Apple Music link.")
      if (input.artworkUrl !== undefined && !artwork) throw new ApiError(400, "Use Apple artwork.")
      await db(env).prepare(
        "INSERT INTO music_status (id, title, artist, album, url, artwork_url, is_playing, updated_at) VALUES (1, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET title=excluded.title, artist=excluded.artist, album=excluded.album, url=excluded.url, artwork_url=excluded.artwork_url, is_playing=excluded.is_playing, updated_at=excluded.updated_at",
      ).bind(title, artist, album, link, artwork, input.playing ? 1 : 0, now).run()
      return json({ updated: true })
    }
    if (path === "/api/guestbook/session" && method === "GET") {
      if (!env.PORTFOLIO_DB) return json({ authenticated: false, available: false })
      return json({ authenticated: !!await session(request, env, now), available: authConfigured(env) })
    }
    if (path === "/api/guestbook/entries" && method === "GET") {
      const cursor = url.searchParams.get("before")
      if (cursor !== null && !/^[1-9][0-9]{0,14}$/.test(cursor)) throw new ApiError(400, "Invalid page.")
      const result = await db(env).prepare("SELECT id, name, message, created_at FROM guestbook_entries WHERE id < ? ORDER BY id DESC LIMIT 21").bind(cursor ? Number(cursor) : Number.MAX_SAFE_INTEGER).all<{ id: number; name: string; message: string; created_at: number }>()
      const entries = result.results.slice(0, 20).map(item => ({ id: String(item.id), name: item.name, message: item.message, createdAt: new Date(item.created_at).toISOString() }))
      return json({ entries, nextCursor: result.results.length > 20 ? entries[entries.length - 1].id : null })
    }
    if (path.startsWith("/api/guestbook/") && method === "POST") {
      sameOrigin(request)
      if (!authConfigured(env)) throw new ApiError(503, "The guestbook is taking a short break. Please try again later.")
      const database = db(env)
      const secret = env.APP_SECRET!
      const ip = await sign(secret, `ip:${request.headers.get("CF-Connecting-IP") ?? "local"}`)
      await cleanup(database, now)
      if (path === "/api/guestbook/request-code") {
        const input = await body(request)
        const email = text(input.email, 254, "Email").toLowerCase()
        if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) throw new ApiError(400, "Enter a valid email address.")
        const emailKey = await sign(secret, `email:${email}`)
        await rate(database, `otp-ip:${ip}`, 10, hour, now)
        await rate(database, `otp-email:${emailKey}`, 5, hour, now)
        await cooldown(database, `otp-cooldown:${emailKey}`, minute, now)
        const id = crypto.randomUUID(), code = randomCode()
        const codeHash = await sign(secret, `otp:${id}:${code}`)
        await database.batch([
          database.prepare("DELETE FROM otp_challenges WHERE email_key = ?").bind(emailKey),
          database.prepare("INSERT INTO otp_challenges (id, email_key, code_hash, expires_at) VALUES (?, ?, ?, ?)").bind(id, emailKey, codeHash, now + 5 * minute),
        ])
        let delivered = false
        try {
          const response = await fetcher("https://api.resend.com/emails", {
            method: "POST", headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `guestbook-${id}` },
            body: JSON.stringify({ from: env.RESEND_FROM ?? "Malik <guestbook@0xy7d.xyz>", to: [email], subject: "Your guestbook sign-in code", text: `Your code for Malik's guestbook is ${code}.\n\nIt expires in 5 minutes. If you didn't request this code, you can ignore this email.` }),
            signal: AbortSignal.timeout(10_000),
          })
          delivered = response.ok
        } catch { /* Discard undelivered challenges below. */ }
        if (!delivered) {
          await database.prepare("DELETE FROM otp_challenges WHERE id = ?").bind(id).run()
          throw new ApiError(502, "We couldn't send your code. Please try again in a minute.")
        }
        return json({ challengeId: id, expiresIn: 300, resendAfter: 60 })
      }
      if (path === "/api/guestbook/verify") {
        const input = await body(request)
        if (typeof input.challengeId !== "string" || !/^[a-f0-9-]{36}$/.test(input.challengeId) || typeof input.code !== "string" || !/^\d{6}$/.test(input.code)) throw new ApiError(400, "Enter the 6-digit code from your email.")
        await rate(database, `verify-ip:${ip}`, 30, 10 * minute, now)
        const challenge = await database.prepare("UPDATE otp_challenges SET attempts = attempts + 1 WHERE id = ? AND expires_at > ? AND attempts < 5 RETURNING code_hash").bind(input.challengeId, now).first<{ code_hash: string }>()
        const codeHash = await sign(secret, `otp:${input.challengeId}:${input.code}`)
        if (!challenge || !equal(codeHash, challenge.code_hash)) throw new ApiError(400, "That code is invalid or has expired. Request a new code if needed.")
        const token = randomToken()
        // D1 batches are transactional: one verification consumes the challenge once.
        const claimed = await database.batch([
          database.prepare("INSERT INTO guestbook_sessions (token_hash, email_key, expires_at) SELECT ?, email_key, ? FROM otp_challenges WHERE id = ? AND code_hash = ? AND expires_at > ?").bind(await hash(token), now + sessionLifetime, input.challengeId, codeHash, now),
          database.prepare("DELETE FROM otp_challenges WHERE id = ? AND code_hash = ?").bind(input.challengeId, codeHash),
        ])
        if (claimed[0].meta.changes !== 1) throw new ApiError(400, "That code has already been used. Request a new code.")
        return json({ authenticated: true }, 200, { "Set-Cookie": cookie(request, token, sessionLifetime / 1000) })
      }
      if (path === "/api/guestbook/logout") {
        const token = sessionToken(request)
        if (token) await database.prepare("DELETE FROM guestbook_sessions WHERE token_hash = ?").bind(await hash(token)).run()
        return json({ authenticated: false }, 200, { "Set-Cookie": cookie(request, "", 0) })
      }
      if (path === "/api/guestbook/entries") {
        const signedIn = await session(request, env, now)
        if (!signedIn) throw new ApiError(401, "Verify your email before leaving a message.")
        const input = await body(request)
        const name = text(input.name, 60, "Name"), message = text(input.message, 500, "Message")
        await rate(database, `post-ip:${ip}`, 20, hour, now)
        await rate(database, `post-email:${signedIn.email_key}`, 10, 24 * hour, now)
        await cooldown(database, `post-cooldown:${signedIn.email_key}`, minute, now)
        const row = await database.prepare("INSERT INTO guestbook_entries (email_key, name, message, created_at) VALUES (?, ?, ?, ?) RETURNING id").bind(signedIn.email_key, name, message, now).first<{ id: number }>()
        return json({ entry: { id: String(row!.id), name, message, createdAt: new Date(now).toISOString() } }, 201)
      }
    }
    return json({ error: "Not found." }, 404)
  } catch (error) {
    if (error instanceof ApiError) return json({ error: error.message }, error.status, error.status === 429 ? { "Retry-After": "60" } : {})
    return json({ error: "This feature is taking a short break. Please try again later." }, 503)
  }
}
