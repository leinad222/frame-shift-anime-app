export default defineNuxtConfig({
    modules: ['@nuxt/ui'],
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
        },
    },
    compatibilityDate: '2026-10-04',
})
