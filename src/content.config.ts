import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * One collection for the whole studio. A film and a record are both "works"
 * with a catalog number. The medium decides how the record page lays out.
 */
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    /** Catalog number. WO 001 is the first thing the studio released. */
    number: z.number().int().positive(),
    title: z.string(),
    medium: z.enum(['film', 'music']),
    /** Feature, Short, Music video, Album, EP, Single, Score ... */
    form: z.string(),
    year: z.number().int(),
    /** Who made it: director(s) or artist(s). Shown as the byline. */
    by: z.array(z.string()).default([]),
    /** One or two sentences. Facts, not adjectives. */
    logline: z.string().optional(),
    /** Minutes. Films only. */
    runtime: z.number().int().optional(),
    /** Main still or cover. Shown on hover in the index and at the top of the record. */
    image: z.string().optional(),
    /** Extra stills for the strip at the bottom of a film record. */
    stills: z.array(z.string()).default([]),
    credits: z
      .array(z.object({ role: z.string(), names: z.array(z.string()) }))
      .default([]),
    honors: z
      .array(z.object({ award: z.string(), body: z.string(), year: z.number().int() }))
      .default([]),
    /** YouTube or Vimeo URL. Plays in the dark room. */
    video: z.string().optional(),
    /** Direct .mp4 or .webm URL for a silent looping clip. Used only when this is the featured work, in the hero. */
    heroVideo: z.string().optional(),
    /** A Spotify, Apple Music or SoundCloud link, or a Bandcamp embed URL. Becomes a player on the record page. */
    player: z.string().optional(),
    tracklist: z.array(z.object({ title: z.string(), duration: z.string() })).default([]),
    /** Outbound links: streaming, where a piece was published, etc. */
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    /** Slugs of other works in the catalog, e.g. a film and its score. */
    related: z.array(z.string()).default([]),
    /** The work the index shows before anything is hovered. Only one should be true. */
    featured: z.boolean().default(false),
    /** True for the template entries. Shows a small note on the record page. */
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { works };
