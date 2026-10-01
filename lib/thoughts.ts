export const thoughtsSite = "https://thoughts.0xy7d.xyz"

export type Thought = {
  title: string
  url: string
  date: string
  category?: string
}

/** Keep only valid article links from the author's writing site. */
export function parseThoughtsFeed(feed: unknown): Thought[] {
  if (!feed || typeof feed !== "object" || !("items" in feed) || !Array.isArray(feed.items)) {
    throw new Error("Invalid thoughts feed")
  }

  const thoughts: Thought[] = []
  const seen = new Set<string>()
  for (const item of feed.items) {
    if (!item || typeof item !== "object" || typeof item.title !== "string" ||
      !item.title.trim() || typeof item.url !== "string" || typeof item.date_published !== "string") continue

    try {
      const url = new URL(item.url)
      const date = new Date(item.date_published)
      if (url.origin !== thoughtsSite || url.username || url.password || url.pathname === "/" ||
        Number.isNaN(date.getTime()) || seen.has(url.href)) continue

      seen.add(url.href)
      thoughts.push({
        title: item.title.trim(),
        url: url.href,
        date: date.toISOString(),
        category: Array.isArray(item.tags) && typeof item.tags[0] === "string" ? item.tags[0] : undefined,
      })
    } catch {
      // Ignore malformed entries without losing the rest of the writing feed.
    }
  }
  return thoughts.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
}
