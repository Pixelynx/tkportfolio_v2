<template>
  <section
    id="skills"
    data-section="skills"
    class="min-h-screen bg-gradient-to-br from-background-50 to-background-100 dark:from-background-900 dark:to-background-800 py-0"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <!-- Section Header -->
        <div class="flex justify-start">
          <h2 class="text-2xl md:text-4xl font-bold text-text-900 dark:text-white mb-4">
            Skills & Experience
          </h2>
      </div>

      <!-- Mobile Filter Buttons -->
      <div class="lg:hidden mb-8">
        <div class="flex justify-center space-x-4">
          <button
            @click="setActiveView('experience')"
            class="mobile-filter-btn"
            :class="getMobileFilterClass('experience')"
            aria-label="Show experience"
          >
            <span class="text-2xl mb-1">💼</span>
            <span class="text-sm font-medium">Experience</span>
          </button>
          
          <button
            @click="setActiveView('skills')"
            class="mobile-filter-btn"
            :class="getMobileFilterClass('skills')"
            aria-label="Show skills"
          >
            <span class="text-2xl mb-1">⚡</span>
            <span class="text-sm font-medium">Skills</span>
          </button>
        </div>
      </div>

      <!-- Desktop: Side-by-Side Layout -->
      <div class="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
        <!-- Experience Column -->
        <div class="experience-column">
          <div class="sticky top-24">
            <h3 class="text-2xl font-bold text-text-900 dark:text-white mb-6 flex items-center">
              Professional Experience
            </h3>

            <!-- Experience Cards -->
            <div class="space-y-6">
              <ExperienceCard
                v-for="experience in sortedExperiences"
                :key="experience.id"
                :experience="experience"
              />
            </div>
          </div>
        </div>

        <!-- Skills Column -->
        <div class="skills-column">
          <div class="sticky top-24">
            <h3 class="text-2xl font-bold text-text-900 dark:text-white mb-6 flex items-center">
              Technical Skills
            </h3>

            <!-- Skills Card -->
            <div class="skills-container">
              <SkillCard />
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile: Stacked Layout -->
      <div class="lg:hidden">
        <!-- Experience View -->
        <div v-if="activeView === 'experience'" class="mobile-experience">
          <h3 class="text-2xl font-bold text-text-900 dark:text-white mb-6 flex items-center">
            <span class="text-3xl mr-3">💼</span>
            Professional Experience
          </h3>
          
          <!-- Mobile Experience Stats -->
          <div class="stats-row flex justify-center space-x-6 mb-8">
            <div class="stat-item bg-white dark:bg-background-800 rounded-lg p-4 shadow-md text-center">
              <div class="text-2xl font-bold text-primary-600">{{ totalYearsExperience }}+</div>
              <div class="text-sm text-text-600 dark:text-text-400">Years Experience</div>
            </div>
            <div class="stat-item bg-white dark:bg-background-800 rounded-lg p-4 shadow-md text-center">
              <div class="text-2xl font-bold text-primary-600">{{ experiences.length }}</div>
              <div class="text-sm text-text-600 dark:text-text-400">Professional Roles</div>
            </div>
          </div>

          <!-- Mobile Experience Cards -->
          <div class="space-y-6">
            <ExperienceCard
              v-for="experience in sortedExperiences"
              :key="experience.id"
              :experience="experience"
            />
          </div>
        </div>

        <!-- Skills View -->
        <div v-else class="mobile-skills">
          <h3 class="text-2xl font-bold text-text-900 dark:text-white mb-6 flex items-center">
            <span class="text-3xl mr-3">⚡</span>
            Technical Skills
          </h3>



          <!-- Mobile Skills Card -->
          <div class="skills-container">
            <SkillCard />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useExperience } from '~/composables/useExperience'
import SkillCard from '~/components/ui/SkillCard.vue'
import ExperienceCard from '~/components/ui/ExperienceCard.vue'

const {
  experiences,
  sortedExperiences,
  totalYearsExperience,
  loadExperiences
} = useExperience()

// Reactive state
const activeView = ref<'skills' | 'experience'>('experience')

// Methods
function setActiveView(view: 'skills' | 'experience') {
  activeView.value = view
}

function getMobileFilterClass(view: 'skills' | 'experience') {
  const baseClass = 'flex flex-col items-center px-6 py-4 rounded-xl transition-all duration-300'
  const activeClass = 'bg-primary-600 text-white shadow-lg'
  const inactiveClass = 'bg-white dark:bg-background-800 text-text-600 dark:text-text-400 hover:bg-primary-100 dark:hover:bg-primary-900'
  
  return `${baseClass} ${activeView.value === view ? activeClass : inactiveClass}`
}

// Lifecycle
onMounted(async () => {
  await loadExperiences()
})
</script>

<style scoped>
/* Mobile filter buttons */
.mobile-filter-btn {
  @apply flex flex-col items-center px-6 py-4 rounded-xl transition-all duration-300 min-w-[120px];
}

/* Custom scrollbar */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #f472b6 #e5e5e5;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #e5e5e5;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #f472b6;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #FB0078;
}

/* Responsive improvements */
@media (max-width: 640px) {
  .stats-row {
    @apply flex-col space-x-0 space-y-4;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .mobile-filter-btn {
    transition: none !important;
  }
}

/* Focus styles */
.mobile-filter-btn:focus {
  @apply ring-2 ring-primary-500 ring-opacity-50 outline-none;
}
</style> 