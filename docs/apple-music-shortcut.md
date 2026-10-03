# Publish Apple Music playback with Shortcuts

This is a private Shortcut on the device where you listen. Your public Apple Music profile does not provide a live playback feed. The Shortcut calls the portfolio's music endpoint, using the private `MUSIC_WEBHOOK_TOKEN` configured in Cloudflare.

## Publish the current song

Create a Shortcut named **Publish my music**:

1. Add **Get Current Song**.
2. Add **If** the Current Song has any value. If there is no song, send the pause request below and stop the Shortcut.
3. Inside the song branch, add **Get Details of Music** twice: get **Name** and **Artist** from **Current Song**. You can also get **Album** if you want it displayed by the API.
4. Add **URL**, set to `https://0xy7d.xyz/api/music`.
5. Add **Get Contents of URL**. Expand its options:
   - Method: **POST**.
   - Headers: `Authorization` → `Bearer YOUR_MUSIC_WEBHOOK_TOKEN`; `Content-Type` → `application/json`.
   - Request Body: **JSON**.
   - `title`: Text, select the Name variable.
   - `artist`: Text, select the Artist variable.
   - `playing`: **Boolean**, true. Use a Boolean, not the text `true`.
   - Optional `album`: Text, select the Album variable. Omit it if the song has no album.
6. Add **Show Result** after Get Contents of URL so you can inspect the response. A successful update returns `{"updated":true}`. Then end the If block. Run the Shortcut while music is actually playing. Shortcuts will ask for permission to contact `0xy7d.xyz` the first time.

Names and artists are enough to update the card. You can optionally add `url` with a song's `https://music.apple.com/...` link, and `artworkUrl` with a URL served by Apple's `*.mzstatic.com` or `images.apple.com` hosts. These must be URL strings, not an image file or a Shortcuts music object. Without a song URL the card opens your personal Apple Music profile; without artwork it displays a music icon.

The request has this shape:

```json
{
  "title": "Song name",
  "artist": "Artist name",
  "playing": true
}
```

## Pause or stop publishing

Create a second Shortcut named **Pause my music card** with the same URL, POST method, and headers. Its JSON body contains only a Boolean `playing` set to false:

```json
{ "playing": false }
```

This preserves the last song while removing its live state. Run it when you pause or stop playback. You can place both Shortcuts on your Home Screen or use the Action Button or Siri.

## Keeping the card live

Run **Publish my music** at the start of listening. For updates during a listening session, a wrapper Shortcut can **Repeat**: run Publish my music, **Wait** 30 seconds, then repeat. Stop the wrapper and run Pause my music card when playback stops. Test on your own device before relying on it.

Shortcuts on iOS cannot reliably run continuously in the background, and **Get Current Song** may still return the last song while paused. There is no generic iOS song-change automation to rely on here. The Shortcut must be run only during actual playback; if an unattended loop keeps sending `playing: true` while paused, the website cannot know that playback stopped. For dependable unattended publishing you need a device-side automation that can observe real playback state, such as Music scripting on macOS.

The server therefore treats a playing update as live for two minutes. If iOS suspends the Shortcut or your connection stops, the card becomes **Recently listened** at the next poll rather than implying you are still listening. A single Shortcut run is a brief live update, not a permanent background connection. The page polls every 45 seconds while visible.

## Protect the token

Keep the publishing Shortcut private. Remove the Authorization token before sharing or exporting it. Rotate `MUSIC_WEBHOOK_TOKEN` in Cloudflare if it is exposed, then update your private Shortcuts. The token is only for publishing music; it does not grant guestbook access.

## Troubleshooting

- **401**: Authorization is missing or does not match the Cloudflare secret. It must start with `Bearer `, including the space.
- **400**: Check that `playing` is a Boolean and title/artist are nonempty text. Omit empty optional fields. Song links must be from `music.apple.com` and artwork must be from Apple's image hosts.
- **503**: Check the `PORTFOLIO_DB` binding, applied migration, and `MUSIC_WEBHOOK_TOKEN` secret, then redeploy.
- **Recently listened** after a successful run: send another playing update. Background execution may have stopped, or more than two minutes have elapsed.
