import { listProducts } from '../../utils/catalog-db'

export default defineEventHandler((event) => {
    const query = getQuery(event)
    const category = typeof query.category === 'string' ? query.category : undefined
    const search = typeof query.search === 'string' ? query.search.trim() : undefined

    return listProducts({ category, search })
})
