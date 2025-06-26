import { ref, computed, reactive, readonly } from 'vue'
import type { Project, ProjectFilter, ProjectModalState } from '~/types'

// TODO: Update
// Project data
const MOCK_PROJECTS: Project[] = [
  {
    id: 'jobfitscore',
    title: 'JobFitScore',
    description: 'AI-powered job matching platform that analyzes resumes against job descriptions to provide compatibility scores and improvement suggestions.',
    shortDescription: 'AI job matching platform with resume analysis',
    category: 'dev',
    status: 'completed',
    featured: true,
    technologies: ['React', 'Python', 'FastAPI', 'TensorFlow', 'PostgreSQL', 'Docker'],
    images: [
      {
        id: 'jfs-hero',
        url: '/images/placeholder-project.svg',
        alt: 'JobFitScore Dashboard',
        type: 'hero',
        width: 800,
        height: 600
      },
      {
        id: 'jfs-analysis',
        url: '/images/placeholder-project.svg',
        alt: 'Resume Analysis View',
        type: 'gallery',
        width: 800,
        height: 600
      }
    ],
    links: [
      {
        type: 'demo',
        url: 'https://jobfitscore-demo.com',
        label: 'Live Demo',
        icon: '🚀' // temp
      },
      {
        type: 'code',
        url: 'https://github.com/tkstevens/jobfitscore',
        label: 'GitHub',
        icon: '💻' // temp
      }
    ],
    details: {
      overview: 'JobFitScore revolutionizes job searching by using AI to analyze resume compatibility with job descriptions, providing actionable insights for career advancement.',
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
      architecture: 'Microservices architecture with React frontend, Python backend, and PostgreSQL database',
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
    dateCompleted: '2024-05-20',
    order: 1
  },
  {
    id: 'resumate',
    title: 'Resumate',
    description: 'Intelligent resume builder with ATS optimization, real-time collaboration, and industry-specific templates.',
    shortDescription: 'Smart resume builder with ATS optimization',
    category: 'dev',
    status: 'completed',
    featured: true,
    technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'AWS'],
    images: [
      {
        id: 'res-dashboard',
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
      }
    ],
    links: [
      {
        type: 'demo',
        url: 'https://resumate-app.com',
        label: 'Try Resumate',
        icon: '📝' // temp
      },
      {
        type: 'code',
        url: 'https://github.com/tkstevens/resumate',
        label: 'Source Code',
        icon: '💻' // temp
      }
    ],
    details: {
      overview: 'Resumate helps job seekers create ATS-optimized resumes with intelligent suggestions and real-time collaboration features.',
      challenges: [
        'ATS compatibility across different systems',
        'Real-time collaboration implementation',
        'Template responsiveness across formats'
      ],
      solutions: [
        'Extensive ATS testing and optimization',
        'WebSocket-based collaboration system',
        'Flexible CSS-in-JS template engine'
      ],
      features: [
        'ATS optimization scoring',
        'Real-time collaboration',
        'Industry-specific templates',
        'Export to multiple formats',
        'Version control system'
      ],
      lessons: [
        'Real-time application architecture',
        'Document generation systems',
        'User collaboration patterns'
      ]
    },
    dateCreated: '2023-08-10',
    dateCompleted: '2024-01-05',
    order: 2
  },
  {
    id: 'ux-ecommerce',
    title: 'E-commerce UX Redesign',
    description: 'Complete UX overhaul of a major e-commerce platform, increasing conversion rates by 34% through user-centered design principles.',
    shortDescription: 'E-commerce platform UX redesign with 34% conversion increase',
    category: 'ux',
    status: 'completed',
    featured: true,
    technologies: ['Figma', 'Adobe XD', 'Principle', 'InVision', 'Hotjar', 'Google Analytics'],
    images: [
      {
        id: 'ux-before-after',
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
        label: 'Design Files',
        icon: '🎨' // temp
      },
      {
        type: 'research',
        url: '/research/ecommerce-ux-study.pdf',
        label: 'UX Research',
        icon: '📊' // temp
      }
    ],
    details: {
      overview: 'Implemented UX redesign of e-commerce platform.',
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
    dateCompleted: '2023-09-15',
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
    return statusColors[status] || statusColors.completed
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