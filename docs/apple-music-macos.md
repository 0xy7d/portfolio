# Read and publish playback from a Mac

This publisher reads the **native macOS Music app**. It does not read Apple Music playing in a browser, and your public Apple Music profile does not expose a live track. It uses the existing portfolio endpoint and requires no Apple Music developer token.

The script runs on your Mac, not Cloudflare. Cloudflare settings alone cannot connect a listening device. The Codex cloud workspace cannot inspect your Mac's playback.

## 1. Verify the track before publishing

Save `scripts/apple-music-macos.sh` on your Mac. For example, save it to `~/Documents/0xy7d/apple-music-macos.sh`. Play a song in the Music app, then run:

```sh
/bin/bash "$HOME/Documents/0xy7d/apple-music-macos.sh" --inspect
```

The first run may ask permission to control Music. Allow it. This permission lets the script read Music's playback metadata. It does not make the script start, pause, or change playback.

The result contains the track title, artist, optional album and `playing: true`. A paused or closed Music app returns `{"playing":false}`. This mode does not read a publishing token or contact the website. Inspect this result first if the website's track is missing or incorrect.

You can run inspection entirely through **Shortcuts**: create a Shortcut, add **Run Shell Script**, paste the command above, then add **Show Result**. Enable **Allow Running Scripts** in Shortcuts' advanced settings if prompted. If permission is denied, check **System Settings → Privacy & Security → Automation** for the app running the script and allow Music access.

## 2. Save the publishing token privately

Open **Keychain Access** on your Mac and create a new password item:

- Keychain item name: `0xy7d-music-webhook`
- Account name: your Mac username
- Password: the exact `MUSIC_WEBHOOK_TOKEN` saved in the Cloudflare Pages project's Production secrets

Keep the item in your login keychain. Do not paste the token into the repository or a public Shortcut. Keychain may ask permission for the `security` command to read the item when publishing; allow it for this private script if you want unattended updates.

## 3. Publish once through a Mac Shortcut

Create a Shortcut named **Publish my music**. Add **Run Shell Script**:

```sh
/bin/bash "$HOME/Documents/0xy7d/apple-music-macos.sh" --once
```

Add **Show Result**. Run it while the native Music app is playing. Successful publishing returns `{"updated":true}`. Open `https://0xy7d.xyz/api/music` and confirm its title and artist match the inspection result. The homepage checks every 45 seconds, so allow its next poll or refresh.

If the script reports an HTTP error, it has not confirmed a successful update. Check `https://0xy7d.xyz/api/status`, the saved token and the Production binding. Do not share token values while debugging.

## 4. Keep updates running during listening

To refresh the track every 30 seconds and report actual pauses, run:

```sh
/bin/bash "$HOME/Documents/0xy7d/apple-music-macos.sh" --watch
```

You can use that command in a separate **Watch my music** Shortcut with a Run Shell Script action. It is a long-running action: keep it running during the listening session and stop it when finished. A terminal session can also run it until you press Ctrl+C.

This watcher reads the real player state each time. Pausing or closing Music sends `playing: false`. Mac sleep, stopping the watcher, or losing the connection stops heartbeats; the website changes to **Recently listened** after two minutes without a fresh playing update.

The watcher does not install a login item or launch agent, and does not restart itself after a reboot. Reopen it for your next listening session. Music played through another app or a browser requires a publisher that can read that application's state.
