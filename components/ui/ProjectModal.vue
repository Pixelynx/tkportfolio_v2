<template>
  <Teleport to="body">
    <div
      v-if="project"
      class="dark fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`modal-title-${project.id}`"
      @keydown.esc="$emit('close')"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        @click="$emit('close')"
      ></div>

      <!-- Modal Container -->
      <div class="relative flex items-center justify-center min-h-screen p-4" @click="$emit('close')">
        <div
          class="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-surface-900 rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
          @click.stop
        >
          <!-- Close Button -->
          <button
            type="button"
            class="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            @click="$emit('close')"
            aria-label="Close modal"
          >
            <span class="text-xl" aria-hidden="true">✕</span>
          </button>

          <!-- Content Container -->
          <div class="flex flex-col lg:flex-row h-full max-h-[90vh]">
            <!-- Image Gallery Section -->
            <div class="lg:w-1/2 bg-background-900 relative">
              <!-- Main Image -->
              <div class="relative h-64 lg:h-full">
                <img
                  :src="currentImage?.url || '/images/placeholder-project.svg'"
                  :alt="currentImage?.alt || 'Project image'"
                  class="w-full h-full object-cover"
                  :width="currentImage?.width || 800"
                  :height="currentImage?.height || 600"
                />

                <!-- Image Navigation -->
                <div
                  v-if="project.images.length > 1"
                  class="absolute inset-0 flex items-center justify-between p-4"
                >
                  <button
                    type="button"
                    class="image-nav-button"
                    :disabled="currentImageIndex === 0"
                    @click="$emit('previousImage')"
                    aria-label="Previous image"
                  >
                    <span class="text-2xl" aria-hidden="true">←</span>
                  </button>

                  <button
                    type="button"
                    class="image-nav-button"
                    :disabled="currentImageIndex === project.images.length - 1"
                    @click="$emit('nextImage')"
                    aria-label="Next image"
                  >
                    <span class="text-2xl" aria-hidden="true">→</span>
                  </button>
                </div>

                <!-- Image Counter -->
                <div
                  v-if="project.images.length > 1"
                  class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ currentImageIndex + 1 }} / {{ project.images.length }}
                </div>
              </div>

              <!-- Thumbnail Strip -->
              <div
                v-if="project.images.length > 1"
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
              >
                <div class="flex space-x-2 overflow-x-auto scrollbar-hide">
                  <button
                    v-for="(image, index) in project.images"
                    :key="image.id"
                    type="button"
                    class="thumbnail"
                    :class="{ 'active': index === currentImageIndex }"
                    @click="$emit('setImage', index)"
                    :aria-label="`View image ${index + 1}: ${image.alt}`"
                  >
                    <img
                      :src="image.url"
                      :alt="image.alt"
                      class="w-full h-full object-cover"
                    />
                  </button>
                </div>
              </div>
            </div>

            <!-- Content Section -->
            <div class="lg:w-1/2 flex flex-col overflow-hidden">
              <div class="overflow-y-auto p-6 lg:p-8 space-y-6">
                <!-- Header -->
                <div class="space-y-4">
                  <div class="flex items-start justify-between">
                    <div class="flex items-center space-x-3">
                      <img 
                        :src="categoryIcon" 
                        :alt="categoryLabel"
                        class="w-8 h-8 brightness-0 invert"
                      />
                      <div>
                        <h2
                          :id="`modal-title-${project.id}`"
                          class="text-2xl lg:text-3xl font-bold text-text-900 dark:text-white"
                        >
                          {{ project.title }}
                        </h2>
                        <p class="text-text-600 dark:text-text-400 text-sm">
                          {{ categoryLabel }} • {{ formatDate(project.dateCreated) }}
                        </p>
                      </div>
                    </div>

                    <!-- Status & Featured Badge -->
                    <div class="flex flex-col items-end space-y-2">
                      <span
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        :class="statusColor"
                      >
                        <span class="w-2 h-2 rounded-full mr-2" :class="statusDotColor"></span>
                        {{ formatStatus(project.status) }}
                      </span>
                      <!-- <span
                        v-if="project.featured"
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-500 text-white"
                      >
                        ⭐ Featured
                      </span> -->
                    </div>
                  </div>

                  <!-- Description -->
                  <p class="text-text-700 dark:text-text-300 leading-relaxed">
                    {{ project.description }}
                  </p>
                </div>

                <!-- Project Links -->
                <div v-if="project.links.length > 0" class="space-y-3">
                  <h3 class="text-lg font-semibold text-text-900 dark:text-white">
                    Project Links
                  </h3>
                  <div class="flex flex-wrap gap-3">
                    <a
                      v-for="link in project.links"
                      :key="link.type"
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="project-link"
                      :class="getLinkClass(link.type)"
                    >
                      <span class="text-lg" aria-hidden="true">{{ link.icon }}</span>
                      <span class="font-medium">{{ link.label }}</span>
                    </a>
                  </div>
                </div>

                <!-- Technologies -->
                <div class="space-y-3">
                  <h3 class="text-lg font-semibold text-text-900 dark:text-white">
                    Technologies Used
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tech in project.technologies"
                      :key="tech"
                      class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-surface-100 dark:bg-surface-800 text-text-700 dark:text-text-300 border border-border-surface-300 dark:border-border-surface-600"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <!-- Project Details -->
                <div class="space-y-6">
                  <!-- Overview -->
                  <div class="space-y-3">
                    <h3 class="text-lg font-semibold text-text-900 dark:text-white">
                      Overview
                    </h3>
                    <p class="text-text-700 dark:text-text-300 leading-relaxed">
                      {{ project.details.overview }}
                    </p>
                  </div>

                  <!-- Features -->
                  <div v-if="project.details.features.length > 0" class="space-y-3">
                    <h3 class="text-lg font-semibold text-text-900 dark:text-white">
                      Key Features
                    </h3>
                    <ul class="space-y-2">
                      <li
                        v-for="feature in project.details.features"
                        :key="feature"
                        class="flex items-start space-x-2 text-text-700 dark:text-text-300"
                      >
                        <span class="text-primary-500 mt-1.5 text-xs" aria-hidden="true">●</span>
                        <span>{{ feature }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Challenges & Solutions -->
                  <div class="grid md:grid-cols-2 gap-6">
                    <div v-if="project.details.challenges.length > 0" class="space-y-3">
                      <h3 class="text-lg font-semibold text-text-900 dark:text-white">
                        Challenges
                      </h3>
                      <ul class="space-y-2">
                        <li
                          v-for="challenge in project.details.challenges"
                          :key="challenge"
                          class="flex items-start space-x-2 text-text-700 dark:text-text-300"
                        >
                          <span class="text-warning-500 mt-1.5 text-xs" aria-hidden="true">⚠</span>
                          <span>{{ challenge }}</span>
                        </li>
                      </ul>
                    </div>

                    <div v-if="project.details.solutions.length > 0" class="space-y-3">
                      <h3 class="text-lg font-semibold text-text-900 dark:text-white">
                        Solutions
                      </h3>
                      <ul class="space-y-2">
                        <li
                          v-for="solution in project.details.solutions"
                          :key="solution"
                          class="flex items-start space-x-2 text-text-700 dark:text-text-300"
                        >
                          <span class="text-success-500 mt-1.5 text-xs" aria-hidden="true">✓</span>
                          <span>{{ solution }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Architecture -->
                  <div v-if="project.details.architecture" class="space-y-3">
                    <h3 class="text-lg font-semibold text-text-900 dark:text-white">
                      Architecture
                    </h3>
                    <p class="text-text-700 dark:text-text-300 leading-relaxed">
                      {{ project.details.architecture }}
                    </p>
                  </div>

                  <!-- Lessons Learned -->
                  <div v-if="project.details.lessons.length > 0" class="space-y-3">
                    <h3 class="text-lg font-semibold text-text-900 dark:text-white">
                      Lessons Learned
                    </h3>
                    <ul class="space-y-2">
                      <li
                        v-for="lesson in project.details.lessons"
                        :key="lesson"
                        class="flex items-start space-x-2 text-text-700 dark:text-text-300"
                      >
                        <span class="text-primary-500 mt-1.5 text-xs" aria-hidden="true">💡</span>
                        <span>{{ lesson }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Next Steps -->
                  <div v-if="project.details.nextSteps && project.details.nextSteps.length > 0" class="space-y-3">
                    <h3 class="text-lg font-semibold text-text-900 dark:text-white">
                      Next Steps
                    </h3>
                    <ul class="space-y-2">
                      <li
                        v-for="step in project.details.nextSteps"
                        :key="step"
                        class="flex items-start space-x-2 text-text-700 dark:text-text-300"
                      >
                        <span class="text-secondary-500 mt-1.5 text-xs" aria-hidden="true">→</span>
                        <span>{{ step }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project, ProjectLink } from '~/types'
import { useProjects } from '~/composables/useProjects'

interface Props {
  project: Project | null
  currentImageIndex: number
}

interface Emits {
  (e: 'close'): void
  (e: 'nextImage'): void
  (e: 'previousImage'): void
  (e: 'setImage', index: number): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const { getStatusColor, getCategoryIcon, getCategoryLabel } = useProjects()

// Computed
const currentImage = computed(() => {
  if (!props.project || !props.project.images.length) {
    return {
      url: '/images/placeholder-project.svg',
      alt: 'Project image',
      width: 800,
      height: 600
    }
  }
  return props.project.images[props.currentImageIndex] || props.project.images[0]
})

const statusColor = computed(() => {
  return props.project ? getStatusColor(props.project.status) : ''
})

const statusDotColor = computed(() => {
  if (!props.project) return ''
  const statusDots = {
    'completed': 'bg-success-500',
    'in-progress': 'bg-warning-500',
    'planning': 'bg-primary-500',
    'archived': 'bg-text-400'
  }
  return statusDots[props.project.status] || statusDots.completed
})

const categoryIcon = computed(() => {
  return props.project ? getCategoryIcon(props.project.category) : '/img/icons/svg/code-square-filled-svgrepo-com.svg'
})

const categoryLabel = computed(() => {
  return props.project ? getCategoryLabel(props.project.category) : ''
})

// Methods
const formatStatus = (status: Project['status']): string => {
  const statusLabels = {
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'planning': 'Planning',
    'archived': 'Archived'
  }
  return statusLabels[status] || status
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long'
  })
}

const getLinkClass = (type: ProjectLink['type']): string => {
  const linkClasses = {
    demo: 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/20 border-border-success-200 dark:border-border-success-800 hover:bg-success-100 dark:hover:bg-success-900/40',
    code: 'text-text-600 dark:text-text-400 bg-surface-50 dark:bg-surface-700 border-border-surface-300 dark:border-border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-600',
    research: 'text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-900/20 border-border-warning-200 dark:border-border-warning-800 hover:bg-warning-100 dark:hover:bg-warning-900/40',
    design: 'text-secondary-600 dark:text-secondary-400 bg-secondary-50 dark:bg-secondary-900/20 border-border-secondary-200 dark:border-border-secondary-800 hover:bg-secondary-100 dark:hover:bg-secondary-900/40',
    documentation: 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border-border-primary-200 dark:border-border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/40'
  }
  return linkClasses[type] || linkClasses.code
}
</script>

<style scoped>
.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.image-nav-button {
  @apply w-12 h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed;
}

.thumbnail {
  @apply w-16 h-12 rounded-lg overflow-hidden border-2 border-transparent hover:border-white/60 focus:border-white focus:outline-none transition-all duration-200;
}

.thumbnail.active {
  @apply border-white ring-2 ring-white/40;
}

.project-link {
  @apply inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Focus management */
.project-link:focus,
.image-nav-button:focus,
.thumbnail:focus {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Performance optimizations */
.modal-container {
  contain: layout style paint;
}

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style> 