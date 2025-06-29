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
            Fullstack Engineer specializing in Frontend Development
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
import { useHead } from 'nuxt/app'
import ProjectsSection from '~/components/sections/ProjectsSection.vue'
import SkillXPSection from '~/components/sections/SkillXPSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'

// SEO and meta tags
useHead({
  title: 'TK Stevens - Fullstack Developer Portfolio',
  meta: [
    { name: 'description', content: 'Fullstack Developer Portfolio showcasing React, Python, and modern web development projects' }
  ]
})
</script>

<style scoped>
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