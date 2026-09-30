import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import { createClient } from '@sanity/client';

// astro.config.mjs runs before Astro's own env loading, so
// import.meta.env.PUBLIC_* / process.env.PUBLIC_* aren't populated from
// .env here yet — load them the same way Vite will for the rest of the app.
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
);

// The Sanity integration eagerly constructs a client during setup, which
// throws if projectId is missing — so it's only registered once Sanity is
// actually configured. Without it, /studio won't exist and blog pages
// render an empty state (see src/sanity/client.ts), but the rest of the
// site still builds and deploys fine.
const sanityIntegrations = PUBLIC_SANITY_PROJECT_ID
  ? [
      sanity({
        projectId: PUBLIC_SANITY_PROJECT_ID,
        dataset: PUBLIC_SANITY_DATASET || 'production',
        // Building statically — content is fetched fresh at build time via
        // the Cloudflare Pages deploy hook, so no need for Sanity's CDN cache.
        useCdn: false,
        studioBasePath: '/studio',
      }),
      react(),
    ]
  : [];

// Blog post slug → when it was last edited in Sanity, used for <lastmod> in
// the sitemap. Google uses lastmod to decide what to re-crawl (it ignores
// changefreq and priority), so only posts get one: their dates are real.
const postLastModified = new Map();
if (PUBLIC_SANITY_PROJECT_ID) {
  const client = createClient({
    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2026-01-01',
    useCdn: false,
  });
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
  );
  for (const post of posts) postLastModified.set(post.slug, post._updatedAt);
}
const newestPostEdit = [...postLastModified.values()].sort().at(-1);

export default defineConfig({
  site: 'https://the-ecru-stretch.uk',
  integrations: [
    // /studio is the Sanity admin tool, not content, so it's excluded from
    // the sitemap even though the route exists on the same domain.
    sitemap({
      filter: (page) => !page.includes('/studio'),
      serialize(item) {
        const { pathname } = new URL(item.url);
        const slug = pathname.match(/^\/blog\/([^/]+)\/$/)?.[1];
        // The blog listing changes whenever any post does.
        const lastmod = pathname === '/blog/' ? newestPostEdit : postLastModified.get(slug);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    ...sanityIntegrations,
  ],
  image: {
    // YouTube thumbnails for click-to-load videos are downloaded at build time
    // and served from this site, so visitors' browsers never contact YouTube
    // until they press play.
    domains: ['i.ytimg.com'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
