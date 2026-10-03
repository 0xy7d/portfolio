CREATE TABLE IF NOT EXISTS guestbook_signatures (
  entry_id INTEGER PRIMARY KEY REFERENCES guestbook_entries(id) ON DELETE CASCADE,
  strokes TEXT NOT NULL CHECK(json_valid(strokes) AND length(strokes) <= 24000)
);
