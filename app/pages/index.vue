<script setup lang="ts">
import { computed, ref } from 'vue'

definePageMeta({
  title: 'Discover anime, manga & culture',
})

type Pick = {
  id: string
  title: string
  category: 'Anime' | 'Manga' | 'Pop culture'
  note: string
  rating: string
  image: string
  imageAlt: string
  color: string
}

const filters = ['Anime', 'Manga', 'Pop culture', 'All', 'Saved'] as const
const activeFilter = ref<(typeof filters)[number]>('Anime')
const searchQuery = ref('')
const savedIds = ref(['night-shift', 'ink-and-signal'])

const picks: Pick[] = [
  {
    id: 'night-shift',
    title: 'Night Shift Radio',
    category: 'Anime',
    note: 'Series · 12 episodes',
    rating: '9.2',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Colorful illustrated character artwork',
    color: '#b5c9d5',
  },
  {
    id: 'ink-and-signal',
    title: 'Ink & Signal',
    category: 'Manga',
    note: 'Manga · New volume',
    rating: '8.8',
    image: 'https://images.unsplash.com/photo-1614583225154-5fcdda07019e?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Illustrated art displayed in a colorful book',
    color: '#e2a57e',
  },
  {
    id: 'after-the-last-train',
    title: 'After the Last Train',
    category: 'Anime',
    note: 'Film · 1h 48m',
    rating: '9.0',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'A crowded neon-lit Tokyo crossing at night',
    color: '#5a7486',
  },
  {
    id: 'pixel-generation',
    title: 'Pixel Generation',
    category: 'Pop culture',
    note: 'Pop culture · 6 min read',
    rating: 'TRENDING',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Colorful retro video game equipment',
    color: '#e5c55f',
  },
  {
    id: 'blue-hour-club',
    title: 'Blue Hour Club',
    category: 'Anime',
    note: 'Series · 24 episodes',
    rating: '8.9',
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Vivid electric blue and red light installation',
    color: '#5360a5',
  },
  {
    id: 'small-worlds-big-feelings',
    title: 'Small Worlds, Big Feelings',
    category: 'Manga',
    note: 'Manga · Editor’s pick',
    rating: '8.7',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Colorful paintings and art supplies on a studio wall',
    color: '#d7968a',
  },
  {
    id: 'the-next-frame',
    title: 'The Next Frame',
    category: 'Pop culture',
    note: 'Pop culture · Studio visit',
    rating: 'FEATURE',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85&sat=-35',
    imageAlt: 'An artist’s colorful studio workspace',
    color: '#b87955',
  },
  {
    id: 'orbiting-you',
    title: 'Orbiting You',
    category: 'Anime',
    note: 'Series · 10 episodes',
    rating: '8.6',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'A dramatic night sky filled with stars',
    color: '#495579',
  },
]

const visiblePicks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return picks.filter((pick) => {
    const matchesCategory = activeFilter.value === 'All'
      || (activeFilter.value === 'Saved'
        ? savedIds.value.includes(pick.id)
        : pick.category === activeFilter.value)
    const matchesSearch = !query
      || `${pick.title} ${pick.category} ${pick.note}`.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })
})

function isSaved(id: string) {
  return savedIds.value.includes(id)
}

function toggleSaved(id: string) {
  savedIds.value = isSaved(id)
    ? savedIds.value.filter(savedId => savedId !== id)
    : [...savedIds.value, id]
}

function selectFilter(filter: (typeof filters)[number]) {
  activeFilter.value = filter
  document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="frame-app">
    <div class="edition-bar">
      <div class="edition-message">
        <span class="edition-dot" />
        <span>Pop culture, in good company</span>
      </div>
      <span class="edition-date">FIELD NOTES · VOL. 08 · 2026</span>
    </div>

    <header class="site-header site-width">
      <NuxtLink class="brand-lockup" to="/" aria-label="Frame Shift home">
        <span class="brand-mark">f.</span>
        <span>FRAME<span class="brand-slash">/</span>SHIFT</span>
      </NuxtLink>

      <nav class="main-nav" aria-label="Explore Frame Shift">
        <button type="button" :aria-pressed="activeFilter === 'Anime'" @click="selectFilter('Anime')">Anime</button>
        <button type="button" :aria-pressed="activeFilter === 'Manga'" @click="selectFilter('Manga')">Manga</button>
        <button type="button" :aria-pressed="activeFilter === 'Pop culture'" @click="selectFilter('Pop culture')">Pop culture</button>
        <NuxtLink class="main-nav-link" to="/shop">Shop</NuxtLink>
        <NuxtLink class="main-nav-link" to="/dashboard">Dashboard</NuxtLink>
      </nav>

      <div class="header-actions">
        <a class="header-search-link" href="#discover" aria-label="Search the collection">
          <UIcon name="i-lucide-search" aria-hidden="true" />
        </a>
        <NuxtLink class="header-search-link shop-icon-link" to="/shop" aria-label="Shop products">
          <UIcon name="i-lucide-shopping-bag" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink class="header-search-link auth-icon-link" to="/login" aria-label="Sign in or register">
          <UIcon name="i-lucide-user-round" aria-hidden="true" />
        </NuxtLink>
        <button class="shelf-link" type="button" @click="selectFilter('Saved')">
          <UIcon name="i-lucide-bookmark" aria-hidden="true" />
          <span>My shelf</span>
          <span class="shelf-count">{{ savedIds.length }}</span>
        </button>
      </div>
    </header>

    <main>
      <section id="season" class="hero site-width" aria-labelledby="hero-title">
        <div class="hero-copy">
          <div class="eyebrow"><span class="eyebrow-mark" /> A little more than a watchlist</div>
          <h1 id="hero-title">Find your next <em>favourite</em> universe.</h1>
          <p>Fresh anime, manga worth staying up for, and the culture connecting it all. Your next deep dive starts here.</p>
          <div class="hero-actions">
            <a class="button-primary" href="#discover">
              Explore the edit
              <UIcon name="i-lucide-arrow-down-right" aria-hidden="true" />
            </a>
            <a class="text-link" href="#radar">What’s happening <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" /></a>
          </div>
        </div>

        <article class="hero-visual" aria-label="Featured: Tokyo after dark">
          <img
            class="hero-image"
            src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1500&q=90"
            alt="Expressive illustrated character artwork in vivid color"
            fetchpriority="high"
          >
          <div class="hero-stamp"><span class="edition-dot" /> On the cover · 01</div>
          <div class="hero-visual-copy">
            <div>
              <span class="cover-kicker">The season, decoded</span>
              <h2>8 new worlds. One very full watchlist.</h2>
            </div>
            <a class="hero-arrow" href="#discover" aria-label="Explore this season">
              <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
            </a>
          </div>
        </article>
      </section>

      <div class="signal-row site-width" aria-label="Community activity">
        <p><strong>THIS WEEK</strong><span class="signal-divider" /> <span>12 fresh picks added</span></p>
        <p><span>Currently on repeat</span> <strong>Night Shift Radio</strong></p>
        <p class="signal-tag">Curated for the curious <span>↗</span></p>
      </div>

      <section id="discover" class="discover-section site-width" aria-labelledby="discover-title">
        <div class="section-head">
          <div>
            <span class="section-kicker">The good stuff</span>
            <h2 id="discover-title">{{ activeFilter === 'Anime' ? 'Anime in rotation' : activeFilter === 'Pop culture' ? 'Pop culture in rotation' : 'Currently in rotation' }}</h2>
            <p>{{ activeFilter === 'Anime' ? 'Season standouts and the next big thing.' : activeFilter === 'Pop culture' ? 'The music, games, art, and conversations around it.' : 'Handpicked for your next “one more episode.”' }}</p>
          </div>
        </div>

        <div class="discover-controls">
          <div class="filter-list" role="group" aria-label="Filter picks by type">
            <button
              v-for="filter in filters"
              :key="filter"
              class="filter-button"
              :class="{ 'is-active': activeFilter === filter }"
              type="button"
              :aria-pressed="activeFilter === filter"
              @click="activeFilter = filter"
            >
              {{ filter }}
              <span v-if="filter === 'Saved' && savedIds.length" class="filter-count">{{ savedIds.length }}</span>
            </button>
          </div>

          <label class="search-field">
            <UIcon name="i-lucide-search" aria-hidden="true" />
            <input v-model="searchQuery" type="search" placeholder="Find your next thing" aria-label="Search anime, manga, and culture picks">
            <UIcon name="i-lucide-command" aria-hidden="true" />
          </label>
        </div>

        <p class="item-count" aria-live="polite">{{ String(visiblePicks.length).padStart(2, '0') }} PICKS / {{ activeFilter.toUpperCase() }}</p>

        <div class="item-grid">
          <article v-for="pick in visiblePicks" :key="pick.id" class="media-card">
            <div class="media-art" :style="{ backgroundColor: pick.color }">
              <img :src="pick.image" :alt="pick.imageAlt" loading="lazy">
              <span class="media-type">{{ pick.category }}</span>
              <button
                class="save-button"
                :class="{ 'is-saved': isSaved(pick.id) }"
                type="button"
                :aria-label="`${isSaved(pick.id) ? 'Remove' : 'Add'} ${pick.title} ${isSaved(pick.id) ? 'from' : 'to'} your shelf`"
                :aria-pressed="isSaved(pick.id)"
                @click="toggleSaved(pick.id)"
              >
                <UIcon :name="isSaved(pick.id) ? 'i-lucide-bookmark-check' : 'i-lucide-bookmark-plus'" aria-hidden="true" />
              </button>
              <div class="art-caption">
                <span>{{ pick.note.split(' · ')[0] }}</span>
                <strong v-if="!['TRENDING', 'FEATURE'].includes(pick.rating)">
                  <UIcon name="i-lucide-star" aria-hidden="true" /> {{ pick.rating }}
                </strong>
                <strong v-else>{{ pick.rating }}</strong>
              </div>
            </div>
            <div class="card-copy">
              <div>
                <h3>{{ pick.title }}</h3>
                <p>{{ pick.note }}</p>
              </div>
              <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
            </div>
          </article>

          <div v-if="!visiblePicks.length" class="empty-state">
            <strong>{{ activeFilter === 'Saved' ? 'Your shelf is taking a breather.' : 'Nothing in this frame.' }}</strong>
            <span>Try another search or switch the filter.</span>
          </div>
        </div>
      </section>

      <section id="radar" class="radar-section site-width" aria-labelledby="radar-title">
        <div class="radar-heading">
          <span class="section-kicker">Beyond the screen</span>
          <h2 id="radar-title">On the culture radar</h2>
          <p>Little things making a lot of noise in the worlds we love.</p>
        </div>
        <div class="radar-list">
          <article class="radar-item">
            <span class="radar-time">01 / NOW</span>
            <strong>Why the city-pop revival keeps finding a new generation</strong>
            <span>5 min read ↗</span>
          </article>
          <article class="radar-item">
            <span class="radar-time">02 / SOON</span>
            <strong>Inside the tiny studios drawing the next big thing</strong>
            <span>Studio notes ↗</span>
          </article>
          <article class="radar-item">
            <span class="radar-time">03 / ALWAYS</span>
            <strong>The opening sequences we never skip</strong>
            <span>Community list ↗</span>
          </article>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner site-width">
        <div class="footer-brand"><span class="brand-mark">f.</span> FRAME/SHIFT</div>
        <p>Anime, manga & everything in between.</p>
        <span class="footer-meta">Made for the next frame · 2026</span>
      </div>
    </footer>
  </div>
</template>
