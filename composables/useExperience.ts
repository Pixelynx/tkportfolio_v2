import { ref, computed, type Ref } from 'vue'
import type { Experience } from '~/types'
import { EXPERIENCE_DATA } from '~/utils/constants'

export function useExperience() {
  // Reactive state
  const experiences: Ref<Experience[]> = ref(EXPERIENCE_DATA.map(exp => ({ ...exp })))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed properties
  const sortedExperiences = computed(() => {
    return experiences.value.sort((a, b) => a.order - b.order)
  })

  const currentExperience = computed(() => {
    return experiences.value.find(exp => exp.current)
  })

  const pastExperiences = computed(() => {
    return experiences.value.filter(exp => !exp.current).sort((a, b) => a.order - b.order)
  })

  const totalYearsExperience = computed(() => {
    let totalMonths = 0
    
    experiences.value.forEach(exp => {
      const startDate = new Date(exp.startDate)
      const endDate = exp.endDate ? new Date(exp.endDate) : new Date()
      
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
      totalMonths += diffMonths
    })
    
    return Math.floor(totalMonths / 12)
  })

  // Methods
  function getExperienceById(id: string): Experience | undefined {
    return experiences.value.find(exp => exp.id === id)
  }

  async function loadExperiences() {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // In a real app, this would be an API call
      experiences.value = EXPERIENCE_DATA.map(exp => ({ ...exp }))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load experiences'
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    experiences,
    isLoading,
    error,

    // Computed
    sortedExperiences,
    currentExperience,
    pastExperiences,
    totalYearsExperience,

    // Methods
    getExperienceById,
    loadExperiences
  }
} 