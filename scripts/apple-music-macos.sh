#!/bin/bash
# Private owner-side publisher for the native macOS Music app.
set -euo pipefail

mode="${1:---once}"
case "$mode" in --inspect|--once|--watch) ;; *) printf 'Use --inspect, --once, or --watch.\n' >&2; exit 2 ;; esac
if [ "$(uname -s)" != Darwin ]; then
  printf 'This publisher requires macOS and the native Music app.\n' >&2
  exit 1
fi

read_playback() {
  /usr/bin/osascript -l JavaScript <<'JXA'
var music = Application('Music');
var payload = { playing: false };
if (music.running() && music.playerState() === 'playing') {
  var track = music.currentTrack();
  var title = (track.name() || '').trim().slice(0, 200);
  var artist = (track.artist() || '').trim().slice(0, 200);
  var album = (track.album() || '').trim().slice(0, 200);
  if (!title) throw new Error('Music is playing but no track title is available.');
  payload = { title: title, artist: artist || 'Unknown artist', playing: true };
  if (album) payload.album = album;
}
JSON.stringify(payload);
JXA
}

# Inspection never reads a token or sends a network request.
if [ "$mode" = --inspect ]; then
  read_playback
  exit
fi

if ! token="$(/usr/bin/security find-generic-password -s 0xy7d-music-webhook -w)"; then
  printf 'Save MUSIC_WEBHOOK_TOKEN in Keychain Access as 0xy7d-music-webhook first.\n' >&2
  exit 1
fi
if [ "${#token}" -lt 32 ] || [[ "$token" == *$'\n'* ]] || [[ "$token" == *$'\r'* ]]; then
  printf 'The saved publishing token is invalid. Use the exact Cloudflare secret.\n' >&2
  exit 1
fi

publish() {
  # Header values go through stdin rather than appearing in curl's process arguments.
  printf 'Authorization: Bearer %s\nContent-Type: application/json\n' "$token" |
    /usr/bin/curl --silent --show-error --fail --max-time 10 \
      --header @- --data-binary "$1" https://0xy7d.xyz/api/music || return "$?"
  printf '\n'
}

if [ "$mode" = --once ]; then
  payload="$(read_playback)"
  publish "$payload"
  exit
fi

# Refreshes the live heartbeat and sends playing:false when paused or closed.
while true; do
  if payload="$(read_playback)"; then
    if ! publish "$payload"; then
      printf 'Music publishing failed. Check the connection and saved token; retrying in 30 seconds.\n' >&2
    fi
  else
    printf 'Could not read Music. Check macOS Automation permission; retrying in 30 seconds.\n' >&2
  fi
  sleep 30
done
