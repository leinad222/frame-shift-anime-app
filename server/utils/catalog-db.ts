import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import type { Product } from '#shared/types/product'

type ProductSeed = Omit<Product, 'id'>

const seedProducts: ProductSeed[] = [
    {
        sku: 'FS-TEE-001',
        slug: 'frame-shift-studio-tee',
        name: 'Frame Shift Studio Tee',
        description: 'A heavyweight cotton tee for late-night screenings, record-store detours, and everyday rotation. Relaxed fit with a small Frame Shift mark at the chest.',
        category: 'Apparel',
        priceCents: 3400,
        currency: 'USD',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85',
        imageAlt: 'A clean white cotton t-shirt on a neutral background',
        inventoryCount: 18,
        seoTitle: 'Frame Shift Studio Tee | Anime Culture Apparel',
        seoDescription: 'Shop the Frame Shift Studio Tee, a relaxed heavyweight cotton shirt made for anime screenings and everyday pop-culture fans.',
    },
    {
        sku: 'FS-PRINT-001',
        slug: 'midnight-route-art-print',
        name: 'Midnight Route Art Print',
        description: 'A city-at-night print inspired by the final train home. Printed on archival matte stock and sized to fit a standard frame.',
        category: 'Prints',
        priceCents: 2600,
        currency: 'USD',
        imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1000&q=85',
        imageAlt: 'A lively Tokyo crossing illuminated after dark',
        inventoryCount: 12,
        seoTitle: 'Midnight Route Art Print | Frame Shift Shop',
        seoDescription: 'Bring the last-train atmosphere home with the Midnight Route art print, an anime-inspired city-night poster on archival matte stock.',
    },
    {
        sku: 'FS-JOURNAL-001',
        slug: 'episode-notes-journal',
        name: 'Episode Notes Journal',
        description: 'A pocket-size, lay-flat journal for watch notes, favorite frames, and theories you need to write down before the next episode.',
        category: 'Stationery',
        priceCents: 1800,
        currency: 'USD',
        imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=85',
        imageAlt: 'A notebook opened on a tidy writing desk',
        inventoryCount: 25,
        seoTitle: 'Episode Notes Journal | Anime Watch Journal',
        seoDescription: 'Keep track of every theory and favorite scene in the Episode Notes Journal, a compact lay-flat notebook for anime fans.',
    },
    {
        sku: 'FS-KEY-001',
        slug: 'pixel-signal-keychain',
        name: 'Pixel Signal Keychain',
        description: 'A durable acrylic charm with a bright, original pixel-art signal mark. Made to clip onto keys, bags, or your convention lanyard.',
        category: 'Accessories',
        priceCents: 1400,
        currency: 'USD',
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85',
        imageAlt: 'Colorful retro gaming gear in a neon-lit room',
        inventoryCount: 31,
        seoTitle: 'Pixel Signal Keychain | Anime Fan Accessory',
        seoDescription: 'Add an original pixel-art accent to your everyday carry with the Pixel Signal acrylic keychain from Frame Shift.',
    },
    {
        sku: 'FS-TOTE-001',
        slug: 'after-hours-canvas-tote',
        name: 'After Hours Canvas Tote',
        description: 'A roomy everyday canvas tote with an original after-dark city graphic. Built for manga hauls, market runs, and the commute between them.',
        category: 'Accessories',
        priceCents: 2400,
        currency: 'USD',
        imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
        imageAlt: 'A sturdy everyday bag photographed in soft natural light',
        inventoryCount: 9,
        seoTitle: 'After Hours Canvas Tote | Frame Shift Shop',
        seoDescription: 'Carry your manga and daily essentials in the After Hours canvas tote, featuring an original anime-city inspired graphic.',
    },
    {
        sku: 'FS-STAND-001',
        slug: 'signal-keeper-acrylic-stand',
        name: 'Signal Keeper Acrylic Stand',
        description: 'A collectible display stand featuring an original night-shift character design. Printed in vivid color on sturdy clear acrylic.',
        category: 'Collectibles',
        priceCents: 2200,
        currency: 'USD',
        imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=85',
        imageAlt: 'Vivid character artwork in a dramatic red setting',
        inventoryCount: 7,
        seoTitle: 'Signal Keeper Acrylic Stand | Anime Collectible',
        seoDescription: 'Display the original Signal Keeper character with this vivid, clear acrylic stand, a limited collectible from Frame Shift.',
    },
]

const databaseDirectory = resolve(process.cwd(), '.data')
mkdirSync(databaseDirectory, { recursive: true })

const database = new DatabaseSync(resolve(databaseDirectory, 'catalog.sqlite'))

database.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
    currency TEXT NOT NULL,
    image_url TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    inventory_count INTEGER NOT NULL DEFAULT 0 CHECK (inventory_count >= 0),
    seo_title TEXT NOT NULL,
    seo_description TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
`)

const productCount = database.prepare('SELECT COUNT(*) AS count FROM products').get() as { count: number }

if (productCount.count === 0) {
    const insertProduct = database.prepare(`
    INSERT INTO products (
      sku, slug, name, description, category, price_cents, currency,
      image_url, image_alt, inventory_count, seo_title, seo_description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

    for (const product of seedProducts) {
        insertProduct.run(
            product.sku,
            product.slug,
            product.name,
            product.description,
            product.category,
            product.priceCents,
            product.currency,
            product.imageUrl,
            product.imageAlt,
            product.inventoryCount,
            product.seoTitle,
            product.seoDescription,
        )
    }
}

const selectProductFields = `
  id, sku, slug, name, description, category,
  price_cents AS priceCents,
  currency,
  image_url AS imageUrl,
  image_alt AS imageAlt,
  inventory_count AS inventoryCount,
  seo_title AS seoTitle,
  seo_description AS seoDescription
`

export function listProducts(options: { category?: string; search?: string } = {}): Product[] {
    const clauses: string[] = []
    const parameters: string[] = []

    if (options.category) {
        clauses.push('category = ?')
        parameters.push(options.category)
    }

    if (options.search) {
        clauses.push('(name LIKE ? OR description LIKE ? OR category LIKE ?)')
        const term = `%${options.search}%`
        parameters.push(term, term, term)
    }

    const whereClause = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
    const query = database.prepare(`SELECT ${selectProductFields} FROM products ${whereClause} ORDER BY id`)

    return query.all(...parameters) as unknown as Product[]
}

export function getProductBySlug(slug: string): Product | undefined {
    const query = database.prepare(`SELECT ${selectProductFields} FROM products WHERE slug = ?`)
    return query.get(slug) as unknown as Product | undefined
}
