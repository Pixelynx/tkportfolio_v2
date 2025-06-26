<template>
  <footer
    class="bg-background-50 dark:bg-background-900 border-t border-border-neutral-200 dark:border-border-neutral-700"
    role="contentinfo"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white font-bold"
              aria-hidden="true"
            >
              {{ initials }}
            </div>
            <div>
              <h3 class="text-xl font-bold text-text-900 dark:text-white">
                {{ portfolioConfig.name }}
              </h3>
              <p class="text-sm text-text-600 dark:text-text-400">
                {{ portfolioConfig.title }}
              </p>
            </div>
          </div>
          
          <p class="text-text-700 dark:text-text-300 mb-6 max-w-md">
            {{ portfolioConfig.description }}
          </p>

          <!-- Social Links -->
          <div class="flex space-x-4">
            <NuxtLink
              v-for="social in socialLinks"
              :key="social.platform"
              :to="social.url"
              :external="social.url.startsWith('http')"
              :target="social.url.startsWith('http') ? '_blank' : undefined"
              :rel="social.url.startsWith('http') ? 'noopener noreferrer' : undefined"
              class="social-link"
              :aria-label="`Visit ${social.label} profile`"
            >
              <span class="w-5 h-5 flex items-center justify-center" aria-hidden="true">
                {{ getSocialIcon(social.platform) }}
              </span>
            </NuxtLink>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-text-900 dark:text-white mb-4">
            Quick Links
          </h4>
          <nav aria-label="Footer navigation">
            <ul class="space-y-2">
              <li
                v-for="item in navigationItems"
                :key="`footer-${item.id}`"
              >
                <NuxtLink
                  :to="item.href"
                  class="footer-nav-link"
                  @click="handleNavClick(item)"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold text-text-900 dark:text-white mb-4">
            Get In Touch
          </h4>
          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <span
                class="w-5 h-5 text-text-500 dark:text-text-400 flex-shrink-0 flex items-center justify-center"
                aria-hidden="true"
              >
                ✉️
              </span>
              <a
                :href="`mailto:${portfolioConfig.email}`"
                class="text-text-700 dark:text-text-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              >
                {{ portfolioConfig.email }}
              </a>
            </div>
            
            <div class="flex items-center space-x-3">
              <span
                class="w-5 h-5 text-text-500 dark:text-text-400 flex-shrink-0 flex items-center justify-center"
                aria-hidden="true"
              >
                📍
              </span>
              <span class="text-text-700 dark:text-text-300">
                {{ portfolioConfig.location }}
              </span>
            </div>

            <div
              v-if="portfolioConfig.availableForWork"
              class="flex items-center space-x-3"
            >
              <div
                class="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"
                aria-hidden="true"
              ></div>
              <span class="text-green-600 dark:text-green-400 font-medium">
                Available for work
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-12 pt-8 border-t border-border-neutral-200 dark:border-border-neutral-700">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <!-- Copyright -->
          <div class="text-text-600 dark:text-text-400 text-sm">
            <p>
              © {{ currentYear }} {{ portfolioConfig.name }}. All rights reserved.
            </p>
            <p class="mt-1">
              Built with
              <a
                href="https://nuxt.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-600 dark:text-primary-400 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              >
                Nuxt 3
              </a>
              &
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-600 dark:text-primary-400 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              >
                Tailwind CSS
              </a>
            </p>
          </div>

          <!-- Back to Top -->
          <button
            type="button"
            class="back-to-top-btn"
            :class="{ 'opacity-100': showBackToTop, 'opacity-50': !showBackToTop }"
            :disabled="!showBackToTop"
            aria-label="Back to top of page"
            @click="scrollToTop"
          >
            <span class="w-5 h-5 flex items-center justify-center" aria-hidden="true">
              ↑
            </span>
            <span class="ml-2 hidden sm:inline">Back to Top</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Back to Top Floating Button (Mobile) -->
    <Transition name="back-to-top">
              <button
          v-if="showBackToTop && isMobile"
          type="button"
          class="fixed bottom-4 right-4 z-20 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 md:hidden"
          aria-label="Back to top of page"
          @click="scrollToTop"
        >
        <span class="w-6 h-6 flex items-center justify-center text-xl font-bold" aria-hidden="true">
          ↑
        </span>
      </button>
    </Transition>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { PORTFOLIO_CONFIG, NAVIGATION_ITEMS, SOCIAL_LINKS } from '~/utils/constants'
import type { NavigationItem } from '~/types'

// Configuration
const portfolioConfig = PORTFOLIO_CONFIG
const navigationItems = NAVIGATION_ITEMS
const socialLinks = [...SOCIAL_LINKS].sort((a, b) => a.order - b.order)

// State
const showBackToTop = ref(false)
const isMobile = ref(false)

// Computed properties
const initials = computed(() => {
  return portfolioConfig.name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
})

const currentYear = computed(() => new Date().getFullYear())

// Get social platform icon
const getSocialIcon = (platform: string): string => {
  const iconMap: Record<string, string> = {
    linkedin: 'in',
    github: '🐙',
    twitter: '🐦',
    instagram: '📷',
    email: '✉️'
  }
  return iconMap[platform] || '🔗'
}

// Methods
const handleNavClick = (item: NavigationItem) => {
  if (item.href.startsWith('#')) {
    smoothScrollTo(item.href)
  }
}

const smoothScrollTo = (target: string) => {
  const element = document.querySelector(target)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  // Announce to screen readers
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = 'Scrolled to top of page'
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)

  // Focus on skip link for accessibility
  nextTick(() => {
    const skipLink = document.querySelector('a[href="#main-content"]') as HTMLElement
    skipLink?.focus()
  })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 500
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// Lifecycle
onMounted(() => {
  // Initial checks
  handleScroll()
  checkMobile()

  // Event listeners
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', checkMobile, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.social-link {
  @apply w-10 h-10 bg-surface-200 dark:bg-surface-700 text-text-600 dark:text-text-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}

.social-link:hover {
  transform: translateY(-2px);
}

.footer-nav-link {
  @apply text-text-600 dark:text-text-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded;
}

.back-to-top-btn {
  @apply flex items-center px-4 py-2 bg-surface-200 dark:bg-surface-700 text-text-700 dark:text-text-300 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:hover:bg-surface-200 disabled:hover:text-text-700 dark:disabled:hover:bg-surface-700 dark:disabled:hover:text-text-300;
}

.back-to-top-btn:not(:disabled):hover {
  transform: translateY(-2px);
}

/* Back to top floating button animations */
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

/* Pulse animation for availability indicator */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Ensure proper focus indicators */
.social-link:focus,
.footer-nav-link:focus,
.back-to-top-btn:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Smooth hover effects */
.social-link,
.footer-nav-link,
.back-to-top-btn {
  position: relative;
  overflow: hidden;
}

.social-link::before,
.footer-nav-link::before,
.back-to-top-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.social-link:hover::before,
.footer-nav-link:hover::before,
.back-to-top-btn:hover::before {
  left: 100%;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .social-link {
    @apply w-8 h-8;
  }
  
  .social-link Icon {
    @apply w-4 h-4;
  }
}
</style> 