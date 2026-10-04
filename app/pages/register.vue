<script setup>
definePageMeta({
  title: 'Register',
})




</script>
<template>
  <div class="frame-app">
    <header class="site-header site-width">
      <NuxtLink class="brand-lockup" to="/" aria-label="Frame Shift home">
        <span class="brand-mark">f.</span>
        <span>FRAME<span class="brand-slash">/</span>SHIFT</span>
      </NuxtLink>
      <nav class="main-nav" aria-label="Account navigation">
        <NuxtLink class="main-nav-link" to="/">Main app</NuxtLink>
        <NuxtLink class="main-nav-link" to="/login">Login</NuxtLink>
      </nav>
      <NuxtLink class="shelf-link" to="/dashboard">Dashboard</NuxtLink>
    </header>

    <main class="shop-page site-width">
      <div class="shop-heading">
        <div>
          <span class="section-kicker">Your Frame Shift account</span>
          <h1>Register</h1>
          <p>Make a place for the stories, art, and finds you want to keep close.</p>
        </div>
      </div>
      <div class="hero-actions">
        <NuxtLink class="button-primary" to="/dashboard">Open dashboard</NuxtLink>
        <NuxtLink class="text-link" to="/login">Already registered? Sign in</NuxtLink>
        <NuxtLink class="text-link" to="/">Back to anime discovery</NuxtLink>
      </div>
    </main>
  </div>
</template>
