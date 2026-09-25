import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

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

export default defineConfig({
  site: 'https://the-ecru-stretch.uk',
  integrations: [
    // /studio is the Sanity admin tool, not content, so it's excluded from
    // the sitemap even though the route exists on the same domain.
    sitemap({ filter: (page) => !page.includes('/studio') }),
    ...sanityIntegrations,
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
