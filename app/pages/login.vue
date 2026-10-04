<script setup>
definePageMeta({
  title: 'Login',
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
      <NuxtLink class="shelf-link" to="/dashboard">Dashboard</NuxtLink>
    </header>

    <main class="auth-page site-width">
      <section class="auth-panel" aria-labelledby="login-title">
        <span class="section-kicker">Your Frame Shift account</span>
        <h1 id="login-title">Welcome back.</h1>
        <p class="auth-copy">Pick up where your next story begins.</p>

        <form class="auth-form">
          <label class="auth-field" for="username">
            Username
            <input id="username" name="username" type="text" autocomplete="username" placeholder="Your username">
          </label>
          <label class="auth-field" for="password">
            Password
            <input id="password" name="password" type="password" autocomplete="current-password" placeholder="Your password">
          </label>
        </form>

        <div class="auth-actions">
          <NuxtLink class="button-primary" to="/dashboard">Continue to dashboard</NuxtLink>
          <NuxtLink class="text-link" to="/register">Create an account</NuxtLink>
        </div>
        <NuxtLink class="auth-back-link" to="/">Back to anime discovery</NuxtLink>
      </section>
    </main>
  </div>
</template>
