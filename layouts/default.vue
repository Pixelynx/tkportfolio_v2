<template>
  <div class="min-h-screen bg-white dark:bg-background-900 transition-colors duration-300">
    <!-- Skip to main content for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50"
      @click="skipToMain"
    >
      Skip to main content
    </a>

    <!-- Header Navigation -->
    <TheHeader />

    <!-- Main Content Area -->
    <main
      id="main-content"
      class="flex-1"
      :class="mainClasses"
      role="main"
      :aria-label="pageTitle"
    >
      <ErrorBoundary>
        <slot />
      </ErrorBoundary>
    </main>

    <!-- Footer -->
    <TheFooter />

    <!-- Loading indicator -->
    <Transition name="fade">
      <div
        v-if="pending"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        role="status"
        aria-label="Loading content"
      >
        <div class="bg-white dark:bg-surface-800 rounded-lg p-6 flex items-center space-x-3">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
          <span class="text-text-900 dark:text-white">Loading...</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, defineComponent, onErrorCaptured, h } from 'vue'
import type { SetupContext } from 'vue'
import { useRoute, useRouter, useRuntimeConfig, useHead } from 'nuxt/app'
import type { SeoConfig } from '~/types'

interface Props {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
  canonical?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'TK Stevens - Fullstack Developer Portfolio',
  description: 'Frontend Developer Portfolio showcasing React, Python, and modern web development projects',
  keywords: () => ['frontend developer', 'react', 'vue', 'javascript', 'typescript', 'web development', 'portfolio'],
  image: '/og-image.jpg',
  noIndex: false
})

// Get route information
const route = useRoute()
const router = useRouter()

// Loading state
const pending = ref(false)

// Page title computation
const pageTitle = computed(() => {
  if (props.title.includes('TK Stevens')) {
    return props.title
  }
  return `${props.title} | TK Stevens - Fullstack Developer`
})

// Main content classes
const mainClasses = computed(() => [
  'min-h-screen',
  'pt-0', // Account for fixed header
  route.name === 'index' ? 'pt-0' : '' // Remove top padding on home page
])

// SEO meta tags
const seoConfig: SeoConfig = {
  title: pageTitle.value,
  description: props.description,
  keywords: props.keywords,
  image: props.image,
  url: `${useRuntimeConfig().public['siteUrl']}${route.path}`,
  type: 'website'
}

// Set meta tags
useHead({
  title: pageTitle.value,
  meta: [
    { name: 'description', content: props.description },
    { name: 'keywords', content: props.keywords.join(', ') },
    { name: 'author', content: 'TK Stevens' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#2563eb' },
    
    // Open Graph
    { property: 'og:title', content: pageTitle.value },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: props.image },
    { property: 'og:url', content: seoConfig.url },
    { property: 'og:type', content: seoConfig.type },
    { property: 'og:site_name', content: 'TK Stevens Portfolio' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle.value },
    { name: 'twitter:description', content: props.description },
    { name: 'twitter:image', content: props.image },
    
    // SEO
    ...(props.noIndex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/img/icons/svg/heart-fill.svg' },
    { rel: 'canonical', href: props.canonical ?? seoConfig.url },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
  ],
  htmlAttrs: {
    lang: 'en',
    dir: 'ltr'
  },
  bodyAttrs: {
    class: 'font-sans antialiased'
  }
})

// Skip to main content functionality
const skipToMain = () => {
  const mainContent = document.getElementById('main-content')
  if (mainContent) {
    mainContent.focus()
    mainContent.scrollIntoView({ behavior: 'smooth' })
  }
}

// Handle navigation start/finish for loading state
router.beforeEach(() => {
  pending.value = true
})

router.afterEach(() => {
  nextTick(() => {
    pending.value = false
  })
})

// Error boundary component
const ErrorBoundary = defineComponent({
  setup(_: unknown, { slots }: SetupContext) {
    const error = ref<Error | null>(null)

    onErrorCaptured((err: Error) => {
      error.value = err
      console.error('Layout Error:', err)
      return false
    })

    return () => {
      if (error.value) {
        return h('div', {
          class: 'min-h-screen flex items-center justify-center bg-background-50 dark:bg-background-900'
        }, [
          h('div', {
            class: 'max-w-md w-full bg-white dark:bg-surface-800 rounded-lg shadow-lg p-6 text-center'
          }, [
            h('div', {
              class: 'text-red-500 text-6xl mb-4'
            }, '⚠️'),
            h('h2', {
              class: 'text-2xl font-bold text-text-900 dark:text-white mb-2'
            }, 'Something went wrong'),
            h('p', {
              class: 'text-text-600 dark:text-text-400 mb-4'
            }, 'We encountered an error while loading this page.'),
            h('button', {
              class: 'bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors',
              onClick: () => {
                error.value = null
                router.go(0)
              }
            }, 'Try again')
          ])
        ])
      }
      
      return slots['default']?.()
    }
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ensure smooth scrolling for skip links */
html {
  scroll-behavior: smooth;
}

/* Focus styles for accessibility */
*:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Remove default focus outline for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}
</style> 