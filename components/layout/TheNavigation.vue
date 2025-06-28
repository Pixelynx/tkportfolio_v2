<template>
  <nav
    class="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
    role="navigation"
    aria-label="Page sections"
  >
    <div class="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-border-surface-200 dark:border-border-surface-700">
      <ul class="space-y-2" role="list">
        <li
          v-for="(section, index) in visibleSections"
          :key="section.id"
          class="relative"
        >
          <button
            type="button"
            class="navigation-dot"
            :class="getDotClasses(section)"
            :aria-label="`Go to ${section.title} section`"
            :aria-current="activeSection === section.id ? 'location' : false"
            @click="scrollToSection(section.id)"
            @mouseenter="showTooltip(index)"
            @mouseleave="hideTooltip"
            @focus="showTooltip(index)"
            @blur="hideTooltip"
          >
            <span class="sr-only">{{ section.title }}</span>
          </button>

          <!-- Tooltip -->
          <Transition name="tooltip">
            <div
              v-if="hoveredIndex === index"
              class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-background-900 dark:bg-surface-700 text-white text-xs font-medium px-2 py-1 rounded whitespace-nowrap pointer-events-none"
              role="tooltip"
            >
              {{ section.title }}
              <div class="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-background-900 dark:border-l-surface-700 border-y-4 border-y-transparent"></div>
            </div>
          </Transition>
        </li>
      </ul>

      <!-- Progress indicator -->
      <div class="mt-4 pt-2 border-t border-border-surface-200 dark:border-border-surface-600">
        <div
          class="w-1 bg-surface-200 dark:bg-surface-600 rounded-full mx-auto overflow-hidden"
          style="height: 40px;"
          role="progressbar"
          :aria-valuenow="scrollProgress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Reading progress"
        >
          <div
            class="w-full bg-gradient-to-b from-primary-500 to-secondary-600 rounded-full transition-all duration-300 ease-out"
            :style="{ height: `${scrollProgress}%`, transform: `translateY(${100 - scrollProgress}%)` }"
          ></div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Bottom Navigation -->
  <nav
    v-if="showMobileNav"
    class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 lg:hidden"
    role="navigation"
    aria-label="Mobile page sections"
  >
    <div class="bg-white/95 dark:bg-surface-800/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border-surface-200 dark:border-border-surface-700">
      <ul class="flex space-x-4" role="list">
        <li
          v-for="section in visibleSections.slice(0, 4)"
          :key="`mobile-${section.id}`"
        >
          <button
            type="button"
            class="mobile-navigation-dot"
            :class="getMobileDotClasses(section)"
            :aria-label="`Go to ${section.title} section`"
            :aria-current="activeSection === section.id ? 'location' : false"
            @click="scrollToSection(section.id)"
          >
            <span class="sr-only">{{ section.title }}</span>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useScroll } from '~/composables/useScroll'
import type { Section } from '~/types'

interface Props {
  sections?: Section[]
  showMobileNav?: boolean
  offset?: number
}

const props = withDefaults(defineProps<Props>(), {
  sections: () => [
    { id: 'home', title: 'Home', visible: true, order: 1 },
    { id: 'skills', title: 'Skills & Experience', visible: true, order: 2 },
    { id: 'projects', title: 'Projects', visible: true, order: 3 },
    { id: 'contact', title: 'Contact', visible: true, order: 4 }
  ],
  showMobileNav: false,
  offset: 80
})

// State
const hoveredIndex = ref<number | null>(null)
const mounted = ref(false)
const activeSection = ref<string | null>(null)
const scrollProgress = ref(0)

// Scroll composable
const { currentSection } = useScroll()

// Update active section based on current section
watch(currentSection, (newIndex) => {
  if (newIndex >= 0 && newIndex < props.sections.length) {
    const section = props.sections[newIndex]
    if (section) {
      activeSection.value = section.id
    }
  }
})

// Calculate scroll progress
const updateScrollProgress = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
}

// Computed properties
const visibleSections = computed(() =>
  props.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order)
)

// Methods
const getDotClasses = (section: Section) => [
  'w-3 h-3 rounded-full transition-all duration-300 ease-out border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  activeSection.value === section.id
    ? 'bg-primary-600 border-primary-600 scale-125 shadow-lg'
    : 'bg-transparent border-border-neutral-400 dark:border-border-neutral-500 hover:border-primary-500 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:scale-110'
]

const getMobileDotClasses = (section: Section) => [
  'p-2 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-500',
  activeSection.value === section.id
    ? 'bg-primary-600 text-white shadow-lg scale-110'
    : 'bg-surface-100 dark:bg-surface-700 text-text-600 dark:text-text-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400'
]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - props.offset
    
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })

    // Update URL hash without scrolling
    if (history.replaceState) {
      history.replaceState(null, '', `#${sectionId}`)
    }

    // Announce to screen readers
    announceNavigation(sectionId)
  }
}

const showTooltip = (index: number) => {
  if (mounted.value) {
    hoveredIndex.value = index
  }
}

const hideTooltip = () => {
  hoveredIndex.value = null
}

const announceNavigation = (sectionId: string) => {
  const section = props.sections.find(s => s.id === sectionId)
  if (section) {
    // Create a temporary announcement for screen readers
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = `Navigated to ${section.title} section`
    
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }
}

// Handle keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!mounted.value) return

  const currentIndex = visibleSections.value.findIndex(
    section => section.id === activeSection.value
  )

  if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
    event.preventDefault()
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleSections.value.length - 1
    const prevSection = visibleSections.value[prevIndex]
    if (prevSection) {
      scrollToSection(prevSection.id)
    }
  } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    event.preventDefault()
    const nextIndex = currentIndex < visibleSections.value.length - 1 ? currentIndex + 1 : 0
    const nextSection = visibleSections.value[nextIndex]
    if (nextSection) {
      scrollToSection(nextSection.id)
    }
  }
}

// Lifecycle
onMounted(() => {
  mounted.value = true
  
  // Add keyboard navigation
  document.addEventListener('keydown', handleKeydown)
  
  // Add scroll listener for progress
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  
  // Initial scroll progress calculation
  updateScrollProgress()
  
  // Set initial active section based on URL hash
  if (window.location.hash) {
    const hash = window.location.hash.substring(1)
    const section = props.sections.find(s => s.id === hash)
    if (section) {
      nextTick(() => {
        scrollToSection(hash)
      })
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('scroll', updateScrollProgress)
})

// Watch for section changes and update URL
watch(activeSection, (newSection) => {
  if (newSection && mounted.value) {
    // Update URL hash without scrolling
    if (history.replaceState && window.location.hash !== `#${newSection}`) {
      history.replaceState(null, '', `#${newSection}`)
    }
  }
})
</script>

<style scoped>
.navigation-dot {
  display: block;
  cursor: pointer;
  position: relative;
}

.navigation-dot:hover {
  transform: scale(1.1);
}

.navigation-dot:active {
  transform: scale(0.95);
}

.mobile-navigation-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.mobile-navigation-dot:active {
  transform: scale(0.95);
}

/* Tooltip animations */
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(10px) translateY(-50%);
}

/* Custom scrollbar for progress indicator */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 2px;
}

/* Ensure proper spacing and alignment */
.navigation-dot::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 50%;
  background: transparent;
  transition: background-color 0.2s ease;
}

.navigation-dot:hover::before {
  background: rgba(59, 130, 246, 0.1);
}

.navigation-dot:focus::before {
  background: rgba(59, 130, 246, 0.2);
}

/* Smooth scroll behavior override for better control */
@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto !important;
  }
}
</style> 