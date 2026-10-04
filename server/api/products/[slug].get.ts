import { getProductBySlug } from '../../utils/catalog-db'

export default defineEventHandler((event) => {
    const slug = getRouterParam(event, 'slug')
    const product = slug ? getProductBySlug(slug) : undefined

    if (!product) {
        throw createError({ statusCode: 404, statusMessage: 'Product not found' })
    }

    return product
})
