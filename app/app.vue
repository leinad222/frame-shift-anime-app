<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Frame Shift — Anime, manga & culture'
const description = 'A fresh edit of anime, manga, and the pop culture around it.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
