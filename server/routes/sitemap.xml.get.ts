import { listProducts } from '../utils/catalog-db'

export default defineEventHandler((event) => {
    const configuredUrl = useRuntimeConfig(event).public.siteUrl
    const baseUrl = String(configuredUrl || getRequestURL(event).origin).replace(/\/$/, '')
    const productUrls = listProducts().map(product => `${baseUrl}/shop/${encodeURIComponent(product.slug)}`)
    const urls = [`${baseUrl}/`, `${baseUrl}/shop`, ...productUrls]
    const entries = urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')

    setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`
})
