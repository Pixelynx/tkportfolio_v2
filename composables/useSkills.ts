import { ref, computed, type Ref } from 'vue'
import type { Skill, SkillCategory, SkillFilter } from '~/types'
import { SKILLS_DATA, SKILL_CATEGORIES } from '~/utils/constants'

export function useSkills() {
  // Reactive state
  const skills: Ref<Skill[]> = ref(SKILLS_DATA.map(skill => ({ ...skill })))
  const skillCategories: Ref<SkillCategory[]> = ref(SKILL_CATEGORIES.map(cat => ({ ...cat, skills: [] })))
  const activeFilter: Ref<SkillFilter> = ref({
    category: 'all',
    proficiencyMin: 0,
    highlighted: false
  })
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed properties
  const filteredSkills = computed(() => {
    let filtered = [...skills.value]

    // Filter by category
    if (activeFilter.value.category !== 'all') {
      filtered = filtered.filter(skill => skill.category === activeFilter.value.category)
    }

    // Filter by minimum proficiency
    if (activeFilter.value.proficiencyMin && activeFilter.value.proficiencyMin > 0) {
      filtered = filtered.filter(skill => skill.proficiency >= (activeFilter.value.proficiencyMin || 0))
    }

    // Filter by highlighted status
    if (activeFilter.value.highlighted) {
      filtered = filtered.filter(skill => skill.isHighlighted)
    }

    // Sort by order
    return filtered.sort((a, b) => a.order - b.order)
  })

  const skillsByCategory = computed(() => {
    const categories: Record<string, Skill[]> = {}
    
    skills.value.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = []
      }
      categories[skill.category]!.push(skill)
    })

    // Sort skills within each category
    Object.keys(categories).forEach(category => {
      const categorySkills = categories[category]
      if (categorySkills) {
        categorySkills.sort((a, b) => a.order - b.order)
      }
    })

    return categories
  })

  const highlightedSkills = computed(() => {
    return skills.value.filter(skill => skill.isHighlighted).sort((a, b) => a.order - b.order)
  })

  const skillStats = computed(() => {
    const totalSkills = skills.value.length
    const averageProficiency = Math.round(
      skills.value.reduce((sum, skill) => sum + skill.proficiency, 0) / totalSkills
    )
    const highlightedCount = skills.value.filter(skill => skill.isHighlighted).length
    const categoryCounts = skillCategories.value.reduce((acc, category) => {
      if (category.id !== 'all') {
        acc[category.id] = skills.value.filter(skill => skill.category === category.id).length
      }
      return acc
    }, {} as Record<string, number>)

    return {
      totalSkills,
      averageProficiency,
      highlightedCount,
      categoryCounts
    }
  })

  // Methods
  function setActiveFilter(filter: Partial<SkillFilter>) {
    activeFilter.value = { ...activeFilter.value, ...filter }
  }

  function resetFilter() {
    activeFilter.value = {
      category: 'all',
      proficiencyMin: 0,
      highlighted: false
    }
  }

  function getSkillById(id: string): Skill | undefined {
    return skills.value.find(skill => skill.id === id)
  }

  function getSkillsByCategory(category: string): Skill[] {
    if (category === 'all') {
      return skills.value.sort((a, b) => a.order - b.order)
    }
    return skills.value
      .filter(skill => skill.category === category)
      .sort((a, b) => a.order - b.order)
  }

  function getCategoryById(id: string): SkillCategory | undefined {
    return skillCategories.value.find(category => category.id === id)
  }

  function updateSkillProficiency(skillId: string, proficiency: number) {
    const skillIndex = skills.value.findIndex(skill => skill.id === skillId)
    if (skillIndex !== -1 && skills.value[skillIndex]) {
      skills.value[skillIndex].proficiency = Math.max(0, Math.min(100, proficiency))
    }
  }

  function toggleSkillHighlight(skillId: string) {
    const skillIndex = skills.value.findIndex(skill => skill.id === skillId)
    if (skillIndex !== -1 && skills.value[skillIndex]) {
      skills.value[skillIndex].isHighlighted = !skills.value[skillIndex].isHighlighted
    }
  }

  async function loadSkills() {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // This would be the API call
      skills.value = SKILLS_DATA.map(skill => ({ ...skill }))
      skillCategories.value = SKILL_CATEGORIES.map(cat => ({ ...cat, skills: [] }))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load skills'
    } finally {
      isLoading.value = false
    }
  }

  function getSkillColor(skill: Skill): string {
    return skill.color || '#6366F1'
  }

  function getSkillIcon(skill: Skill): string {
    if (skill.iconType === 'emoji') {
      return skill.icon || '⚡'
    }
    return skill.icon || '/placeholder-icon.png'
  }

  function formatProficiency(proficiency: number): string {
    if (proficiency >= 90) return 'Expert'
    if (proficiency >= 75) return 'Advanced'
    if (proficiency >= 60) return 'Intermediate'
    if (proficiency >= 40) return 'Basic'
    return 'Beginner'
  }

  return {
    // State
    skills,
    skillCategories,
    activeFilter,
    isLoading,
    error,

    // Computed
    filteredSkills,
    skillsByCategory,
    highlightedSkills,
    skillStats,

    // Methods
    setActiveFilter,
    resetFilter,
    getSkillById,
    getSkillsByCategory,
    getCategoryById,
    updateSkillProficiency,
    toggleSkillHighlight,
    loadSkills,
    getSkillColor,
    getSkillIcon,
    formatProficiency
  }
} 