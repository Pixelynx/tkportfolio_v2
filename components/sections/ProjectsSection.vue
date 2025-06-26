<template>
  <section
    id="projects"
    data-section="projects"
    class="h-screen bg-gradient-to-br from-background-100 to-background-200 dark:from-background-800 dark:to-background-900 overflow-hidden"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 h-full">
      <!-- Header with Filters -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <!-- Title -->
        <div class="flex justify-start mb-4 lg:mb-0">
          <h2 class="text-2xl md:text-4xl font-bold text-text-900 dark:text-white">
            My Projects
          </h2>
        </div>

        <!-- Filter Buttons - Desktop -->
        <div class="hidden lg:flex items-center space-x-2">
          <button
            v-for="category in filterCategories"
            :key="category.value"
            type="button"
            class="filter-button"
            :class="getFilterButtonClass(category.value)"
            @click="setActiveFilter(category.value)"
            :aria-label="`Filter projects by ${category.label}`"
            :aria-pressed="currentFilter.category === category.value"
          >
            <span class="text-sm font-medium">{{ category.label }}</span>
            <span
              v-if="category.count > 0"
              class="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full"
              :class="getCountBadgeClass(category.value)"
            >
              {{ category.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Filter Buttons - Mobile (Horizontal Scroll) -->
      <div class="lg:hidden mb-6">
        <div class="flex overflow-x-auto space-x-3 pb-4 scrollbar-hide">
          <button
            v-for="category in filterCategories"
            :key="`mobile-${category.value}`"
            type="button"
            class="filter-button-mobile"
            :class="getMobileFilterButtonClass(category.value)"
            @click="setActiveFilter(category.value)"
            :aria-label="`Filter projects by ${category.label}`"
            :aria-pressed="currentFilter.category === category.value"
          >
            <span class="text-lg mb-1" aria-hidden="true">{{ category.icon }}</span>
            <span
              v-if="category.count > 0"
              class="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-500 rounded-full"
            >
              {{ category.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Projects Container -->
      <div class="relative flex-1 content-center" style="min-height: 85%;">
        <!-- Loading State -->
        <div
          v-if="isLoading"
          class="flex items-center justify-center py-20"
        >
          <div class="text-center">
            <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-text-600 dark:text-text-400">Loading projects...</p>
          </div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="flex items-center justify-center py-20"
        >
          <div class="text-center">
            <span class="text-6xl mb-4 block">Error</span>
            <p class="text-text-600 dark:text-text-400 mb-4">{{ error }}</p>
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              @click="retryLoad"
            >
              Try Again
            </button>
          </div>
        </div>

        <!-- Projects Grid/Carousel -->
        <div
          v-else-if="filteredProjects.length > 0"
          class="relative w-full flex items-center justify-center min-h-full"
        >
          <!-- Desktop: Horizontal Carousel -->
          <div class="hidden lg:block w-full">
            <!-- Carousel Wrapper with proper overflow control -->
            <div class="relative w-full px-12">
              <div class="overflow-hidden w-full">
                <div
                  ref="carouselContainer"
                  class="flex transition-transform duration-500 ease-out"
                  :style="{ transform: `translateX(-${currentSlideIndex * slideWidth}px)` }"
                >
                  <div
                    v-for="project in filteredProjects"
                    :key="project.id"
                    class="flex-shrink-0 px-3"
                    :style="{ width: `${slideWidth}px` }"
                  >
                    <ProjectCard
                      :project="project"
                      :loading="loadingProjectId === project.id"
                      @click="handleProjectClick"
                      @details="openProjectModal"
                      @action="handleProjectAction"
                      @favorite="handleFavorite"
                    />
                  </div>
                </div>
              </div>

              <!-- Navigation Arrows -->
              <button
                v-if="canScrollLeft"
                type="button"
                class="absolute left-0 top-1/2 -translate-y-1/2 z-10 nav-arrow nav-arrow-left"
                @click="scrollLeft"
                aria-label="Previous projects"
              >
                <span class="text-2xl" aria-hidden="true">←</span>
              </button>

              <button
                v-if="canScrollRight"
                type="button"
                class="absolute right-0 top-1/2 -translate-y-1/2 z-10 nav-arrow nav-arrow-right"
                @click="scrollRight"
                aria-label="Next projects"
              >
                <span class="text-2xl" aria-hidden="true">→</span>
              </button>
            </div>

            <!-- Dots Indicator -->
            <div class="flex justify-center mt-6 space-x-2">
              <button
                v-for="(_, index) in totalSlides"
                :key="index"
                type="button"
                class="carousel-dot"
                :class="{ 'active': index === currentSlideIndex }"
                @click="goToSlide(index)"
                :aria-label="`Go to slide ${index + 1}`"
              ></button>
            </div>
          </div>

          <!-- Mobile: Vertical Scroll -->
          <div class="lg:hidden w-full">
            <div class="grid grid-cols-1 gap-6">
              <ProjectCard
                v-for="project in paginatedProjects"
                :key="project.id"
                :project="project"
                :loading="loadingProjectId === project.id"
                compact
                @click="handleProjectClick"
                @details="openProjectModal"
                @action="handleProjectAction"
                @favorite="handleFavorite"
              />
            </div>

            <!-- Load More Button (Mobile) -->
            <div
              v-if="hasMore"
              class="flex justify-center mt-8"
            >
              <button
                type="button"
                class="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                :disabled="isLoadingMore"
                @click="loadMore"
              >
                <span v-if="isLoadingMore" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                {{ isLoadingMore ? 'Loading...' : 'Load More Projects' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="flex items-center justify-center py-20"
        >
          <div class="text-center">
            <span class="text-6xl mb-4 block">📭</span>
            <h3 class="text-xl font-semibold text-text-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p class="text-text-600 dark:text-text-400 mb-4">
              Try adjusting your filters or check back later for new projects.
            </p>
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-border-primary-200 dark:border-border-primary-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              @click="resetFilters"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <ProjectModal
      v-if="modalState.isOpen"
      :project="modalState.project"
      :current-image-index="modalState.currentImageIndex"
      @close="closeProjectModal"
      @next-image="nextImage"
      @previous-image="previousImage"
      @set-image="setImageIndex"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Project, ProjectLink } from '~/types'
import { useProjects } from '~/composables/useProjects'
import ProjectCard from '~/components/ui/ProjectCard.vue'
import ProjectModal from '../ui/ProjectModal.vue'

// Composables
const {
  filteredProjects,
  currentFilter,
  modalState,
  isLoading,
  error,
  filterCounts,
  setFilter,
  resetFilter,
  openProjectModal,
  closeProjectModal,
  nextImage,
  previousImage,
  setImageIndex
} = useProjects()

// Refs
const carouselContainer = ref<HTMLElement>()
const currentSlideIndex = ref(0)
const slideWidth = ref(400)
const loadingProjectId = ref<string | null>(null)
const currentPage = ref(1)
const itemsPerPage = ref(6)
const isLoadingMore = ref(false)

// Computed
const filterCategories = computed(() => [
  {
    value: 'all' as const,
    label: 'All',
    icon: '📁', // temp
    count: filterCounts.value.all
  },
  {
    value: 'dev' as const,
    label: 'Development',
    icon: '💻', // temp
    count: filterCounts.value.dev
  },
  {
    value: 'ux' as const,
    label: 'UX Design',
    icon: '🎨', // temp
    count: filterCounts.value.ux
  },
  {
    value: 'research' as const,
    label: 'Research',
    icon: '📊', // temp
    count: filterCounts.value.research
  }
])

const visibleProjects = computed(() => {
  // Calculate based on actual container width minus padding for arrows
  const containerWidth = (typeof window !== 'undefined' ? window.innerWidth : 1200) - 128 // 96px padding for arrows
  return Math.max(1, Math.floor(containerWidth / slideWidth.value))
})

const totalSlides = computed(() => {
  return Math.max(0, filteredProjects.value.length - visibleProjects.value + 1)
})

const canScrollLeft = computed(() => currentSlideIndex.value > 0)
const canScrollRight = computed(() => {
  const lastVisibleIndex = currentSlideIndex.value + visibleProjects.value - 1
  return lastVisibleIndex < filteredProjects.value.length - 1
})

const paginatedProjects = computed(() => {
  const endIndex = currentPage.value * itemsPerPage.value
  return filteredProjects.value.slice(0, endIndex)
})

const hasMore = computed(() => {
  return paginatedProjects.value.length < filteredProjects.value.length
})

// Methods
const updateSlideWidth = () => {
  if (typeof window !== 'undefined') {
    // Account for container padding and arrow space
    const availableWidth = window.innerWidth - 128 // 96px for arrows + container padding
    slideWidth.value = Math.max(300, Math.min(400, availableWidth / 3))
  }
}

const setActiveFilter = (category: 'all' | 'dev' | 'ux' | 'research') => {
  setFilter({ category })
  currentSlideIndex.value = 0
  currentPage.value = 1
}

const getFilterButtonClass = (category: string) => {
  const isActive = currentFilter.category === category
  return [
    'inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500',
    isActive
      ? 'bg-primary-600 text-white border-primary-600 shadow-lg'
      : 'bg-white dark:bg-surface-800 text-text-700 dark:text-text-300 border-border-surface-300 dark:border-border-surface-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600'
  ]
}

const getMobileFilterButtonClass = (category: string) => {
  const isActive = currentFilter.category === category
  return [
    'relative flex flex-col items-center justify-center w-20 h-20 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500',
    isActive
      ? 'bg-primary-600 text-white border-primary-600 shadow-lg scale-105'
      : 'bg-white dark:bg-surface-800 text-text-700 dark:text-text-300 border-border-surface-300 dark:border-border-surface-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600'
  ]
}

const getCountBadgeClass = (category: string) => {
  const isActive = currentFilter.category === category
  return isActive
    ? 'bg-white text-primary-600'
    : 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
}

const scrollLeft = () => {
  if (canScrollLeft.value) {
    currentSlideIndex.value = Math.max(0, currentSlideIndex.value - 1)
  }
}

const scrollRight = () => {
  if (canScrollRight.value) {
    currentSlideIndex.value = Math.min(totalSlides.value - 1, currentSlideIndex.value + 1)
  }
}

const goToSlide = (index: number) => {
  currentSlideIndex.value = Math.max(0, Math.min(totalSlides.value - 1, index))
}

const loadMore = async () => {
  if (hasMore.value && !isLoadingMore.value) {
    isLoadingMore.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    currentPage.value++
    isLoadingMore.value = false
  }
}

const resetFilters = () => {
  resetFilter()
  currentSlideIndex.value = 0
  currentPage.value = 1
}

const retryLoad = () => {
  console.log('Retrying load...')
}

const handleProjectClick = (project: Project) => {
  openProjectModal(project)
}

const handleProjectAction = (link: ProjectLink) => {
  console.log('Project action:', link)
}

const handleFavorite = (project: Project) => {
  console.log('Favorite project:', project.title)
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (modalState.isOpen) return

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      scrollLeft()
      break
    case 'ArrowRight':
      event.preventDefault()
      scrollRight()
      break
    case 'Home':
      event.preventDefault()
      goToSlide(0)
      break
    case 'End':
      event.preventDefault()
      goToSlide(totalSlides.value - 1)
      break
  }
}

// Lifecycle
onMounted(() => {
  updateSlideWidth()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateSlideWidth)
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateSlideWidth)
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
.filter-button {
  white-space: nowrap;
}

.filter-button-mobile {
  flex-shrink: 0;
}

.nav-arrow {
  @apply w-12 h-12 bg-white dark:bg-surface-800 text-text-700 dark:text-text-300 rounded-full shadow-lg border border-border-surface-200 dark:border-border-surface-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500;
}

.nav-arrow:hover {
  transform: translateY(-50%) scale(1.05);
}

.carousel-dot {
  @apply w-3 h-3 rounded-full bg-surface-300 dark:bg-surface-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500;
}

.carousel-dot.active {
  @apply bg-primary-600 scale-125;
}

.carousel-dot:hover {
  @apply bg-primary-400 scale-110;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Focus management */
.filter-button:focus,
.filter-button-mobile:focus {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}
</style>