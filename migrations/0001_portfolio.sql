CREATE TABLE IF NOT EXISTS otp_challenges (
  id TEXT PRIMARY KEY,
  email_key TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS otp_expiry ON otp_challenges(expires_at);
CREATE INDEX IF NOT EXISTS otp_email ON otp_challenges(email_key);

CREATE TABLE IF NOT EXISTS guestbook_sessions (
  token_hash TEXT PRIMARY KEY,
  email_key TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS session_expiry ON guestbook_sessions(expires_at);

CREATE TABLE IF NOT EXISTS guestbook_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email_key TEXT NOT NULL,
  name TEXT NOT NULL CHECK(length(name) BETWEEN 1 AND 60),
  message TEXT NOT NULL CHECK(length(message) BETWEEN 1 AND 500),
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS rate_expiry ON rate_limits(expires_at);

CREATE TABLE IF NOT EXISTS music_status (
  id INTEGER PRIMARY KEY CHECK(id = 1),
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT,
  url TEXT,
  artwork_url TEXT,
  is_playing INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);
