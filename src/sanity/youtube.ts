/**
 * Pulls the video ID out of any common YouTube URL shape: watch?v=, youtu.be/,
 * /embed/, /shorts/ and /live/. Returns null for anything else, so the Studio
 * can reject bad links and the site can skip rendering them.
 */
export function getYouTubeId(url: string | undefined): string | null {
  if (!url) return null;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^(www\.|m\.)/, "");
  let id: string | null = null;

  if (host === "youtu.be") {
    id = parsed.pathname.slice(1);
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    id =
      parsed.searchParams.get("v") ??
      parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ??
      null;
  }

  return id && /^[\w-]{11}$/.test(id) ? id : null;
}
