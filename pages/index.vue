<template>
  <div>
    <!-- Home Section -->
    <section
      id="home"
      data-section="home"
      class="h-screen flex items-center justify-center bg-gradient-to-br from-background-50 to-background-100 dark:from-background-900 dark:to-background-800"
    >
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-text-900 dark:text-white mb-4">
          TK Stevens
        </h1>
        <p class="text-xl md:text-2xl text-text-600 dark:text-text-300 mb-8">
          Fullstack Engineer specializing in Frontend Development
        </p>
        <div class="space-x-4">
          <NuxtLink
            to="#projects"
            class="bg-secondary-800 hover:bg-secondary-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            My Projects
          </NuxtLink>
          <NuxtLink
            to="#contact"
            class="border border-border-neutral-300 dark:border-border-primary-950 text-text-950 dark:text-text-300 hover:bg-surface-50 dark:hover:bg-tertiary-900 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Get In Touch
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <SkillXPSection />

    <!-- Projects Section -->
    <ProjectsSection />

    <!-- Contact Section -->
    <section
      id="contact"
      data-section="contact"
      class="h-screen bg-gradient-to-br from-background-50 to-white dark:from-background-950 dark:to-background-900"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div class="flex justify-start">
          <h2 class="text-2xl md:text-4xl font-bold text-text-900 dark:text-white mb-4">
            Get In Touch
          </h2>
        </div>
        <p class="text-lg text-text-600 dark:text-text-300">
          
        </p>
      </div>
    </section>

    <!-- Navigation Component -->
    <TheNavigation :show-mobile-nav="true" />
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app'
import ProjectsSection from '~/components/sections/ProjectsSection.vue'
import SkillXPSection from '~/components/sections/SkillXPSection.vue'

// SEO and meta tags
useHead({
  title: 'TK Stevens - Fullstack Developer Portfolio',
  meta: [
    { name: 'description', content: 'Fullstack Developer Portfolio showcasing React, Python, and modern web development projects' }
  ]
})
</script> 