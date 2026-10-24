# Dunkstone website

The official website for **Dunkstone**, an independent mobile game studio founded by two business partners. The studio is developing games for iOS and Android, with future releases planned for the App Store and Google Play.

The first version introduces the studio, features its animated logo, and presents upcoming games as in development. It uses a monochrome palette inspired by the supplied Dunkstone branding.

## Website contents

- Responsive home page with the headline “Small studio. Big play.”
- Games section ready for future titles, artwork, release status, and store links.
- Introduction to the two-founder studio.
- Three-second, muted logo reveal with a static fallback and reduced-motion support.
- Keyboard navigation, visible focus indicators, and a skip-to-content link.
- Search and social sharing metadata, favicon, and sharing image.

No build step, backend, accounts, database, or third-party runtime libraries are required.

## Repository structure

```text
.openai/hosting.json    Existing Sites project and static hosting configuration
 dist/                 Complete website; publish this directory
   index.html          Page structure, copy, and metadata
   styles.css          Responsive styling and brand colours
   games.js            Game catalogue data
   app.js              Logo playback and game catalogue rendering
   assets/
     dunkstone-logo.jpg    Original supplied logo
     dunkstone-reveal.mp4  Original supplied animated logo reveal
     favicon.png          Icon derived from the logo
     social.jpg           Social sharing artwork derived from the logo
```

## Preview locally

With Node.js installed, run from the repository root:

```sh
npx --yes http-server dist -p 4173 -c-1
```

Open http://localhost:4173 in your browser. The first run downloads the preview server from npm. The website itself has no package installation or build requirements.

Alternatively, serve `dist/` with any static web server.

## Update the website

Edit `dist/index.html` for studio copy and metadata, and `dist/styles.css` for layout and styling.

Add confirmed games to `window.DUNKSTONE_GAMES` in `dist/games.js`. Each game supports `title`, `status`, `description`, `artwork`, `appStoreUrl`, and `playStoreUrl`. Artwork paths are relative to the website root. Omit store links until their listings are live; store URLs must use HTTPS. With an empty catalogue, the page displays the “Our first titles” in-development message.

Keep the supplied logo artwork intact. Contact details, social profiles, release dates, and game download buttons should be added only when confirmed.

## Brand palette

| Colour | Hex | Use |
| --- | --- | --- |
| Near-black | `#050505` | Main background |
| Charcoal | `#191919` | Secondary surfaces |
| Stone grey | `#969690` | Accents and secondary details |
| Warm white | `#F5F4EE` | Main text and light section background |

## Hosting and domain

The current preview is published privately through Sites:

https://dunkstone-studio.danielntp94.chatgpt.site

Access is restricted to the owner's account and requires sign-in. The `.openai/hosting.json` file preserves the existing Sites project identity and sets `dist` as the static website directory. Publishing updates uses the Sites workflow; copying files into this repository does not deploy them automatically.

The purchased **dunkstone.com** domain has not been connected. Connect it when the studio is ready for a public launch, and update the absolute social metadata URLs in `dist/index.html` at that time.

## Validation

The initial website was checked at desktop, tablet, and phone sizes, including navigation, image loading, keyboard focus, and logo playback. Reduced-motion and playback-rejection fallbacks were also checked.

After changes, verify the affected layouts and links in a browser. JavaScript syntax can be checked with:

```sh
node --check dist/app.js
node --check dist/games.js
```
