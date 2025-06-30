<template>
  <div>
    <!-- Home Section -->
    <section
      id="home"
      data-section="home"
      class="h-screen flex items-center justify-center bg-gradient-to-br from-background-50 to-background-100 dark:from-background-900 dark:to-background-800 relative overflow-hidden"
    >
      <!-- Background Image with Effects -->
      <div 
        class="absolute inset-0 bg-no-repeat opacity-30 bg-image-responsive"
        style="
          background-image: url('/img/layout/headset-girl-bg-no-rasterize.svg');
          background-position: -15% center;
          filter: brightness(0) saturate(100%) invert(82%) sepia(68%) saturate(6776%) hue-rotate(293deg) brightness(105%) contrast(101%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
        "
        aria-hidden="true"
      ></div>
      
      <!-- Content overlay -->
      <div class="relative z-10">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-text-900 dark:text-white mb-4">
            TK Stevens
          </h1>
          <p class="text-xl md:text-2xl text-text-600 dark:text-text-300 mb-8 mx-2">
            <span>{{ typewriter.displayText }}</span><span 
              class="typewriter-cursor ml-1 text-primary-600 dark:text-primary-400"
              :class="{ 'opacity-100': typewriter.cursorVisible.value, 'opacity-0': !typewriter.cursorVisible.value }"
            >|</span>
          </p>
          <div class="space-x-4">
            <NuxtLink
              to="#projects"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 focus:outline-none bg-primary-600 text-white shadow-md"
            >
              My Projects
            </NuxtLink>
            <NuxtLink
              to="#contact"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 focus:outline-none bg-gray-100 dark:bg-background-700 text-text-600 dark:text-text-400 hover:bg-primary-100 dark:hover:bg-primary-900"
            >
              Get In Touch
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <SkillXPSection />

    <!-- Projects Section -->
    <ProjectsSection />

    <!-- Contact Section -->
    <ContactSection />

    <!-- Navigation Component -->
    <TheNavigation :show-mobile-nav="true" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useHead } from 'nuxt/app'
import ProjectsSection from '~/components/sections/ProjectsSection.vue'
import SkillXPSection from '~/components/sections/SkillXPSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
import { useTypewriter } from '~/composables/useTypewriter'

// Initialize typewriter animation
const typewriter = useTypewriter({
  baseText: 'Fullstack Engineer specializing in ',
  words: ['Frontend Development', 'Design', 'User Research'],
  typingSpeed: 100,
  erasingSpeed: 65,
  displayDuration: 2000,
  pauseDuration: 500,
  startDelay: 1000
})

// Lifecycle hooks
onMounted(() => {
  typewriter.initializeTypewriter()
})

onUnmounted(() => {
  typewriter.cleanupTypewriter()
})

// SEO and meta tags
useHead({
  title: 'TK Stevens - Fullstack Developer Portfolio',
  meta: [
    { name: 'description', content: 'Fullstack Developer Portfolio showcasing React, Python, and modern web development projects' }
  ]
})
</script>

<style scoped>
/* Typewriter cursor animation */
.typewriter-cursor {
  transition: opacity 0.1s ease-in-out;
  font-weight: 300;
  font-family: 'Courier New', monospace;
}

/* Ensure smooth cursor transitions */
@media (prefers-reduced-motion: reduce) {
  .typewriter-cursor {
    animation: none !important;
    opacity: 1 !important;
  }
}

/* Responsive background positioning for home section */
@media (min-width: 1024px) {
  /* Desktop: Position image to touch left edge */
  .bg-image-responsive {
    background-position: -15% center !important;
  }
}

@media (max-width: 1023px) {
  /* Mobile: Focus on the main image content */
  .bg-image-responsive {
    background-position: 4% center !important;
    background-size: cover !important;
  }
}
</style> 