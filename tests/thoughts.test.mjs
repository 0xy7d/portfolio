import assert from "node:assert/strict"
import test from "node:test"
import { parseThoughtsFeed, thoughtsSite } from "../lib/thoughts.ts"

function article(slug, date, overrides = {}) {
  return { title: slug, url: `${thoughtsSite}/${slug}`, date_published: date, tags: ["research"], ...overrides }
}

test("shows the three newest unique articles regardless of source order", () => {
  const feed = { items: [
    article("old", "2023-01-01T00:00:00Z"),
    article("new", "2026-04-08T00:00:00Z"),
    article("middle", "2025-01-01T00:00:00Z"),
    article("recent", "2026-01-01T00:00:00Z"),
    article("new", "2026-04-08T00:00:00Z"),
  ] }
  assert.deepEqual(parseThoughtsFeed(feed).map(({ title }) => title), ["new", "recent", "middle"])
  assert.equal(parseThoughtsFeed(feed)[0].category, "research")
})

test("ignores malformed dates and unsafe or unrelated links without hiding valid posts", () => {
  const feed = { items: [
    null,
    article("bad-date", "invalid"),
    article("blank", "2026-01-01", { title: "  " }),
    article("outside", "2026-01-01", { url: "https://example.com/post" }),
    article("script", "2026-01-01", { url: "javascript:alert(1)" }),
    article("credentials", "2026-01-01", { url: "https://user:password@thoughts.0xy7d.xyz/post" }),
    article("valid", "2026-04-08T00:00:00Z", { title: " A real thought " }),
  ] }
  assert.deepEqual(parseThoughtsFeed(feed), [{
    title: "A real thought", url: `${thoughtsSite}/valid`, date: "2026-04-08T00:00:00.000Z", category: "research",
  }])
})

test("distinguishes an empty feed from an invalid response", () => {
  assert.deepEqual(parseThoughtsFeed({ items: [] }), [])
  for (const feed of [null, "an HTML fallback", {}, { items: "invalid" }]) {
    assert.throws(() => parseThoughtsFeed(feed), /Invalid thoughts feed/)
  }
})
