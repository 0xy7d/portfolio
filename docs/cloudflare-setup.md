# Music and guestbook setup

The website remains a Next.js static export. Cloudflare Pages Functions serves `/api/*` and Cloudflare D1 stores the guestbook, private sign-in state, and the latest music update. No Apple Music developer token is required. The owner publishes playback from Apple Shortcuts.

## 1. Create and bind D1

In the Cloudflare dashboard, create a D1 database named `portfolio`. In **Workers & Pages → portfolio → Settings → Bindings**, add a D1 binding named **PORTFOLIO_DB** pointing to that database. Bind it in Production. If you enable Preview, use a separate preview database so tests do not change production messages or playback.

Copy `wrangler.example.jsonc` to `wrangler.local.jsonc`, replace the database ID with the ID from Cloudflare, and apply the migration from this repository:

```sh
npx wrangler d1 migrations apply portfolio --remote --config wrangler.local.jsonc
```

`wrangler.local.jsonc` is ignored by Git. It is a maintenance/development config, not the deployment source of truth. The existing GitHub workflow continues deploying with `wrangler pages deploy out --project-name=portfolio --branch=main`, and uses the project's dashboard bindings. Do not rename the example file to `wrangler.jsonc` without deliberately migrating your dashboard settings into it.

## 2. Configure email and secrets

Verify **0xy7d.xyz** in Resend and add the DNS records that Resend provides. Create an API key allowed to send from the verified domain. The default sender is **Malik <guestbook@0xy7d.xyz>**. This sender does not require a mailbox, but the domain must be verified.

Set these in **Workers & Pages → portfolio → Settings → Variables and Secrets** for Production:

| Name | Type | Value |
| --- | --- | --- |
| `RESEND_API_KEY` | Secret | The Resend sending API key |
| `APP_SECRET` | Secret | A random value with at least 32 characters |
| `MUSIC_WEBHOOK_TOKEN` | Secret | A different random value with at least 32 characters |
| `APPLE_MUSIC_PROFILE_URL` | Text, optional | `https://music.apple.com/profile/0xy7d` (also the default) |
| `RESEND_FROM` | Text, optional | `Malik <guestbook@0xy7d.xyz>` (also the default) |

Generate each secret separately, for example with `openssl rand -hex 32`. Never put these values in source control, a `NEXT_PUBLIC_*` variable, a public Shortcut share link, or a PR. `APP_SECRET` also protects private email/IP identifiers; changing it invalidates outstanding codes and resets their rate-limit identity. Existing sessions expire naturally after seven days.

Alternatively, Wrangler prompts privately for secret values:

```sh
npx wrangler pages secret put RESEND_API_KEY --project-name=portfolio
npx wrangler pages secret put APP_SECRET --project-name=portfolio
npx wrangler pages secret put MUSIC_WEBHOOK_TOKEN --project-name=portfolio
```

Redeploy after configuring the database and secrets. The workflow finds the root `functions` directory automatically; `public/_routes.json` limits Functions requests to `/api/*` and keeps the rest of the website static. A plain upload of `out` through the dashboard will not upload Functions. Use the repository's Wrangler workflow.

The guestbook can display existing notes without Resend. New sign-ins require Resend and `APP_SECRET`. Codes expire after five minutes, permit five guesses, and can only be used once. Sessions last seven days. Public responses contain only name, note, timestamp, and entry ID. Email is sent only to Resend for delivery; the database stores a keyed digest instead of the address.

## 3. Set up the Apple Shortcut

Follow [apple-music-shortcut.md](apple-music-shortcut.md) on the device that plays Apple Music. The website cannot read your playback from your public profile. It shows **Now listening** only while it has a fresh update marked as playing, and switches to **Recently listened** after two minutes without one. The card checks for updates every 45 seconds while the tab is visible.

## Local development

`pnpm dev` runs the static UI only. To exercise Functions and D1 locally, build the site and use Pages dev. With a configured local Wrangler file:

```sh
cp .dev.vars.example .dev.vars
# Replace the placeholder values privately in .dev.vars.
pnpm build
npx wrangler d1 migrations apply portfolio --local --config wrangler.local.jsonc
npx wrangler pages dev out --d1 PORTFOLIO_DB=YOUR_D1_DATABASE_ID --compatibility-date=2026-10-03
```

Replace `YOUR_D1_DATABASE_ID` with the same database ID used in `wrangler.local.jsonc` so the local migration and Pages dev use the same local database. Pages dev does not support a custom `--config` path. Local D1 is separate from the remote database. Real local OTP requests will send through your Resend account; use your own address. Automated tests use a fake Resend transport and an in-memory SQLite database and never send email:

```sh
pnpm typecheck
pnpm test
```

## Verify after deployment

1. Visit `https://0xy7d.xyz/api/guestbook/session`. It should return `available: true`.
2. Sign in with your own email on the homepage. Verify the code, leave a note, refresh to confirm persistence, then sign out.
3. Run the music Shortcut during playback. Visit `https://0xy7d.xyz/api/music` and check the title and `isPlaying: true`; refresh the homepage or allow its next poll.
4. Run the pause Shortcut and confirm **Recently listened**. Stop sending updates and confirm the same state after two minutes.
5. Check that your profile opens in a new tab and that your email never appears in the public guestbook API.

## Removing a guestbook note

Public posting is immediate after email verification. There is no public moderation endpoint. To remove an unwanted note, get its numeric ID from the public entries response, then use the D1 dashboard console or Wrangler with a fixed numeric ID:

```sh
npx wrangler d1 execute portfolio --remote --config wrangler.local.jsonc --command "DELETE FROM guestbook_entries WHERE id = 123"
```

Replace `123` with the exact note to remove. Do not interpolate a visitor's text into SQL.

## Diagnose a deployed setup from the dashboard

Open `https://0xy7d.xyz/api/status` after deploying. This endpoint reports configuration readiness, missing table names, and whether a music update has ever arrived. It never returns secrets, email addresses, messages, or token values. `configured: true` means the required settings and tables are present; it does not verify that Resend accepts the API key or that the device Shortcut is running.

- `database.status: "unbound"`: add the `PORTFOLIO_DB` D1 binding to the Pages project's **Production** environment, then redeploy.
- `database.missingTables` contains names: open the bound database's D1 **Console** and execute the corresponding statements in `migrations/0001_portfolio.sql`. You can execute each semicolon-terminated statement separately. All tables and indexes use `IF NOT EXISTS`.
- `guestbook.missing` contains `RESEND_API_KEY` or `APP_SECRET`: check these exact names under the Pages project's **Production** Variables and Secrets. `APP_SECRET` must have at least 32 characters. Save and redeploy so the new settings reach the running Functions.
- `music.missing` contains `MUSIC_WEBHOOK_TOKEN`: check the exact Production secret name and use the same private token in your Shortcut. It must have at least 32 characters.
- `music.configured: true` and `receivedUpdate: false`: the publishing endpoint is configured but has not received a successful Shortcut update. Play music, run the publishing Shortcut, and inspect its response. Successful publishing returns `{"updated":true}`.

The music card says **No listening updates yet** while waiting for its first device update, or **Listening updates are unavailable** when the API cannot be reached or the database binding is absent. It cannot infer stopped playback from a missing update.

To deploy through dashboards, save the Pages settings before merging the feature/fix PR in GitHub. The repository's GitHub Actions workflow then redeploys the app with Functions. If the code is already merged, rerun the latest deployment workflow from GitHub Actions after saving settings. A dashboard drag-and-drop upload of static files does not include the Functions backend.
