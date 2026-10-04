import { getCollection, type CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'works'>;
export type Medium = Work['data']['medium'];

export const MEDIUMS: Record<Medium, { path: string; label: string; singular: string; byline: string }> = {
  film: { path: 'films', label: 'Films', singular: 'Film', byline: 'Directed by' },
  music: { path: 'music', label: 'Music', singular: 'Music', byline: 'By' },
};

export function mediumFromPath(path: string | undefined): Medium | undefined {
  return (Object.keys(MEDIUMS) as Medium[]).find((k) => MEDIUMS[k].path === path);
}

export const workHref = (w: Work) => `/${MEDIUMS[w.data.medium].path}/${w.id}`;

export const catalogNumber = (n: number) => `WO ${String(n).padStart(3, '0')}`;

/** Every work, newest catalog number first. */
export async function allWorks(): Promise<Work[]> {
  const works = await getCollection('works');
  return works.sort((a, b) => b.data.number - a.data.number);
}

export type Honor = Work['data']['honors'][number] & { work: Work };

/** Every honor across the catalog, newest year first. */
export function allHonors(works: Work[]): Honor[] {
  return works
    .flatMap((work) => work.data.honors.map((h) => ({ ...h, work })))
    .sort((a, b) => b.year - a.year || b.work.data.number - a.work.data.number);
}

export function joinNames(names: string[]): string {
  if (names.length <= 1) return names.join('');
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

/**
 * Turns a normal YouTube or Vimeo link into an embeddable player URL.
 * A direct video file (.mp4, .webm) passes through and is played natively.
 */
export function embedSrc(url: string | undefined): string | null {
  if (!url) return null;
  const yt = url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return url;
}

/**
 * Turns a normal music link into an embeddable player. Accepts Spotify,
 * Apple Music and SoundCloud share links, a Bandcamp embed URL, or any
 * other embed URL as is. Returns the iframe source and a sensible height.
 */
export function playerSrc(url: string | undefined): { src: string; height: number } | null {
  if (!url) return null;

  const spotify = url.match(/open\.spotify\.com\/(?:embed\/)?(album|track|playlist|episode|show|artist)\/([A-Za-z0-9]+)/);
  if (spotify) {
    const single = spotify[1] === 'track' || spotify[1] === 'episode';
    return { src: `https://open.spotify.com/embed/${spotify[1]}/${spotify[2]}?theme=0`, height: single ? 152 : 352 };
  }

  const apple = url.match(/^https?:\/\/(?:embed\.)?music\.apple\.com\/(.+)$/);
  if (apple) return { src: `https://embed.music.apple.com/${apple[1]}`, height: /[?&]i=\d+/.test(url) ? 175 : 450 };

  if (/soundcloud\.com\//.test(url) && !/w\.soundcloud\.com/.test(url)) {
    const params = new URLSearchParams({ url, color: '#7e1b2b', auto_play: 'false', show_comments: 'false', visual: 'false' });
    return { src: `https://w.soundcloud.com/player/?${params}`, height: 166 };
  }

  if (/bandcamp\.com\/EmbeddedPlayer/.test(url)) return { src: url, height: 470 };

  return { src: url, height: 352 };
}
