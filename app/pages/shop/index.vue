<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Product } from '#shared/types/product'

definePageMeta({
  title: 'Anime & pop culture shop',
})

const categories = ['All', 'Apparel', 'Prints', 'Stationery', 'Accessories', 'Collectibles']
const selectedCategory = ref('All')
const { data, error } = await useFetch<Product[]>('/api/products')

if (error.value) {
  throw createError({ statusCode: 500, statusMessage: 'The product catalog could not be loaded' })
}

const products = computed(() => (data.value ?? []).filter((product) => {
  return selectedCategory.value === 'All' || product.category === selectedCategory.value
}))

const route = useRoute()
const requestUrl = useRequestURL()
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || requestUrl.origin).replace(/\/$/, '')
const canonicalUrl = computed(() => `${siteUrl}${route.path}`)

useSeoMeta({
  title: 'Anime & Pop Culture Shop | Frame Shift',
  description: 'Shop original anime-inspired apparel, art prints, stationery, and collectibles curated by Frame Shift.',
  ogTitle: 'Anime & Pop Culture Shop | Frame Shift',
  ogDescription: 'Original anime-inspired apparel, art prints, stationery, and collectibles.',
  ogUrl: () => canonicalUrl.value,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
})

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
      <NuxtLink class="shelf-link" to="/" aria-label="Back to anime discovery">
        <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
        <span>Discover</span>
      </NuxtLink>
    </header>

    <main class="shop-page site-width">
      <div class="shop-heading">
        <div>
          <span class="section-kicker">The Frame Shift shop</span>
          <h1>Objects for your other worlds.</h1>
          <p>Original goods for anime nights, manga stacks, and everything in between.</p>
        </div>
        <span class="shop-total">{{ products.length }} ITEMS / SMALL-BATCH PICKS</span>
      </div>

      <div class="shop-categories" role="group" aria-label="Filter products by category">
        <button
          v-for="category in categories"
          :key="category"
          class="filter-button"
          :class="{ 'is-active': selectedCategory === category }"
          type="button"
          :aria-pressed="selectedCategory === category"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <div v-if="products.length" class="shop-grid">
        <article v-for="product in products" :key="product.id" class="store-card">
          <NuxtLink class="store-image" :to="`/shop/${product.slug}`" :aria-label="`View ${product.name}`">
            <img :src="product.imageUrl" :alt="product.imageAlt" loading="lazy">
            <span class="store-category">{{ product.category }}</span>
            <span class="store-view"><UIcon name="i-lucide-arrow-up-right" aria-hidden="true" /></span>
          </NuxtLink>
          <div class="store-card-copy">
            <div>
              <h2><NuxtLink :to="`/shop/${product.slug}`">{{ product.name }}</NuxtLink></h2>
              <p>{{ product.inventoryCount > 0 ? 'In stock' : 'Sold out' }}</p>
            </div>
            <strong>{{ formatPrice(product.priceCents, product.currency) }}</strong>
          </div>
        </article>
      </div>

      <div v-else class="empty-state shop-empty">
        <strong>No items in this category yet.</strong>
        <span>Choose another category to keep browsing.</span>
      </div>
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
