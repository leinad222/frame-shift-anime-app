# Frame Shift

An anime-first discovery app with a small original-merch catalog for pop-culture fans.

## Run locally

Use Node.js 24 or newer, then install and start the app:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` for discovery or `http://localhost:3000/shop` for the product catalog.

## SQLite catalog

The catalog uses Node's built-in `node:sqlite` API. On the first catalog request, the app creates `.data/catalog.sqlite` and seeds six sample products. `.data/` is git-ignored. Edit the seed records in `server/utils/catalog-db.ts` to change the sample catalog.

- `GET /api/products` lists products; optional `category` and `search` query parameters filter results.
- `GET /api/products/:slug` returns one product or a 404.
- `/shop/:slug` renders a product detail page from SQLite.

The current catalog API is read-only; it does not include an admin product editor, checkout, or order storage.

## SEO and deployment

Product pages render unique titles and descriptions from the database, canonical URLs, Open Graph tags, and Schema.org Product JSON-LD. `/sitemap.xml` includes the shop and product URLs. Set `NUXT_PUBLIC_SITE_URL` to the canonical public origin when deploying, for example `https://shop.example.com`.

SQLite persists to `.data/catalog.sqlite`. Deployments need a persistent writable volume mounted at `.data`; ephemeral serverless filesystems will not retain catalog changes.

## Build

```bash
pnpm build
```

## Publish a Render preview

The `render.yaml` Blueprint configures a free Node web service. To publish it:

1. Push this app to a GitHub repository. Keep it private if the source should not be public.
2. In Render, choose **New > Blueprint** and connect that repository.
3. Render reads `render.yaml`, builds the app, and provides an `onrender.com` URL.

The sample catalog is seeded into `.data/catalog.sqlite` and has no admin editing, so the free service can recreate it after a restart. Add a persistent disk mounted at `.data` if catalog edits need to survive restarts.
Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.
