# Dunkstone website v2

The official single-page website for Dunkstone, a two-founder independent mobile game studio. V2 adopts the approved Drop In branding and introduces **Cargo Ahoy**, our first upcoming game.

## Website contents

- Responsive monochrome homepage with “Small studio. Big play.”
- Approved SVG studio logos, size-appropriate stone icons, and updated sharing artwork.
- Three-second, silent splash with WebM/MP4 sources, a settled-frame fallback, and reduced-motion support.
- Cargo Ahoy feature with approved game artwork, the one-tap stacking pitch, gameplay highlights, development status, and iOS-first / Android-later plans.
- Studio introduction, keyboard navigation, visible focus, and skip-to-content link.
- Complete Cargo Ahoy introduction available without JavaScript.

No build step, backend, dependencies, or third-party runtime libraries are required.

## Preview locally

From this repository, with Python installed:

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173. Alternatively, serve `dist/` with any static web server.

## Update the website

`dist/index.html` contains page structure, metadata, and the accessible Cargo Ahoy feature. `dist/styles.css` controls presentation; `dist/app.js` handles splash playback and catalogue enhancement.

Add confirmed titles to `window.DUNKSTONE_GAMES` in `dist/games.js`. Supported fields are `title`, `status`, `description`, `artwork`, optional `platforms` (a string array), `appStoreUrl`, and `playStoreUrl`. Artwork paths are relative to the website root. Store links are rendered only for valid HTTPS URLs; omit them until listings are live. Status and platforms remain visible without store links. Missing status defaults to “In development”; missing platforms are omitted.

The renderer reuses the existing HTML feature by title, updates catalogue fields, and preserves its artwork caption and gameplay highlights. Keep the Cargo Ahoy data and HTML fallback in sync. An empty catalogue leaves the HTML introduction intact. Future titles without artwork show text rather than borrowing the studio icon.

## Asset provenance and handling

All v2 assets were copied byte-for-byte from these read-only sibling repositories; only Website is edited:

| Website asset (`dist/assets/`) | Approved source |
| --- | --- |
| `dunkstone-logo.svg` | `Branding/logo/vector/full-logo/dunkstone-logo-off-white.svg` |
| `dunkstone-stone.svg` | `Branding/logo/vector/stone/dunkstone-icon-off-white.svg` |
| `dunkstone-stone-small.svg` | `Branding/logo/vector/stone-small/dunkstone-tiny-off-white.svg` |
| `favicon.png` | `Branding/logo/png/stone/dunkstone-stone-32-off-white.png` |
| `social.png` | `Branding/press-kit/images/dunkstone-sharing-card-1200x630.png` |
| `dunkstone-splash.mp4`, `dunkstone-splash.webm` | `Branding/splash-animation/dunkstone-splash-dark.mp4`, `.webm` |
| `dunkstone-splash-static.png` | `Branding/splash-animation/dunkstone-splash-dark-static.png` |
| `cargo-ahoy.png` | `CargoAhoy/ArtSource/References/UI/app-icon.png` (approved October 28, 2026) |

Cargo Ahoy copy is grounded in its `docs/GDD.md`. Studio attribution follows the owner’s instruction; the game repository README retains an older studio name. The game image is approved icon artwork, not a gameplay screenshot.

Use black `#000000` and off-white `#F4F3ED`. Preserve logo proportions, lettering, stone tilt, eyes, and clear space of at least 10% of the artwork’s longest edge. Use the small stone at 32–48 px and the faithful stone at 64 px and above. Never use the studio stone as a game icon. Do not ship the original reference raster or modify the approved motion files. No press-kit download is included.

## Hosting

`.openai/hosting.json` retains the existing Sites project identity and serves `dist`. This v2 update is local only: no deployment, domain changes, commits, or pushes. Existing absolute social URLs still target the private preview at https://dunkstone-studio.danielntp94.chatgpt.site/. Update them when a public domain is connected; `dunkstone.com` has not been configured here.

## Validation

```sh
node --check dist/app.js
node --check dist/games.js
```

Check desktop, tablet, and phone widths down to 320 px, asset loading, keyboard navigation, and the Cargo Ahoy feature with JavaScript disabled. Check completed playback, blocked autoplay, missing video, and reduced motion: the settled still must remain visible. Verify status and platform text without store links, no duplicate game feature, and no horizontal overflow.
