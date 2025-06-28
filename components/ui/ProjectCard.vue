<template>
  <article
    class="project-card group relative bg-white dark:bg-surface-800 rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 overflow-hidden border border-border-surface-200 dark:border-border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 flex flex-col"
    :class="cardClasses"
    @click="handleCardClick"
    @keydown.enter="handleCardClick"
    @keydown.space.prevent="handleCardClick"
    tabindex="0"
    role="button"
    :aria-label="`View details for ${project.title}`"
  >
    <!-- Hero Image -->
    <div class="relative aspect-video overflow-hidden">
      <img
        :src="heroImage.url"
        :alt="heroImage.alt"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        :width="heroImage.width || 800"
        :height="heroImage.height || 600"
      />
      
      <!-- Overlay on hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <!-- Project Status -->
          <span
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
            :class="statusColor"
          >
            <span class="w-2 h-2 rounded-full mr-1" :class="statusDotColor"></span>
            {{ formatStatus(project.status) }}
          </span>
          
          <!-- Category Icon -->
          <div class="flex items-center space-x-2">
            <img 
              :src="categoryIcon" 
              :alt="categoryLabel"
              class="w-6 h-6 brightness-0 invert"
            />
          </div>
        </div>
      </div>

      <!-- Featured Badge -->
      <!-- <div
        v-if="project.featured"
        class="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
      >
        ⭐ Featured
      </div> -->
    </div>

    <!-- Content -->
    <div class="p-6 flex-1 flex flex-col">
      <!-- Main Content (grows to fill space) -->
      <div class="flex-1">
        <!-- Header -->
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-xl font-bold text-text-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-1">
            {{ project.title }}
          </h3>
          <button
            type="button"
            class="ml-2 p-1 rounded-full text-text-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            @click.stop="$emit('favorite', project)"
            :aria-label="`Add ${project.title} to favorites`"
          >
          </button>
        </div>

        <!-- Description -->
        <p class="text-text-600 dark:text-text-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {{ project.shortDescription }}
        </p>

        <!-- Technologies -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tech in displayTechnologies"
            :key="tech"
            class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-surface-100 dark:bg-surface-700 text-text-700 dark:text-text-300 border border-border-surface-300 dark:border-border-surface-600"
          >
            {{ tech }}
          </span>
          <span
            v-if="project.technologies.length > (maxTechnologies || 3)"
            class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-border-primary-200 dark:border-border-primary-800"
          >
            +{{ project.technologies.length - (maxTechnologies || 3) }} more
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between">
        <div class="flex space-x-2">
          <button
            v-for="link in displayLinks"
            :key="link.type"
            type="button"
            class="action-button"
            :class="getActionButtonClass(link.type)"
            @click.stop="handleActionClick(link)"
            :aria-label="link.label"
          >
            <span class="text-sm" aria-hidden="true">{{ link.icon }}</span>
            <span class="text-xs font-medium">{{ link.label }}</span>
          </button>
        </div>

        <!-- Details Button -->
        <button
          v-if="!compact"
          type="button"
          class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-border-primary-200 dark:border-border-primary-800 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          @click.stop="$emit('details', project)"
        >
          Details
          <span class="ml-1" aria-hidden="true">→</span>
        </button>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="absolute inset-0 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm flex items-center justify-center"
    >
      <div class="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project, ProjectLink } from '~/types'
import { useProjects } from '~/composables/useProjects'

interface Props {
  project: Project
  loading?: boolean
  compact?: boolean
  maxTechnologies?: number
  maxLinks?: number
}

interface Emits {
  (e: 'click', project: Project): void
  (e: 'details', project: Project): void
  (e: 'action', link: ProjectLink): void
  (e: 'favorite', project: Project): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  compact: false,
  maxTechnologies: 3,
  maxLinks: 3
})

const emit = defineEmits<Emits>()
const { getStatusColor, getCategoryIcon, getCategoryLabel } = useProjects()

// Computed properties
const heroImage = computed(() => {
  return props.project.images.find(img => img.type === 'hero') || props.project.images[0] || {
    url: '/images/placeholder-project.svg',
    alt: 'Project image',
    width: 800,
    height: 600
  }
})

const cardClasses = computed(() => [
  {
    'hover:-translate-y-1 cursor-pointer': !props.loading,
    'opacity-75 pointer-events-none': props.loading,
    'h-[28rem]': props.compact,
    'h-[26rem]': !props.compact
  }
])

const statusColor = computed(() => getStatusColor(props.project.status))

const statusDotColor = computed(() => {
  const statusDots = {
    'completed': 'bg-success-500',
    'in-progress': 'bg-warning-500',
    'planning': 'bg-primary-500',
    'archived': 'bg-text-400'
  }
  return statusDots[props.project.status] || statusDots.completed
})

const categoryIcon = computed(() => getCategoryIcon(props.project.category))
const categoryLabel = computed(() => getCategoryLabel(props.project.category))

const displayTechnologies = computed(() => {
  return props.project.technologies.slice(0, props.maxTechnologies)
})

const displayLinks = computed(() => {
  return props.project.links.slice(0, props.maxLinks)
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

const getActionButtonClass = (type: ProjectLink['type']): string => {
  const buttonClasses = {
    demo: 'text-success-600 dark:text-success-400 hover:bg-success-50 dark:hover:bg-success-900/20 border-border-success-200 dark:border-border-success-800',
    code: 'text-text-600 dark:text-text-400 hover:bg-surface-50 dark:hover:bg-surface-700 border-border-surface-300 dark:border-border-surface-600',
    research: 'text-warning-600 dark:text-warning-400 hover:bg-warning-50 dark:hover:bg-warning-900/20 border-border-warning-200 dark:border-border-warning-800',
    design: 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-900/20 border-border-secondary-200 dark:border-border-secondary-800',
    documentation: 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 border-border-primary-200 dark:border-border-primary-800'
  }
  return buttonClasses[type] || buttonClasses.code
}

const handleCardClick = () => {
  if (!props.loading) {
    emit('click', props.project)
  }
}

const handleActionClick = (link: ProjectLink) => {
  emit('action', link)
  
  // Open external links
  if (link.url.startsWith('http')) {
    window.open(link.url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
.project-card {
  background: linear-gradient(145deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(255, 255, 255, 0.95) 100%
  );
}

.dark .project-card {
  background: linear-gradient(145deg, 
    rgba(36, 36, 36, 0.9) 0%, 
    rgba(21, 21, 21, 0.95) 100%
  );
}

.action-button {
  @apply inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hover animations */
.project-card:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.project-card:focus {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Performance optimizations */
.project-card {
  contain: layout style paint;
  will-change: transform, box-shadow;
}

.project-card img {
  will-change: transform;
}

/* Smooth transitions */
.project-card * {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style> 