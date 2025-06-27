import { ref, computed, reactive, readonly } from 'vue'
import type { Project, ProjectFilter, ProjectModalState } from '~/types'

// TODO: Update
// Project data
const MOCK_PROJECTS: Project[] = [
  {
    id: 'resumate',
    title: 'Resumate',
    description: 'AI-powered job matching platform that analyzes resumes against job descriptions to provide compatibility scores and improvement suggestions.',
    shortDescription: 'AI job matching platform with resume analysis',
    category: 'dev',
    status: 'in-progress',
    featured: true,
    technologies: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'OpenAI'],
    images: [
      {
        id: 'res-hero',
        url: '/images/placeholder-project.svg',
        alt: 'Resumate Dashboard',
        type: 'hero',
        width: 800,
        height: 600
      },
      {
        id: 'res-builder',
        url: '/images/placeholder-project.svg',
        alt: 'Resume Builder Interface',
        type: 'gallery',
        width: 800,
        height: 600
      },
      {
        id: 'res-jobfit',
        url: '/images/placeholder-project.svg',
        alt: 'Resume Job Fit Score',
        type: 'gallery',
        width: 800,
        height: 600
      }
    ],
    links: [
      {
        type: 'demo',
        url: 'https://Resumate-demo.com',
        label: 'Demo',
        icon: '🚀' // temp
      },
      {
        type: 'code',
        url: 'https://github.com/tkstevens/Resumate',
        label: 'GitHub',
        icon: '💻' // temp
      }
    ],
    details: {
      overview: 'Resumate revolutionizes job searching by using AI to analyze resume compatibility with job descriptions, providing actionable insights for career advancement.',
      challenges: [
        'Processing complex job descriptions with varying formats',
        'Accurately scoring resume compatibility',
        'Providing meaningful improvement suggestions'
      ],
      solutions: [
        'Implemented NLP models for text analysis',
        'Created weighted scoring algorithm',
        'Built intelligent recommendation engine'
      ],
      architecture: 'Microservices architecture with React frontend, Express backend, and PostgreSQL database',
      features: [
        'AI-powered compatibility scoring',
        'Resume optimization suggestions',
        'Job description analysis',
        'Skills gap identification',
        'Career progression tracking'
      ],
      lessons: [
        'Advanced machine learning implementation',
        'Large-scale data processing',
        'User experience optimization'
      ]
    },
    dateCreated: '2024-01-15',
    dateCompleted: '',
    order: 1
  },
  {
    id: 'spotivibe',
    title: 'SpotiVibe',
    description: 'Intelligent resume builder with ATS optimization, real-time collaboration, and industry-specific templates.',
    shortDescription: 'Smart resume builder with ATS optimization',
    category: 'dev',
    status: 'in-progress',
    featured: true,
    technologies: ['React.js', 'Python', 'Spotipy API', 'Genius API', 'NLP'],
    images: [
      {
        id: 'spot-home',
        url: '/images/placeholder-project.svg',
        alt: 'SpotiVibe Homepage',
        type: 'hero',
        width: 800,
        height: 600
      },
      {
        id: 'spot-vibe-result',
        url: '/images/placeholder-project.svg',
        alt: 'SpotiVibe Vibe Search Results',
        type: 'gallery',
        width: 800,
        height: 600
      }
    ],
    links: [
      {
        type: 'demo',
        url: 'https://SpotiVibe-app.com',
        label: 'Demo',
        icon: '📝' // temp
      },
      {
        type: 'code',
        url: 'https://github.com/tkstevens/SpotiVibe',
        label: 'GitHub',
        icon: '💻' // temp
      }
    ],
    details: {
      overview: 'SpotiVibe allows for users to find songs based off searching for a phrase expressing a vibe.',
      challenges: [
        'Placeholder'
      ],
      solutions: [
        'Placeholder'
      ],
      features: [
        'Placeholder'
      ],
      lessons: [
        'Placeholder'
      ]
    },
    dateCreated: '2023-08-10',
    dateCompleted: '',
    order: 2
  },
  {
    id: 'pfn-ecommerce',
    title: 'PFN UX Redesign',
    description: 'Complete UX overhaul of PFN e-commerce platform.',
    shortDescription: 'PFN platform UX redesign',
    category: 'ux',
    status: 'planning',
    featured: true,
    technologies: ['Figma', ],
    images: [
      {
        id: 'pfn-before-after',
        url: '/images/placeholder-project.svg',
        alt: 'Before and After Comparison',
        type: 'hero',
        width: 800,
        height: 600
      }
    ],
    links: [
      {
        type: 'design',
        url: 'https://figma.com/ecommerce-redesign',
        label: 'Designs',
        icon: '🎨' // temp
      },
      {
        type: 'research',
        url: '/research/ecommerce-ux-study.pdf',
        label: 'Research',
        icon: '📊' // temp
      }
    ],
    details: {
      overview: 'Implementing UX redesign of PFN platform.',
      challenges: [
        'Placeholder',
      ],
      solutions: [
        'Placeholder',
      ],
      features: [
        'Placeholder',
      ],
      lessons: [
        'Placeholder',
      ]
    },
    dateCreated: '2023-05-01',
    dateCompleted: '',
    order: 3
  },
]

export const useProjects = () => {
  // State
  const projects = ref<Project[]>(MOCK_PROJECTS)
  const currentFilter = reactive<ProjectFilter>({
    category: 'all'
  })
  
  const modalState = reactive<ProjectModalState>({
    isOpen: false,
    project: null,
    currentImageIndex: 0
  })

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const filteredProjects = computed(() => {
    return projects.value.filter(project => {
      // Category filter
      if (currentFilter.category !== 'all' && project.category !== currentFilter.category) {
        return false
      }

      // Status filter
      if (currentFilter.status && project.status !== currentFilter.status) {
        return false
      }

      // Featured filter
      if (currentFilter.featured !== undefined && project.featured !== currentFilter.featured) {
        return false
      }

      return true
    }).sort((a, b) => a.order - b.order)
  })

  const featuredProjects = computed(() => {
    return projects.value.filter(project => project.featured)
      .sort((a, b) => a.order - b.order)
  })

  const projectsByCategory = computed(() => {
    return {
      dev: projects.value.filter(p => p.category === 'dev'),
      ux: projects.value.filter(p => p.category === 'ux'),
      research: projects.value.filter(p => p.category === 'research')
    }
  })

  const filterCounts = computed(() => {
    return {
      all: projects.value.length,
      dev: projectsByCategory.value.dev.length,
      ux: projectsByCategory.value.ux.length,
      research: projectsByCategory.value.research.length
    }
  })

  // Methods
  const setFilter = (filter: Partial<ProjectFilter>) => {
    Object.assign(currentFilter, filter)
  }

  const resetFilter = () => {
    currentFilter.category = 'all'
    delete (currentFilter as any).status
    delete (currentFilter as any).featured
  }

  const getProjectById = (id: string): Project | undefined => {
    return projects.value.find(project => project.id === id)
  }

  const openProjectModal = (project: Project, imageIndex = 0) => {
    modalState.isOpen = true
    modalState.project = project
    modalState.currentImageIndex = imageIndex
  }

  const closeProjectModal = () => {
    modalState.isOpen = false
    modalState.project = null
    modalState.currentImageIndex = 0
  }

  const nextImage = () => {
    if (modalState.project && modalState.currentImageIndex < modalState.project.images.length - 1) {
      modalState.currentImageIndex++
    }
  }

  const previousImage = () => {
    if (modalState.currentImageIndex > 0) {
      modalState.currentImageIndex--
    }
  }

  const setImageIndex = (index: number) => {
    if (modalState.project && index >= 0 && index < modalState.project.images.length) {
      modalState.currentImageIndex = index
    }
  }

  // Utility functions
  const getStatusColor = (status: Project['status']) => {
    const statusColors = {
      'completed': 'text-success-600 bg-success-50 dark:text-success-400 dark:bg-success-900/20',
      'in-progress': 'text-warning-600 bg-warning-50 dark:text-warning-400 dark:bg-warning-900/20',
      'planning': 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20',
      'archived': 'text-text-500 bg-surface-100 dark:text-text-400 dark:bg-surface-800'
    }
    return statusColors[status] || statusColors['in-progress']
  }

  const getCategoryIcon = (category: Project['category']) => {
    const categoryIcons = {
      dev: '💻', // temp
      ux: '🎨', // temp
      research: '📊' // temp
    }
    return categoryIcons[category] || '📁'
  }

  const getCategoryLabel = (category: Project['category']) => {
    const categoryLabels = {
      dev: 'Development',
      ux: 'UX Design',
      research: 'Research'
    }
    return categoryLabels[category] || category
  }

  return {
    // State
    projects: readonly(projects),
    currentFilter: readonly(currentFilter),
    modalState: readonly(modalState),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Computed
    filteredProjects,
    featuredProjects,
    projectsByCategory,
    filterCounts,

    // Methods
    setFilter,
    resetFilter,
    getProjectById,
    openProjectModal,
    closeProjectModal,
    nextImage,
    previousImage,
    setImageIndex,

    // Utilities
    getStatusColor,
    getCategoryIcon,
    getCategoryLabel
  }
} 