# Wise Owl

The studio site. Built with Astro. Every work is one markdown file.

## Run it

```
npm install
npm run dev
```

Then open http://localhost:4321.

`npm run build` writes a static site to `dist/`. `npm run preview` serves that build.

## Admin

```
npm run admin
```

Then open http://localhost:4321/admin/. This starts the site and a small local file server together. The admin is a form for every field a work can have. Saving writes the markdown file into `src/content/works/`, uploads go to `public/stills/`, and the Studio section edits `src/data/site.json`. No login is needed locally.

To make a work watchable or listenable on the site: put a YouTube, Vimeo or direct .mp4 link in **Video** and it plays when Play is pressed; paste a Spotify, Apple Music or SoundCloud link in **Player** and a player appears on the record page.

Once the site is deployed, the same admin can run on the live site and commit through GitHub. That needs the repo name in `public/admin/config.yml` and a GitHub OAuth app, which Netlify provides for free. Until then, edit locally and push.

## Add a work by hand

1. Copy any file in `src/content/works/` and rename it. The filename becomes the URL slug.
2. Fill in the frontmatter. Every field is documented in `src/content.config.ts`. The only required ones are `number`, `title`, `medium`, `form` and `year`.
3. Put images in `public/stills/` and reference them as `/stills/name.jpg`.
4. For a film, set `video` to a YouTube, Vimeo or direct .mp4 link and it plays in the dark room.
5. For music, set `player` to a Spotify, Apple Music or SoundCloud link, or a Bandcamp embed URL, and add `tracklist` and `links`.
6. Anything written under the frontmatter appears as notes under the record.

Set `featured: true` on the one work that fills the first screen of the index. Give it a good `image`, or a `heroVideo` pointing at a silent .mp4 or .webm for a looping clip. Remove `placeholder: true` from real entries.

## Change the look

- Colors and type: the tokens at the top of `src/styles/global.css`.
- Fonts: the Google Fonts link in `src/layouts/Base.astro`.
- The logo: `public/owl-head-o_red-velvet.svg`, as supplied. The nav uses `public/owl-head-o_red-velvet_clear.svg`, the same file with only its paper background removed so it can sit on a hero image. Its height in the nav is `--logo-h` in `global.css`. The favicon is `public/favicon.svg`, the same owl without its background. The wordmark in the footer is `public/wordmark_red-velvet.svg`.
- Contact details, established year and the Studio page text: `src/data/site.json`, or the Studio section of the admin.
- Nav links: `src/components/Nav.astro`. Footer: `src/components/Footer.astro`.
- Studio page copy: `src/pages/studio.astro`.

The design decisions are written up in `DESIGN.md`.

## Placeholders

The nine entries in `src/content/works/` are real films and records by other people. They are there only to show the layout, and every one is marked `placeholder: true`. Delete them once the real catalog exists. The images in `public/stills/` are generated gradients, not real frames. The email, city and Studio text in `src/data/site.json` are placeholders too.
