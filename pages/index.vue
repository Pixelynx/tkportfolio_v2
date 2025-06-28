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