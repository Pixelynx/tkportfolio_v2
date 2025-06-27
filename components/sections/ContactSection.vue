<template>
  <section
    id="contact"
    data-section="contact"
    class="min-h-screen bg-gradient-to-br from-background-50 to-white dark:from-background-950 dark:to-background-900 flex items-center justify-center"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-4xl font-bold text-text-900 dark:text-white mb-6">
          Get In Touch
        </h2>
        
        <!-- Casual Message -->
        <p class="text-lg md:text-xl text-text-600 dark:text-text-300 max-w-2xl mx-auto leading-relaxed">
          Got a project in mind? Let's chat! I'm always excited to collaborate on 
          interesting projects and explore new opportunities.
        </p>
      </div>

      <!-- Contact Buttons Grid -->
      <div class="contact-buttons-grid grid grid-cols-2 gap-4 max-w-lg mx-auto">
        <!-- Email Button -->
        <a
          :href="emailLink"
          class="contact-button group"
          aria-label="Send me an email"
        >
          <div class="button-content">
            <div class="button-icon">
              <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.94a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="button-text">Email</span>
          </div>
        </a>

        <!-- LinkedIn Button -->
        <a
          :href="linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-button group"
          aria-label="Connect with me on LinkedIn"
        >
          <div class="button-content">
            <div class="button-icon">
              <svg class="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <span class="button-text">LinkedIn</span>
          </div>
        </a>

        <!-- GitHub Button -->
        <a
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-button group"
          aria-label="Check out my GitHub profile"
        >
          <div class="button-content">
            <div class="button-icon">
              <svg class="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <span class="button-text">GitHub</span>
          </div>
        </a>

        <!-- Twitter Button -->
        <a
          :href="twitterUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-button group"
          aria-label="Follow me on Twitter"
        >
          <div class="button-content">
            <div class="button-icon">
              <svg class="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <span class="button-text">Twitter</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from 'nuxt/app'
import { PORTFOLIO_CONFIG } from '~/utils/constants'

// Contact links
const emailLink = computed(() => `mailto:${PORTFOLIO_CONFIG.email}?subject=Work Inquiry - Let's Collaborate!`)
const linkedinUrl = 'https://linkedin.com/in/tjstevens92'
const githubUrl = 'https://github.com/Pixelynx'
const twitterUrl = 'https://twitter.com/tjstevens92'

// SEO Meta
useHead({
  title: 'Contact - TK Stevens | Let\'s Work Together',
  meta: [
    { name: 'description', content: 'Get in touch with TK Stevens for web development projects, collaborations, and opportunities. Let\'s build something amazing together!' }
  ]
})
</script>

<style scoped lang="postcss">
.contact-buttons-grid {
  /* Mobile: Buttons take 80-90% width with centered alignment */
  @apply w-full;
}

.contact-button {
  /* Base button styling */
  @apply relative bg-white dark:bg-surface-800 border border-border-surface-200 dark:border-border-surface-700 rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50;
  
  /* Let grid handle width naturally */
  @apply w-full min-h-[120px] md:min-h-[140px];
  
  /* Hover effects */
  @apply hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10;
}

.contact-button:hover .button-content {
  @apply text-primary-600 dark:text-primary-400;
}

.contact-button:hover .button-icon {
  @apply scale-110;
}

.button-content {
  @apply flex flex-col items-center justify-center text-center h-full transition-colors duration-300;
}

.button-icon {
  @apply text-text-600 dark:text-text-400 mb-3 transition-all duration-300;
}

.button-text {
  @apply text-sm md:text-base font-semibold text-text-700 dark:text-text-300 transition-colors duration-300;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .contact-buttons-grid {
    @apply gap-3 px-4;
  }
  
  .contact-button {
    @apply p-4 min-h-[100px];
  }
  
  .button-icon {
    @apply mb-2;
  }
}

/* Focus states for accessibility */
.contact-button:focus {
  @apply ring-2 ring-primary-500 ring-opacity-50 outline-none;
}

/* Smooth animations */
.contact-button {
  will-change: transform, box-shadow;
}

/* Ensure buttons maintain aspect ratio */
.contact-button {
  aspect-ratio: 1.2 / 1;
}

@media (min-width: 768px) {
  .contact-button {
    aspect-ratio: 1.3 / 1;
  }
}
</style>