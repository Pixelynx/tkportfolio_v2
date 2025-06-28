<template>
  <section id="skills" data-section="skills"
    class="min-h-screen bg-gradient-to-br from-background-50 to-background-100 dark:from-background-900 dark:to-background-800 pt-0 pb-2">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <!-- Header with Filters -->
      <div class="flex items-center justify-between mb-8">
        <!-- Title -->
        <div class="flex justify-start">
          <h2 class="text-2xl md:text-4xl font-bold text-text-900 dark:text-white">
            Skills & Experience
          </h2>
        </div>

        <!-- Filter Buttons - Mobile -->
        <div class="lg:hidden flex items-center">
          <div class="flex space-x-2">
            <button
              @click="setActiveView('experience')"
              type="button"
              class="mobile-filter-button"
              :class="getMobileFilterButtonClass('experience')"
              aria-label="Show experience"
              :aria-pressed="activeView === 'experience'"
            >
              <img 
                :src="getIconSrc('experience')" 
                alt="Experience" 
                class="w-4 h-4"
                :class="getIconColorClass('experience')"
              />
            </button>

            <button
              @click="setActiveView('skills')"
              type="button"
              class="mobile-filter-button"
              :class="getMobileFilterButtonClass('skills')"
              aria-label="Show skills"
              :aria-pressed="activeView === 'skills'"
            >
              <img 
                :src="getIconSrc('skills')" 
                alt="Skills" 
                class="w-4 h-4"
                :class="getIconColorClass('skills')"
              />
            </button>
          </div>
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
            Professional Experience
          </h3>

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
import { getIconPath } from '~/config/skills'
import SkillCard from '~/components/ui/SkillCard.vue'
import ExperienceCard from '~/components/ui/ExperienceCard.vue'

const {
  sortedExperiences,
  loadExperiences
} = useExperience()

// Reactive state
const activeView = ref<'skills' | 'experience'>('experience')

// Methods
function setActiveView(view: 'skills' | 'experience') {
  activeView.value = view
}

function getMobileFilterButtonClass(view: 'skills' | 'experience') {
  const isActive = activeView.value === view
  return [
    'relative flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500',
    isActive
      ? 'bg-primary-600 text-white border-primary-600 shadow-md'
      : 'bg-white dark:bg-surface-800 text-text-700 dark:text-text-300 border-border-surface-300 dark:border-border-surface-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600'
  ]
}

function getIconColorClass(view: 'skills' | 'experience') {
  const isActive = activeView.value === view
  return isActive
    ? 'brightness-0 invert' // Makes icon white when active
    : 'opacity-70 dark:brightness-0 dark:invert dark:opacity-70' // Adapts to dark mode when inactive
}

function getIconSrc(view: 'skills' | 'experience') {
  const iconNames = {
    experience: 'rectangular-briefcase-svgrepo-com.svg',
    skills: 'skills-svgrepo-com.svg'
  }
  return getIconPath(iconNames[view])
}

// Lifecycle
onMounted(async () => {
  await loadExperiences()
})
</script>

<style scoped>
.mobile-filter-button {
  flex-shrink: 0;
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

/* Focus styles */
.mobile-filter-button:focus {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}
</style>