export type MusicStatus = {
  track: { title: string; artist: string; album: string | null; url: string | null; artworkUrl: string | null; updatedAt: string } | null
  isPlaying: boolean
  profileUrl: string
  available: boolean
}

export const emptyMusic: MusicStatus = { track: null, isPlaying: false, profileUrl: "https://music.apple.com/profile/0xy7d", available: false }

function appleLink(value: unknown, artwork = false): string | null {
  if (typeof value !== "string") return null
  try {
    const url = new URL(value)
    const allowed = artwork ? url.hostname.endsWith(".mzstatic.com") || url.hostname === "images.apple.com" : url.hostname === "music.apple.com"
    return url.protocol === "https:" && allowed && !url.username && !url.password ? url.href : null
  } catch { return null }
}

export function parseMusic(value: unknown): MusicStatus {
  if (!value || typeof value !== "object") return emptyMusic
  const input = value as Record<string, unknown>
  const status: MusicStatus = { track: null, isPlaying: false, profileUrl: appleLink(input.profileUrl) ?? emptyMusic.profileUrl, available: input.available === true }
  if (!input.track || typeof input.track !== "object") return status
  const track = input.track as Record<string, unknown>
  if (typeof track.title !== "string" || !track.title.trim() || typeof track.artist !== "string" || !track.artist.trim() || typeof track.updatedAt !== "string" || !Number.isFinite(Date.parse(track.updatedAt))) return status
  status.track = {
    title: track.title, artist: track.artist, updatedAt: track.updatedAt,
    album: typeof track.album === "string" ? track.album : null,
    url: appleLink(track.url), artworkUrl: appleLink(track.artworkUrl, true),
  }
  status.isPlaying = input.isPlaying === true
  return status
}
