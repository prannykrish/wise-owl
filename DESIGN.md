# Wise Owl, design plan

Agreed 29 September 2026. This is the standard the site is held to. Change it here first, then in the code.

## The taste

Four words: **archival, literary, nocturnal, exact.**

The studio recedes and the work is big. Every work is presented in the same format, so the collection feels curated rather than assembled. The site is built like a record label's catalog, not a portfolio pitching for work. Copy is short, dry and factual. One serif, one mono, one accent color, no decoration. Confidence comes from restraint.

Reference points: A24 (small logo, identical film formatting, dry voice), The Criterion Collection (spine numbers), ECM Records (catalog numbers and cover art doing the work), Mubi (film pages as records).

Never: taglines, "we craft stories," laurels graphics, parallax, custom cursors, scroll effects, a trophy wall, a showreel montage.

## The organizing idea

**The whole studio is one numbered catalog.** Every film and record gets a number, `WO 001` onward, in release order. Films and music are one body of work with two mediums, not two portfolios. Every record page uses the same layout regardless of medium.

## Pages

- **Index** (`/`). The first screen is one frame from the featured work, filling the viewport under the nav, with only its number and title on it. It links to the record. If the featured entry has a `heroVideo`, a silent looping clip plays instead. Below it, the full catalog as a list, newest first. Columns: number, title, form, year. Nothing else in the row, not even a mark for honors; those live on the record and the Honors page. Hovering a row shows its image on the right. Before anything is hovered the panel shows the next work, not the featured one, so the first screen never repeats itself. No tagline.
- **Films, Music** (`/films`, `/music`). Filtered views of the same index.
- **Record** (`/films/slug`, `/music/slug`). Meta line, title, byline, logline. Film: full-width still on top, Play button, credits, honors, stills strip. Music: cover, streaming links, player, tracklist, credits, honors. Both: related works, optional notes, previous and next in the catalog.
- **Honors** (`/honors`). One text index by year: award, body, work. Each row links to the record.
- **Studio** (`/studio`). Three sentences and contact.
- **Later.** Notes or a journal, and a newsletter. The structure leaves room. If the catalog grows past a dozen works with real artwork, a poster grid becomes a reasonable alternative to the list on the index. Not before.

## Logo and nav

The logo is the supplied file `public/owl-head-o_red-velvet.svg`: a red velvet head with a paper face. It is used exactly as supplied, never redrawn or recolored. It appears once per screen, alone in the middle of the nav, in the manner of A24. The favicon, `public/favicon.svg`, is the same shapes with the background removed and the view cropped to the head, so the tab shows just the owl; `favicon-32.png` and `apple-touch-icon.png` are renders of it for browsers that ignore SVG icons.

The site's paper and red velvet tokens are taken from the colors inside the logo file, so the logo sits on the page without a visible edge. If the logo file changes, retune those two tokens first.

Nav: Films and Music on the left, Honors and Studio on the right, logo centered. Its height is `--logo-h` in `src/styles/global.css`. There is no rule under the nav. Content fades out beneath it instead of hitting an edge, except on pages that open with a full-bleed image.

The supplied wordmark, `public/wordmark_red-velvet.svg`, appears only in the footer. Nothing else on the page spells out the name except the footer's small text.

The footer mirrors the nav: catalog links left, studio links right, the wordmark alone in the middle, all in the same mono labels as the nav. Under it, one centered colophon line: email, city, established year, copyright. No headings, no rules.

## Playback

Films play on the site. Pressing Play dims the page and plays the entry's `video`: a YouTube or Vimeo link, or a direct video file. Music plays on the site too: the entry's `player` accepts a plain Spotify, Apple Music or SoundCloud link, or a Bandcamp embed URL, and the record page shows the player. Outbound links can sit alongside, but the work should be playable here first.

## Admin

Content is edited through Decap CMS at `/admin`, which writes the same markdown files the site reads. Locally it runs with `npm run admin` and needs no login. Its configuration is `public/admin/config.yml`, and every field there matches the schema in `src/content.config.ts`; change both together. Studio details and the footer's contact line come from `src/data/site.json`, also editable in the admin.

## Type

Two families, both from Google Fonts, loaded in `src/layouts/Base.astro`.

- **Newsreader** (serif). Titles, bylines, loglines, credits. It carries the "wise" register against the mono.
- **Geist Mono** (mono). Catalog numbers, years, runtimes, labels, nav. This is what gives the catalog-card feel.

If the mono reads too technical, swap it for a plain grotesque in one line: `--mono` in `global.css`.

## Color

Direction: **Paper.** One accent: red velvet. Everything is set as tokens at the top of `src/styles/global.css`.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F3EFE6` | page ground, matches the logo's background |
| `--paper-2` | `#EAE5DA` | empty frames, image backgrounds |
| `--ink` | `#171512` | text, and the dark room |
| `--velvet` | `#7E1B2B` | the logo's red; hover, active nav and filter, play button |
| `--mute` | `#6F6A62` | secondary text and labels |
| `--rule` | `#DCD5C9` | hairlines between list rows |

Red velvet is used only for: the logo, links on hover, the active filter and nav item, and the play button. The logo is the one thing that is red at rest, so everything that turns red when touched echoes it. Red velvet gets its one big moment when Play is pressed: the page dims to ink and the film plays in the dark. That is the only place the palette flips.

## Motion

Hover reveals on the index. The lights-down on Play. Nothing else.

## Voice

Titles do the work. Facts, not adjectives. Never "a creative studio crafting unforgettable stories."

## Content model

One collection, `works`, in `src/content/works/`. One markdown file per work. The schema is in `src/content.config.ts` and documents every field. The placeholder entries are real films and records, marked `placeholder: true`, and exist only to show the layout.
