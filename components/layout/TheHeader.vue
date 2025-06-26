<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-background-900/95 backdrop-blur-sm border-b border-border-neutral-200 dark:border-border-neutral-700 transition-all duration-300"
    :class="headerClasses"
    role="banner"
  >
    <nav
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      role="navigation"
      aria-label="Main navigation"
    >
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand Section -->
        <div class="flex-shrink-0">
          <NuxtLink
            to="/"
            class="flex items-center space-x-2 text-xl font-bold text-text-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md px-2 py-1"
            :aria-label="`${portfolioConfig.name} - Go to homepage`"
            @click="handleLogoClick"
          >
            <div
              class="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              aria-hidden="true"
            >
              {{ initials }}
            </div>
            <span class="hidden sm:block">{{ portfolioConfig.name }}</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.id"
              :to="item.href"
              class="nav-link"
              :class="getLinkClasses(item)"
              :aria-current="isCurrentPage(item) ? 'page' : undefined"
              @click="handleNavClick(item)"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Theme Toggle -->
          <button
            type="button"
            class="p-2 rounded-md text-text-500 dark:text-text-400 hover:text-text-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
            @click="toggleTheme"
          >
            <span class="w-5 h-5 flex items-center justify-center" aria-hidden="true">
              {{ isDark ? '☀️' : '🌙' }}
            </span>
          </button>

          <!-- CTA Button -->
          <NuxtLink
            to="#contact"
            class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="handleContactClick"
          >
            Let's Connect
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            type="button"
            class="p-2 rounded-md text-text-500 dark:text-text-400 hover:text-text-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            :aria-label="`${isMobileMenuOpen ? 'Close' : 'Open'} navigation menu`"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-menu"
            @click="toggleMobileMenu"
          >
            <span class="w-6 h-6 flex items-center justify-center" aria-hidden="true">
              {{ isMobileMenuOpen ? '✕' : '☰' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <Transition
        name="mobile-menu"
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isMobileMenuOpen"
          id="mobile-menu"
          class="md:hidden"
          role="menu"
          aria-orientation="vertical"
        >
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-background-900 border-t border-border-neutral-200 dark:border-border-neutral-700">
            <NuxtLink
              v-for="item in navigationItems"
              :key="`mobile-${item.id}`"
              :to="item.href"
              class="mobile-nav-link"
              :class="getMobileLinkClasses(item)"
              :aria-current="isCurrentPage(item) ? 'page' : undefined"
              role="menuitem"
              @click="handleMobileNavClick(item)"
            >
              {{ item.label }}
            </NuxtLink>

            <!-- Mobile Actions -->
            <div class="pt-4 border-t border-border-neutral-200 dark:border-border-neutral-700 space-y-2">
              <!-- Theme Toggle -->
              <button
                type="button"
                class="w-full flex items-center px-3 py-2 text-base font-medium text-text-700 dark:text-text-300 hover:text-text-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-surface-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                @click="toggleTheme"
              >
                <span class="w-5 h-5 mr-3 flex items-center justify-center" aria-hidden="true">
                  {{ isDark ? '☀️' : '🌙' }}
                </span>
                {{ isDark ? 'Light Mode' : 'Dark Mode' }}
              </button>

              <!-- Mobile CTA -->
              <NuxtLink
                to="#contact"
                class="w-full bg-primary-600 hover:bg-primary-700 text-white text-center px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 block"
                @click="handleMobileContactClick"
              >
                Let's Connect
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'nuxt/app'
import { useColorMode } from '@vueuse/core'
import { PORTFOLIO_CONFIG, NAVIGATION_ITEMS } from '~/utils/constants'
import type { NavigationItem } from '~/types'

// Configuration
const portfolioConfig = PORTFOLIO_CONFIG
const navigationItems = NAVIGATION_ITEMS

// Composables
const route = useRoute()
const colorMode = useColorMode()

// State
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

// Computed properties
const initials = computed(() => {
  return portfolioConfig.name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
})

const isDark = computed(() => colorMode.value === 'dark')

const headerClasses = computed(() => [
  isScrolled.value ? 'shadow-lg' : '',
  isMobileMenuOpen.value ? 'shadow-lg' : ''
])

// Navigation link classes
const getLinkClasses = (item: NavigationItem) => [
  'px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
  isCurrentPage(item)
    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
    : 'text-text-700 dark:text-text-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-surface-50 dark:hover:bg-surface-800'
]

const getMobileLinkClasses = (item: NavigationItem) => [
  'block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
  isCurrentPage(item)
    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
    : 'text-text-700 dark:text-text-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-surface-50 dark:hover:bg-surface-800'
]

// Methods
const isCurrentPage = (item: NavigationItem): boolean => {
  if (item.href === '/' || item.href === '#home') {
    return route.name === 'index'
  }
  return route.path === item.href || route.hash === item.href
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleTheme = () => {
  colorMode.value = isDark.value ? 'light' : 'dark'
}

const handleLogoClick = () => {
  closeMobileMenu()
  smoothScrollTo('#home')
}

const handleNavClick = (item: NavigationItem) => {
  if (item.href.startsWith('#')) {
    smoothScrollTo(item.href)
  }
}

const handleMobileNavClick = (item: NavigationItem) => {
  closeMobileMenu()
  if (item.href.startsWith('#')) {
    smoothScrollTo(item.href)
  }
}

const handleContactClick = () => {
  smoothScrollTo('#contact')
}

const handleMobileContactClick = () => {
  closeMobileMenu()
  smoothScrollTo('#contact')
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

// Scroll detection
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

// Close mobile menu on route change
watch(() => route.path, () => {
  closeMobileMenu()
})

// Close mobile menu when clicking outside
const handleClickOutside = (event: Event) => {
  const header = document.querySelector('header')
  if (header && !header.contains(event.target as Node)) {
    closeMobileMenu()
  }
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMobileMenu()
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after,
.nav-link[aria-current="page"]::after {
  width: 100%;
}

.mobile-nav-link {
  position: relative;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Focus management for mobile menu */
.mobile-nav-link:focus,
.mobile-nav-link:hover {
  background-color: rgba(59, 130, 246, 0.1);
}

/* Ensure proper focus visibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
</style> 