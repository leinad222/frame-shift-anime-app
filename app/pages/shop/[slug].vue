<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Product } from '#shared/types/product'

const route = useRoute()
const slug = String(route.params.slug)
const { data, error } = await useFetch<Product>(`/api/products/${encodeURIComponent(slug)}`)

if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const product = computed(() => data.value!)
const requestUrl = useRequestURL()
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || requestUrl.origin).replace(/\/$/, '')
const canonicalUrl = computed(() => `${siteUrl}${route.path}`)
const addedToBag = ref(false)
const price = computed(() => (product.value.priceCents / 100).toFixed(2))
const structuredProductData = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.value.name,
  description: product.value.description,
  image: product.value.imageUrl,
  sku: product.value.sku,
  category: product.value.category,
  offers: {
    '@type': 'Offer',
    url: canonicalUrl.value,
    priceCurrency: product.value.currency,
    price: price.value,
    availability: product.value.inventoryCount > 0
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
  },
}).replace(/</g, '\\u003c'))

useSeoMeta({
  title: () => product.value.seoTitle,
  description: () => product.value.seoDescription,
  ogTitle: () => product.value.seoTitle,
  ogDescription: () => product.value.seoDescription,
  ogImage: () => product.value.imageUrl,
  ogUrl: () => canonicalUrl.value,
  ogType: 'product',
  twitterCard: 'summary_large_image',
})

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: [{
    key: 'product-structured-data',
    type: 'application/ld+json',
    innerHTML: structuredProductData.value,
  }],
}))

function formatPrice(priceCents: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(priceCents / 100)
}
</script>

<template>
  <div class="frame-app">
    <div class="edition-bar">
      <div class="edition-message"><span class="edition-dot" /> Original goods for after-hours fans</div>
      <span class="edition-date">FRAME/SHIFT SHOP · 2026</span>
    </div>

    <header class="site-header site-width">
      <NuxtLink class="brand-lockup" to="/" aria-label="Frame Shift home">
        <span class="brand-mark">f.</span>
        <span>FRAME<span class="brand-slash">/</span>SHIFT</span>
      </NuxtLink>
      <nav class="main-nav" aria-label="Main navigation">
        <NuxtLink class="main-nav-link" to="/">Discover</NuxtLink>
        <NuxtLink class="main-nav-link" to="/shop" aria-current="page">Shop</NuxtLink>
      </nav>
      <NuxtLink class="shelf-link" to="/shop" aria-label="Back to all products">
        <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
        <span>All products</span>
      </NuxtLink>
    </header>

    <main class="product-page site-width">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <NuxtLink to="/shop">Shop</NuxtLink>
        <UIcon name="i-lucide-chevron-right" aria-hidden="true" />
        <span>{{ product.category }}</span>
      </nav>

      <article class="product-detail">
        <div class="product-detail-image">
          <img :src="product.imageUrl" :alt="product.imageAlt">
          <span class="store-category">{{ product.category }}</span>
        </div>

        <div class="product-info">
          <span class="section-kicker">{{ product.sku }} / FRAME/SHIFT ORIGINAL</span>
          <h1>{{ product.name }}</h1>
          <p class="product-price">{{ formatPrice(product.priceCents, product.currency) }}</p>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-stock">
            <span class="stock-dot" :class="{ 'is-out': product.inventoryCount === 0 }" />
            {{ product.inventoryCount > 0 ? `${product.inventoryCount} in stock` : 'Currently sold out' }}
          </div>
          <button
            class="button-primary add-to-bag"
            type="button"
            :disabled="product.inventoryCount === 0"
            @click="addedToBag = true"
          >
            {{ addedToBag ? 'Added to bag' : 'Add to bag' }}
            <UIcon :name="addedToBag ? 'i-lucide-check' : 'i-lucide-shopping-bag'" aria-hidden="true" />
          </button>
          <p class="bag-status" role="status" aria-live="polite">{{ addedToBag ? 'Added to your sample bag.' : 'Secure checkout · Ships in 2–4 business days' }}</p>
          <div class="product-detail-rule" />
          <p class="product-sku">SKU {{ product.sku }} <span>·</span> Original Frame Shift design</p>
        </div>
      </article>
    </main>

    <footer class="site-footer">
      <div class="footer-inner site-width">
        <div class="footer-brand"><span class="brand-mark">f.</span> FRAME/SHIFT</div>
        <p>Original goods for the next frame.</p>
        <span class="footer-meta">Small batch · Big feelings</span>
      </div>
    </footer>
  </div>
</template>
