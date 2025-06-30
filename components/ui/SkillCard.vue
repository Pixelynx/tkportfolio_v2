<template>
  <div class="skills-card bg-white dark:bg-background-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-background-700 min-h-[500px] flex flex-col">
    <!-- Card Header with Filter Tabs -->
    <div class="card-header mb-6">
      <!-- Internal Filter Tabs with Horizontal Overflow -->
      <div class="flex filter-tabs-container relative">
        <!-- Left Arrow -->
        <button
          v-if="showArrows"
          @click="scrollFilters('left')"
          class="filter-arrow filter-arrow-left absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-background-800 shadow-md rounded-full p-2 hover:bg-gray-100 dark:hover:bg-background-700 transition-all duration-200"
          :class="{ 'opacity-50 cursor-not-allowed': !canScrollLeft }"
          :disabled="!canScrollLeft"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Filter Tabs -->
        <div 
          ref="filterTabsRef"
          class="filter-tabs flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
          :class="{ 'px-12': showArrows, 'px-0': !showArrows }"
          @scroll="updateArrowStates"
        >
          <button
            v-for="category in skillCategories"
            :key="category.id"
            @click="setActiveCategory(category.id)"
            class="filter-tab px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0"
            :class="getTabClass(category.id)"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- Right Arrow -->
        <button
          v-if="showArrows"
          @click="scrollFilters('right')"
          class="filter-arrow filter-arrow-right absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-background-800 shadow-md rounded-full p-2 hover:bg-gray-100 dark:hover:bg-background-700 transition-all duration-200"
          :class="{ 'opacity-50 cursor-not-allowed': !canScrollRight }"
          :disabled="!canScrollRight"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Vertical Bar Graph Grid-->
    <div class="skills-grid flex justify-center items-center flex-1">
      <TransitionGroup name="skill-fade" tag="div" class="flex justify-center items-end gap-4 overflow-x-auto scrollbar-hide pb-2 w-full h-full">
        <div
          v-for="skill in displayedSkills"
          :key="skill.id"
          class="skill-bar-container flex flex-col items-center flex-shrink-0"
          @mouseenter="handleSkillHover(skill.id, true)"
          @mouseleave="handleSkillHover(skill.id, false)"
        >
          <!-- Vertical Bar -->
          <div class="bar-wrapper relative h-64 w-8 bg-gray-200 dark:bg-background-700 rounded-lg overflow-hidden">
            <div 
              class="skill-bar absolute bottom-0 left-0 w-full transition-all duration-500 ease-out rounded-lg"
              :style="{ 
                height: `${getBarHeight(skill.id)}%`,
                backgroundColor: getSkillColor(skill)
              }"
            ></div>
            
            <!-- Percentage Overlay -->
            <div 
              class="percentage-overlay absolute inset-0 flex items-center justify-center text-xs font-bold text-white transition-opacity duration-300"
              :class="{ 'opacity-100': hoveredSkill === skill.id, 'opacity-0': hoveredSkill !== skill.id }"
            >
              {{ skill.proficiency }}%
            </div>
          </div>

          <!-- Skill Icon with Tooltip -->
          <div 
            class="skill-icon mt-3 w-8 h-8 flex items-center justify-center relative cursor-pointer"
            @mouseenter="showTooltip(skill.id)"
            @mouseleave="hideTooltip(skill.id)"
            @click="handleMobileTooltip(skill.id)"
          >
            <img 
              v-if="skill.iconType === 'image' && skill.iconName" 
              :src="getIconPath(skill.iconName)" 
              :alt="skill.name"
              class="w-6 h-6 object-contain"
              @error="handleImageError(skill.id)"
            />
            <div 
              v-else 
              class="w-6 h-6 rounded-full"
              :style="{ backgroundColor: getSkillColor(skill) }"
            ></div>
            
            <!-- Tooltip -->
            <Transition name="tooltip">
              <div
                v-if="tooltipVisible[skill.id]"
                class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-500 dark:text-primary-200 border border-border-primary-50 dark:border-border-primary-600 whitespace-nowrap z-50 shadow-sm"
                role="tooltip"
              >
                {{ skill.name }}
                <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-primary-50 dark:border-t-primary-900/20"></div>
              </div>
            </Transition>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSkills } from '~/composables/useSkills'
import { getIconPath } from '~/config/skills'

// Composables
const { 
  skillCategories, 
  getSkillsByCategory, 
  getSkillColor 
} = useSkills()

// Reactive state
const activeCategory = ref('frontend')
const hoveredSkill = ref<string | null>(null)
const animatedHeights = ref<Record<string, number>>({})
const imageErrors = ref<Set<string>>(new Set())
const filterTabsRef = ref<HTMLElement | null>(null)
const showArrows = ref(false)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const tooltipVisible = ref<Record<string, boolean>>({})
const mobileTooltipTimers = ref<Record<string, NodeJS.Timeout>>({})

// Computed properties
const visibleCategories = computed(() => {
  // Filter out 'all' category and only show categories with skills
  return skillCategories.value.filter(category => {
    if (category.id === 'all') return false
    const categorySkills = getSkillsByCategory(category.id)
    return categorySkills.length > 0
  })
})

const displayedSkills = computed(() => {
  const categorySkills = getSkillsByCategory(activeCategory.value)
  // Limit to 8 skills to prevent overflow
  return categorySkills.slice(0, 8).sort((a, b) => b.proficiency - a.proficiency)
})

// Methods
function setActiveCategory(categoryId: string) {
  activeCategory.value = categoryId
  // Reset animations for new category
  animatedHeights.value = {}
  // Trigger new animations
  setTimeout(animateSkillBars, 100)
}

function getTabClass(categoryId: string) {
  const baseClass = 'hover:scale-105 cursor-pointer focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 focus:outline-none'
  const activeClass = 'bg-primary-600 text-white shadow-md ring-2 ring-primary-500 ring-opacity-50'
  const inactiveClass = 'bg-gray-100 dark:bg-background-700 text-text-600 dark:text-text-400 hover:bg-primary-100 dark:hover:bg-primary-900'
  
  return `${baseClass} ${activeCategory.value === categoryId ? activeClass : inactiveClass}`
}

function scrollFilters(direction: 'left' | 'right') {
  if (!filterTabsRef.value) return
  
  const scrollAmount = 200
  const currentScroll = filterTabsRef.value.scrollLeft
  
  if (direction === 'left') {
    filterTabsRef.value.scrollTo({
      left: currentScroll - scrollAmount,
      behavior: 'smooth'
    })
  } else {
    filterTabsRef.value.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: 'smooth'
    })
  }
}

function updateArrowStates() {
  if (!filterTabsRef.value) return
  
  const { scrollLeft, scrollWidth, clientWidth } = filterTabsRef.value
  canScrollLeft.value = scrollLeft > 0
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 1
}

function checkArrowVisibility() {
  if (!filterTabsRef.value) return
  
  const { scrollWidth, clientWidth } = filterTabsRef.value
  showArrows.value = scrollWidth > clientWidth
  updateArrowStates()
}

function handleSkillHover(skillId: string, hovered: boolean) {
  hoveredSkill.value = hovered ? skillId : null
}

function handleImageError(skillId: string) {
  imageErrors.value.add(skillId)
}

function getBarHeight(skillId: string) {
  return animatedHeights.value[skillId] || 0
}

function animateSkillBars() {
  displayedSkills.value.forEach((skill, index) => {
    setTimeout(() => {
      let current = 0
      const target = skill.proficiency
      const duration = 800
      const steps = 60
      const increment = target / steps
      const stepTime = duration / steps

      const animate = () => {
        current += increment
        if (current >= target) {
          animatedHeights.value[skill.id] = target
        } else {
          animatedHeights.value[skill.id] = current
          setTimeout(animate, stepTime)
        }
      }
      
      animate()
    }, index * 100) // Stagger animations
  })
}

// Tooltip methods
function showTooltip(skillId: string) {
  // Show on desktop (hover)
  if (window.innerWidth >= 1024) {
    tooltipVisible.value[skillId] = true
  }
}

function hideTooltip(skillId: string) {
  // Hide on desktop (hover out)
  if (window.innerWidth >= 1024) {
    tooltipVisible.value[skillId] = false
  }
}

function handleMobileTooltip(skillId: string) {
  // Only handle on mobile (click)
  if (window.innerWidth < 1024) {
    // Clear any existing timer for this skill
    if (mobileTooltipTimers.value[skillId]) {
      clearTimeout(mobileTooltipTimers.value[skillId])
    }
    
    // Show tooltip
    tooltipVisible.value[skillId] = true
    
    // Set timer to hide after 3 seconds
    mobileTooltipTimers.value[skillId] = setTimeout(() => {
      tooltipVisible.value[skillId] = false
      delete mobileTooltipTimers.value[skillId]
    }, 3000)
  }
}

// Lifecycle
onMounted(() => {
  // Initialize with first available category
  const firstCategory = visibleCategories.value[0]
  if (firstCategory) {
    activeCategory.value = firstCategory.id
  }
  
  // Start initial animations
  setTimeout(animateSkillBars, 300)
  
  // Check arrow visibility after component is mounted
  setTimeout(() => {
    checkArrowVisibility()
    // Add resize listener for responsiveness
    window.addEventListener('resize', checkArrowVisibility)
  }, 100)
})

// Cleanup on unmount
onUnmounted(() => {
  window.removeEventListener('resize', checkArrowVisibility)
  // Clear all mobile tooltip timers
  Object.values(mobileTooltipTimers.value).forEach(timer => {
    if (timer) clearTimeout(timer)
  })
})
</script>

<style scoped>
.skills-card {
  @apply transition-all duration-300 hover:shadow-xl;
}

.filter-tab {
  @apply transition-all duration-200 hover:scale-105;
}

.skill-bar-container {
  @apply transition-all duration-200 hover:scale-105;
}

.skill-bar {
  @apply transition-all duration-500 ease-out;
}

/* Tooltip animations */
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(5px);
}

.bar-wrapper:hover .skill-bar {
  @apply brightness-110;
}

.percentage-overlay {
  @apply transition-opacity duration-300;
}

.skill-name {
  @apply transition-all duration-200;
}

.skill-bar-container:hover .skill-name {
  @apply scale-105;
}

/* Transition animations for category switching */
.skill-fade-enter-active,
.skill-fade-leave-active {
  transition: all 0.4s ease;
}

.skill-fade-enter-from,
.skill-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.skill-fade-move {
  transition: transform 0.4s ease;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .skills-card,
  .filter-tab,
  .skill-bar-container,
  .skill-bar,
  .percentage-overlay,
  .skill-name {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
  
  .skill-fade-enter-active,
  .skill-fade-leave-active,
  .skill-fade-move {
    transition: none !important;
  }
}

/* Scrollbar hiding */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Filter arrows */
.filter-arrow {
  @apply transition-all duration-200 hover:scale-110;
}

.filter-arrow:disabled {
  @apply cursor-not-allowed;
}

/* Focus styles */
.filter-tab:focus {
  @apply ring-2 ring-primary-500 ring-opacity-50 outline-none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .skills-grid {
    @apply grid-cols-3;
  }
}

@media (max-width: 640px) {
  .filter-tabs {
    @apply overflow-x-auto;
  }
  
  .filter-tab {
    @apply text-xs px-3 py-1;
  }
}
</style> 