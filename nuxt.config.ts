/// <reference types="nuxt" />

export default defineNuxtConfig({
  // Development and compatibility settings
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  
  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image'
  ],

  // CSS and styling
  css: ['~/assets/css/main.css'],
  
  // App configuration
  app: {
    head: {
      title: 'TK Stevens - Fullstack Developer Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'TK Stevens - Fullstack Developer Portfolio showcasing React, Python, and web development projects' },
        { name: 'keywords', content: 'frontend developer, react, vue, javascript, typescript, web development, portfolio' },
        { name: 'author', content: 'TK Stevens' },
        { property: 'og:title', content: 'TK Stevens - Fullstack Developer Portfolio' },
        { property: 'og:description', content: 'Frontend Developer Portfolio showcasing React, Python, and web development projects' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'TK Stevens - Fullstack Developer Portfolio' },
        { name: 'twitter:description', content: 'Frontend Developer Portfolio showcasing React, Python, and web development projects' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/img/icons/svg/heart-fill.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap' }
      ]
    },
    // Configure asset paths for production
    baseURL: '/',
  },

  // Build configuration
  build: {
    transpile: ['@vueuse/core']
  },

  ssr: true,
  
    // Nitro configuration for static site generation 
  nitro: {
    preset: 'static',
    publicAssets: [
      {
        baseURL: '/',
        dir: 'public',
        maxAge: 31536000
      }
    ],
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      failOnError: false
    }
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      siteUrl: 'https://tjstevens-portfolio.netlify.app/'
    }
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false
  },

  // Experimental features
  experimental: {
    payloadExtraction: false
  }
})
