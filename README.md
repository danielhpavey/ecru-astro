# The Ecru Stretch

Website for the band The Ecru Stretch. Uses: Astro, Tailwind CSS 4, and Sanity for the blog.

## Pages

- **Home** (`/`): hero, short intro, and the latest three blog posts (shown once Sanity has posts).
- **About** (`/about`): band story and line-up.
- **Contact** (`/contact`): email addresses, location, socials, and an optional contact form.
- **Blog** (`/blog`, `/blog/[slug]`): posts managed in Sanity. A paginated listing plus one page per post.

## How it works

- **[Astro](https://astro.build/)**, fully static. Pages are `.astro` files that compile to plain HTML at build time.
- **[Tailwind CSS v4](https://tailwindcss.com/)** via `@tailwindcss/vite`. The colour palette and fonts are defined once in [src/styles/global.css](src/styles/global.css) using `@theme` (`--color-ink`, `--color-accent`, `--color-ecru` etc.). Change them there to restyle the whole site.
- **Band details** (name, tagline, bio, emails, members, social links) live in [src/data/band.ts](src/data/band.ts). Edit that file to update copy used across pages. A social link only shows once it has an `href`.
- [src/layouts/Layout.astro](src/layouts/Layout.astro) handles `<head>` (title, description, canonical URL, Google Fonts, Open Graph/Twitter meta), renders the header and footer, and runs a small `IntersectionObserver` script for the `.scroll-reveal` fade-in effect.
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** generates an XML sitemap (`sitemap-index.xml` → `sitemap-0.xml`) on every build from the `site` URL in [astro.config.mjs](astro.config.mjs), including every blog post. Posts and the blog listing get a `<lastmod>` date from Sanity so Google knows what to re-crawl; `/studio` is excluded. `robots.txt` points to it. Submit `https://the-ecru-stretch.uk/sitemap-index.xml` once in [Google Search Console](https://search.google.com/search-console) → Sitemaps; after that Google re-reads it automatically.

## Blog (Sanity CMS)

- **Schemas** live in [src/sanity/schemaTypes/](src/sanity/schemaTypes/): `post` (title, slug, author, main image, categories, publish date, excerpt, rich-text body), `author`, `category` (title, slug, description), and the Portable Text block config.
- **Categories:** each category with at least one post gets a page at `/blog/category/<slug>`, linked from a row of category buttons on `/blog`, from tags on each post, and labelled on the blog cards. Empty categories get no page. If a category's slug hasn't been generated in Studio yet, one is made from its title (matching what Studio's "Generate" button produces), so the address doesn't change when it's generated later.
- **Fetching:** [src/sanity/client.ts](src/sanity/client.ts) builds the client from `PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET`. GROQ queries are in [src/sanity/queries.ts](src/sanity/queries.ts). [src/sanity/imageUrl.ts](src/sanity/imageUrl.ts) builds responsive image URLs from Sanity's image CDN.
- **Graceful degradation:** without `PUBLIC_SANITY_PROJECT_ID`, the site still builds. The blog shows a "not connected" message and `/studio` isn't created.
- **Embedded Studio** at `/studio` when Sanity is configured. You can also deploy a hosted Studio with `npx sanity deploy`.
- **Rebuilding on publish:** content is fetched at build time, so a new post needs a rebuild to go live. Set up a Cloudflare Pages deploy hook, then add a Sanity webhook that calls it, filtered to `_type == "post" && !(_id in path("drafts.**"))`.

### Setting up Sanity

1. `npx sanity login`, then create a project at [sanity.io/manage](https://sanity.io/manage) (or run `npx sanity init --env` and choose "create new project").
2. Copy `.env.example` to `.env` and set `PUBLIC_SANITY_PROJECT_ID`.
3. Replace `your-project-id` in both [sanity.config.ts](sanity.config.ts) and [sanity.cli.ts](sanity.cli.ts). These are hardcoded because Sanity's CLI parses them outside Vite, where `import.meta.env` isn't available.
4. In sanity.io/manage → API → CORS origins, add `http://localhost:4321` and your live domain (with credentials allowed) so the embedded Studio can log in.

## Contact form

The site is static, so the form posts to an external service. Set `PUBLIC_CONTACT_FORM_ENDPOINT` in `.env` to a form backend URL (for example Formspree, Basin or Web3Forms). The form sends `name`, `email` and `message` fields. If it's empty, the contact page shows the email addresses only.

## Tech stack

| Purpose | Technology |
|---|---|
| Framework / static site generator | Astro 7 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Language | TypeScript (strict) |
| Fonts | Google Fonts: Open Sans |
| SEO | `@astrojs/sitemap`, canonical URLs, OG/Twitter meta |
| Blog CMS | Sanity (`@sanity/astro`, embedded Studio) |
| Deployment | Cloudflare Pages (via Wrangler, see `wrangler.jsonc`) |

## Project structure

```
src/
├── components/      # Header, Footer, blog cards/grid/pagination
├── data/            # band.ts: band details used across pages
├── layouts/         # base HTML layout (head, header/footer, scroll-reveal)
├── pages/           # index, about, contact, blog/
├── sanity/          # Sanity client, queries, image URLs, schemas
└── styles/          # global.css with Tailwind theme tokens
public/              # favicon, robots.txt
sanity.config.ts     # Studio config
sanity.cli.ts        # Sanity CLI config
wrangler.jsonc       # Cloudflare deploy config
```

## Development

```bash
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # build the static site to dist/
npm run preview   # preview the production build
```
