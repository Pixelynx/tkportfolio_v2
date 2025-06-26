<template>
  <NuxtLayout name="default">
    <div class="min-h-screen flex items-center justify-center bg-background-50 dark:bg-background-900 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full text-center">
        <!-- Error Icon -->
        <div class="mb-8">
          <div class="mx-auto w-24 h-24 bg-gradient-to-br from-error-500 to-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {{ errorCode }}
          </div>
        </div>

        <!-- Error Message -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-text-900 dark:text-white mb-4">
            {{ errorTitle }}
          </h1>
          <p class="text-lg text-text-600 dark:text-text-400 mb-6">
            {{ errorDescription }}
          </p>
          
          <!-- Additional details for development -->
          <details
            v-if="isDevelopment && error.stack"
            class="text-left bg-surface-100 dark:bg-surface-800 rounded-lg p-4 mb-6"
          >
            <summary class="cursor-pointer text-sm font-medium text-text-700 dark:text-text-300 mb-2">
              Error Details (Development)
            </summary>
            <pre class="text-xs text-text-600 dark:text-text-400 overflow-auto">{{ error.stack }}</pre>
          </details>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <NuxtLink
            to="/"
            class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            Go Home
          </NuxtLink>
          
          <button
            type="button"
            class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-border-neutral-300 dark:border-border-neutral-600 text-base font-medium rounded-md text-text-700 dark:text-text-300 bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            @click="goBack"
          >
            <span class="w-5 h-5 mr-2 flex items-center justify-center" aria-hidden="true">
              ←
            </span>
            Go Back
          </button>
        </div>

        <!-- Contact Link for 404 -->
        <div
          v-if="error.statusCode === 404"
          class="mt-8 pt-8 border-t border-border-neutral-200 dark:border-border-neutral-700"
        >
          <p class="text-sm text-text-600 dark:text-text-400 mb-4">
            Can't find what you're looking for?
          </p>
          <NuxtLink
            to="#contact"
            class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          >
            Get in touch with me
          </NuxtLink>
        </div>

        <!-- Helpful Links -->
        <div class="mt-8">
          <p class="text-sm text-text-500 dark:text-text-500 mb-4">
            Or check out these pages:
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/#home"
              class="text-sm text-text-600 dark:text-text-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/#projects"
              class="text-sm text-text-600 dark:text-text-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            >
              Projects
            </NuxtLink>
            <NuxtLink
              to="/#skills"
              class="text-sm text-text-600 dark:text-text-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            >
              Skills
            </NuxtLink>
            <NuxtLink
              to="/#contact"
              class="text-sm text-text-600 dark:text-text-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            >
              Contact
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { navigateTo, useHead } from 'nuxt/app'

interface ErrorProps {
  error: {
    statusCode: number
    statusMessage: string
    message: string
    stack?: string
  }
}

const props = defineProps<ErrorProps>()

// Get error information
const error = toRef(props, 'error')

// Environment check
const isDevelopment = process.dev

// Computed properties for error messages
const errorCode = computed(() => {
  return error.value?.statusCode || 500
})

const errorTitle = computed(() => {
  const statusCode = errorCode.value
  
  switch (statusCode) {
    case 404:
      return 'Page Not Found'
    case 403:
      return 'Access Forbidden'
    case 500:
      return 'Server Error'
    case 503:
      return 'Service Unavailable'
    default:
      return 'Something Went Wrong'
  }
})

const errorDescription = computed(() => {
  const statusCode = errorCode.value
  
  switch (statusCode) {
    case 404:
      return "Sorry, the page you're looking for doesn't exist. It might have been moved or deleted."
    case 403:
      return "You don't have permission to access this resource."
    case 500:
      return "We're experiencing some technical difficulties. Please try again later."
    case 503:
      return "The service is temporarily unavailable. Please try again in a few moments."
    default:
      return error.value?.message || "We encountered an unexpected error. Please try again."
  }
})

// Methods
const goBack = async () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {

    await navigateTo('/')
  }
}

// SEO meta tags for error page
useHead({
  title: `${errorCode.value} - ${errorTitle.value} | TK Stevens`,
  meta: [
    { name: 'description', content: errorDescription.value },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Log error for debugging (development only)
if (isDevelopment) {
  console.error('Error page rendered:', {
    statusCode: errorCode.value,
    message: error.value?.message,
    stack: error.value?.stack
  })
}
</script>

<style scoped>
/* Custom animations for error page */
.error-container {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus styles for better accessibility */
button:focus,
a:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Hover effects for interactive elements */
button:hover,
a:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

/* Ensure proper spacing for mobile */
@media (max-width: 640px) {
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
}
</style> 