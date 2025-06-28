<template>
  <div 
    class="experience-card group relative bg-white dark:bg-background-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-background-700 min-h-[500px] max-h-[500px] overflow-y-auto scroll-fade"
    @mouseenter="handleHover(true)"
    @mouseleave="handleHover(false)"
  >
    <!-- Experience Header -->
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <!-- Job Title -->
        <h3 class="text-xl font-bold text-text-900 dark:text-white group-hover:text-primary-600 transition-colors duration-300">
          {{ experience.title }}
        </h3>
        
        <!-- Company and Location -->
        <div class="flex items-center space-x-2 mt-2">
          <a 
            v-if="experience.companyUrl"
            :href="experience.companyUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="company-link text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            {{ experience.company }}
          </a>
          <span 
            v-else
            class="text-lg font-semibold text-text-700 dark:text-text-300"
          >
            {{ experience.company }}
          </span>
          
          <span class="text-text-500 dark:text-text-500">•</span>
          
          <span class="text-md text-text-600 dark:text-text-400">
            {{ experience.location }}
          </span>
        </div>

        <!-- Duration -->
        <div class="flex items-center space-x-3 mt-3">
          <span 
            v-if="!experience.current"
            class="px-0 py-0"
          >
            <!-- NOTE: Consider adding YEAR, MONTH duration-->
          </span>
          
          <span 
            v-else
            class="current-badge px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md animate-pulse"
          >
            Current
          </span>
        </div>
      </div>

      <!-- Company Logo -->
      <div 
        v-if="experience.companyLogo"
        class="company-logo w-16 h-16 rounded-lg bg-white dark:bg-background-700 p-2 shadow-sm transition-transform duration-300 group-hover:scale-105"
      >
        <img 
          :src="experience.companyLogo" 
          :alt="`${experience.company} logo`"
          class="w-full h-full object-contain"
          @error="handleLogoError"
        />
      </div>
    </div>

    <!-- Description -->
    <div class="description-section mb-6">
      <ul class="space-y-2">
        <li 
          v-for="(desc, index) in experience.description" 
          :key="index"
          class="flex items-start space-x-3 text-sm text-text-700 dark:text-text-300"
        >
          <span class="flex-shrink-0 w-1.5 h-1.5 bg-primary-500 rounded-full mt-2"></span>
          <span>{{ desc }}</span>
        </li>
      </ul>
    </div>

    <!-- Achievements Section -->
    <div v-if="experience.achievements.length > 0" class="achievements-section mb-6">
      <h4 class="text-sm font-semibold text-text-800 dark:text-text-200 mb-3 flex items-center">
        <svg class="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Key Achievements
      </h4>
      <ul class="space-y-2">
        <li 
          v-for="(achievement, index) in experience.achievements" 
          :key="index"
          class="flex items-start space-x-3 text-sm text-text-700 dark:text-text-300"
        >
          <span class="flex-shrink-0 w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></span>
          <span>{{ achievement }}</span>
        </li>
      </ul>
    </div>

    <!-- Technologies -->
    <div class="technologies-section">
      <h4 class="text-sm font-semibold text-text-800 dark:text-text-200 mb-3 flex items-center">
        <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        Technologies Used
      </h4>
      
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tech in experience.technologies" 
          :key="tech"
          class="tech-tag px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors duration-200"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <!-- Hover Overlay -->
    <div 
      class="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Experience } from '~/types'

interface Props {
  experience: Experience
}

interface Emits {
  (e: 'expand', experience: Experience): void
}

defineProps<Props>()
defineEmits<Emits>()


// Reactive state
const isHovered = ref(false)
const logoError = ref(false)

// Methods
function handleHover(hovered: boolean) {
  isHovered.value = hovered
}

function handleLogoError() {
  logoError.value = true
}
</script>

<style scoped>
.experience-card {
  @apply transform hover:-translate-y-2;
}

.company-link {
  @apply no-underline hover:underline;
}

.tech-tag {
  @apply transition-all duration-200 hover:scale-105;
}

.expand-btn {
  @apply transition-all duration-200;
}

/* Smooth animations for expanding content */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .experience-card,
  .company-logo,
  .expand-btn,
  .tech-tag {
    transition: none !important;
    animation: none !important;
  }
  
  .current-badge {
    animation: none !important;
  }
}

/* Focus styles for accessibility */
.experience-card:focus-within {
  @apply ring-2 ring-primary-500 ring-opacity-50;
}

.expand-btn:focus {
  @apply ring-2 ring-primary-500 ring-opacity-50 outline-none;
}

/* Print styles */
@media print {
  .experience-card {
    @apply opacity-100 shadow-none border border-gray-300;
  }
  
  .expand-btn,
  .hover\\:opacity-100 {
    @apply hidden;
  }
}



/* Responsive adjustments for min-height */
@media (max-width: 768px) {
  .experience-card {
    @apply min-h-[400px];
  }
}

@media (max-width: 640px) {
  .experience-card {
    @apply min-h-[350px];
  }
}
</style> 