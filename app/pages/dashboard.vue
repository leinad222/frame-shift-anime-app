<script setup>
definePageMeta({
  title: 'Dashboard',
})
</script>
<template>
  <div class="frame-app">
    <header class="site-header site-width">
      <NuxtLink class="brand-lockup" to="/" aria-label="Frame Shift home">
        <span class="brand-mark">f.</span>
        <span>FRAME<span class="brand-slash">/</span>SHIFT</span>
      </NuxtLink>
      <nav class="main-nav" aria-label="Main navigation">
        <NuxtLink class="main-nav-link" to="/">Discover</NuxtLink>
        <NuxtLink class="main-nav-link" to="/shop">Shop</NuxtLink>
      </nav>
      <NuxtLink class="shelf-link" to="/login">Login</NuxtLink>
    </header>

    <main class="shop-page site-width">
      <div class="shop-heading">
        <div>
          <span class="section-kicker">Your Frame Shift space</span>
          <h1>Dashboard</h1>
          <p>Pick up where your next story begins.</p>
        </div>
      </div>
      <div class="hero-actions">
        <NuxtLink class="button-primary" to="/">Return to the main app</NuxtLink>
        <NuxtLink class="text-link" to="/shop">Browse the shop</NuxtLink>
        <NuxtLink class="text-link" to="/register">Register</NuxtLink>
      </div>
    </main>
  </div>
</template>

