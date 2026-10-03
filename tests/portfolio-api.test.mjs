import assert from 'node:assert/strict'
import { test } from 'node:test'
import { handleApi } from '../server/portfolio-api.ts'
import { parseMusic } from '../lib/music.ts'
import { testDatabase } from './helpers/database.mjs'

const origin = 'https://0xy7d.xyz'
const start = Date.parse('2026-10-03T12:00:00Z')
function fixture(t) {
  const database = testDatabase()
  t.after(() => database.sqlite.close())
  const env = { PORTFOLIO_DB: database, RESEND_API_KEY: 'test-only', APP_SECRET: 'a'.repeat(64), MUSIC_WEBHOOK_TOKEN: 'm'.repeat(64), APPLE_MUSIC_PROFILE_URL: 'https://music.apple.com/profile/example' }
  const emails = []
  let now = start
  let delivered = true
  const send = async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails')
    emails.push(JSON.parse(options.body))
    return new Response('{}', { status: delivered ? 200 : 500 })
  }
  const request = (path, body, headers = {}) => handleApi(new Request(`${origin}/api/${path}`, {
    method: body === undefined ? 'GET' : 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1', ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  }), env, send, now)
  const code = () => emails.at(-1).text.match(/is (\d{6})/)[1]
  async function signIn(email = 'reader@example.com') {
    const sent = await request('guestbook/request-code', { email })
    assert.equal(sent.status, 200)
    const challenge = await sent.json()
    const verified = await request('guestbook/verify', { challengeId: challenge.challengeId, code: code() })
    assert.equal(verified.status, 200)
    return verified.headers.get('Set-Cookie').split(';')[0]
  }
  return { database, env, emails, request, code, signIn, advance: ms => { now += ms }, failDelivery: () => { delivered = false } }
}

test('Resend OTP establishes a private session; posting, persistence and logout work', async t => {
  const f = fixture(t)
  const cookie = await f.signIn(' Reader@Example.com ')
  assert.equal(f.emails[0].from, 'Malik <guestbook@0xy7d.xyz>')
  assert.deepEqual(f.emails[0].to, ['reader@example.com'])
  assert.equal((await f.request('guestbook/session', undefined, { Cookie: cookie }).then(r => r.json())).authenticated, true)
  const posted = await f.request('guestbook/entries', { name: ' Ada ', message: 'Hello!\n<script>alert(1)</script>' }, { Cookie: cookie })
  assert.equal(posted.status, 201)
  assert.equal((await posted.json()).entry.name, 'Ada')
  const publicData = await f.request('guestbook/entries').then(r => r.json())
  assert.equal(publicData.entries[0].message, 'Hello!\n<script>alert(1)</script>')
  assert.deepEqual(Object.keys(publicData.entries[0]).sort(), ['createdAt', 'id', 'message', 'name'])
  const stored = f.database.sqlite.prepare('SELECT * FROM guestbook_entries').get()
  assert.match(stored.email_key, /^[a-f0-9]{64}$/)
  assert.ok(!JSON.stringify(stored).includes('reader@example.com'))
  const loggedOut = await f.request('guestbook/logout', {}, { Cookie: cookie })
  assert.match(loggedOut.headers.get('Set-Cookie'), /Max-Age=0/)
  assert.equal((await f.request('guestbook/session', undefined, { Cookie: cookie }).then(r => r.json())).authenticated, false)
  assert.equal((await f.request('guestbook/entries', { name: 'Ada', message: 'Again' }, { Cookie: cookie })).status, 401)
})

test('codes are single-use even when two verifications race, and cookies have browser protections', async t => {
  const f = fixture(t)
  const { challengeId } = await f.request('guestbook/request-code', { email: 'reader@example.com' }).then(r => r.json())
  const input = { challengeId, code: f.code() }
  const responses = await Promise.all([f.request('guestbook/verify', input), f.request('guestbook/verify', input)])
  assert.deepEqual(responses.map(r => r.status).sort(), [200, 400])
  const cookie = responses.find(r => r.status === 200).headers.get('Set-Cookie')
  for (const flag of ['HttpOnly', 'SameSite=Strict', 'Secure', 'Path=/api/guestbook', 'Max-Age=604800']) assert.ok(cookie.includes(flag))
  assert.equal(f.database.sqlite.prepare('SELECT count(*) AS count FROM guestbook_sessions').get().count, 1)
  assert.equal((await f.request('guestbook/verify', input)).status, 400)
})

test('five incorrect guesses lock a code, and an expired code cannot create a session', async t => {
  const f = fixture(t)
  const { challengeId } = await f.request('guestbook/request-code', { email: 'reader@example.com' }).then(r => r.json())
  const correct = f.code(), wrong = correct === '000000' ? '111111' : '000000'
  for (let i = 0; i < 5; i++) assert.equal((await f.request('guestbook/verify', { challengeId, code: wrong })).status, 400)
  assert.equal((await f.request('guestbook/verify', { challengeId, code: correct })).status, 400)
  f.advance(60_001)
  const next = await f.request('guestbook/request-code', { email: 'reader@example.com' }).then(r => r.json())
  f.advance(300_000)
  assert.equal((await f.request('guestbook/verify', { challengeId: next.challengeId, code: f.code() })).status, 400)
  assert.equal(f.database.sqlite.prepare('SELECT count(*) AS count FROM guestbook_sessions').get().count, 0)
})

test('resending invalidates the previous code, and sessions expire after seven days', async t => {
  const f = fixture(t)
  const old = await f.request('guestbook/request-code', { email: 'reader@example.com' }).then(r => r.json())
  const oldCode = f.code()
  f.advance(60_001)
  const fresh = await f.request('guestbook/request-code', { email: 'reader@example.com' }).then(r => r.json())
  assert.equal((await f.request('guestbook/verify', { challengeId: old.challengeId, code: oldCode })).status, 400)
  const response = await f.request('guestbook/verify', { challengeId: fresh.challengeId, code: f.code() })
  const cookie = response.headers.get('Set-Cookie').split(';')[0]
  f.advance(7 * 24 * 60 * 60_000)
  assert.equal((await f.request('guestbook/session', undefined, { Cookie: cookie }).then(r => r.json())).authenticated, false)
})

test('failed email delivery discards the challenge without exposing provider details', async t => {
  const f = fixture(t)
  f.failDelivery()
  assert.equal((await f.request('guestbook/request-code', { email: 'reader@example.com' })).status, 502)
  assert.equal(f.database.sqlite.prepare('SELECT count(*) AS count FROM otp_challenges').get().count, 0)
})

test('origin checks, validation, cooldown and per-email limits prevent unsafe posts and repeated sends', async t => {
  const f = fixture(t)
  assert.equal((await f.request('guestbook/request-code', { email: 'reader@example.com' }, { Origin: 'https://elsewhere.example' })).status, 403)
  assert.equal((await f.request('guestbook/request-code', { email: 'invalid' })).status, 400)
  const cookie = await f.signIn()
  const repeated = await f.request('guestbook/request-code', { email: 'reader@example.com' })
  assert.equal(repeated.status, 429)
  assert.equal(repeated.headers.get('Retry-After'), '60')
  assert.equal((await f.request('guestbook/entries', { name: 'Ada', message: 'x'.repeat(501) }, { Cookie: cookie })).status, 400)
  assert.equal((await f.request('guestbook/entries', { name: 'Ada', message: 'a'.repeat(9000) }, { Cookie: cookie })).status, 413)
  assert.equal((await f.request('guestbook/entries', { name: 'Ada', message: 'Hi' }, { Cookie: cookie })).status, 201)
  assert.equal((await f.request('guestbook/entries', { name: 'Ada', message: 'Again' }, { Cookie: cookie })).status, 429)
  f.advance(60_001)
  assert.equal((await f.request('guestbook/entries', { name: 'Ada', message: 'Later' }, { Cookie: cookie })).status, 201)
})

test('email and IP send limits apply across cooldown windows', async t => {
  const f = fixture(t)
  for (let i = 0; i < 5; i++) {
    assert.equal((await f.request('guestbook/request-code', { email: 'reader@example.com' })).status, 200)
    f.advance(60_001)
  }
  assert.equal((await f.request('guestbook/request-code', { email: 'reader@example.com' })).status, 429)
  for (let i = 0; i < 4; i++) assert.equal((await f.request('guestbook/request-code', { email: `reader${i}@example.com` })).status, 200)
  assert.equal((await f.request('guestbook/request-code', { email: 'another@example.com' })).status, 429)
})

test('public pagination returns every entry once without disclosing private identifiers', async t => {
  const f = fixture(t)
  for (let i = 0; i < 25; i++) f.database.sqlite.prepare('INSERT INTO guestbook_entries(email_key, name, message, created_at) VALUES (?, ?, ?, ?)').run('private', 'Reader', `Note ${i}`, start + i)
  const first = await f.request('guestbook/entries').then(r => r.json())
  assert.equal(first.entries.length, 20)
  const next = await f.request(`guestbook/entries?before=${first.nextCursor}`).then(r => r.json())
  assert.equal(next.entries.length, 5)
  assert.equal(next.nextCursor, null)
  assert.equal(new Set([...first.entries, ...next.entries].map(entry => entry.id)).size, 25)
  assert.ok(!JSON.stringify(first).includes('private'))
  assert.equal((await f.request('guestbook/entries?before=-1')).status, 400)
})

test('unconfigured features fail gracefully without fake playback or authentication', async () => {
  const request = path => handleApi(new Request(`${origin}/api/${path}`), {})
  assert.deepEqual(await request('guestbook/session').then(r => r.json()), { authenticated: false, available: false })
  assert.equal((await request('guestbook/entries')).status, 503)
  assert.deepEqual(await request('music').then(r => r.json()), { track: null, isPlaying: false, profileUrl: 'https://music.apple.com/profile/0xy7d' })
})

test('Apple Shortcut updates require the owner token and Apple URLs; fresh, stale and paused playback are distinct', async t => {
  const f = fixture(t)
  const track = { title: 'A song', artist: 'An artist', album: 'An album', url: 'https://music.apple.com/ng/album/example/123?i=456', artworkUrl: 'https://is1-ssl.mzstatic.com/image/example.jpg', playing: true }
  const auth = { Authorization: `Bearer ${f.env.MUSIC_WEBHOOK_TOKEN}` }
  assert.equal((await f.request('music', track)).status, 401)
  assert.equal((await f.request('music', { ...track, url: 'javascript:alert(1)' }, auth)).status, 400)
  assert.equal((await f.request('music', { ...track, artworkUrl: 'https://elsewhere.example/tracking' }, auth)).status, 400)
  assert.equal((await f.request('music', track, auth)).status, 200)
  let music = await f.request('music').then(r => r.json())
  assert.equal(music.isPlaying, true)
  assert.equal(music.track.title, track.title)
  assert.equal(music.profileUrl, f.env.APPLE_MUSIC_PROFILE_URL)
  f.advance(120_000)
  music = await f.request('music').then(r => r.json())
  assert.equal(music.isPlaying, false)
  assert.equal(music.track.title, track.title)
  await f.request('music', track, auth)
  await f.request('music', { playing: false }, auth)
  assert.equal((await f.request('music').then(r => r.json())).isPlaying, false)
})

test('music rendering drops invalid data and untrusted links', () => {
  assert.equal(parseMusic({ track: { title: 'Hi', artist: 'Reader', updatedAt: 'invalid' }, isPlaying: true }).track, null)
  const parsed = parseMusic({ track: { title: 'Hi', artist: 'Reader', updatedAt: new Date(start).toISOString(), url: 'https://evil.example', artworkUrl: 'https://evil.example' }, profileUrl: 'javascript:alert(1)', isPlaying: true })
  assert.equal(parsed.track.url, null)
  assert.equal(parsed.track.artworkUrl, null)
  assert.equal(parsed.profileUrl, 'https://music.apple.com/profile/0xy7d')
})
