import { ref, computed, reactive, readonly } from 'vue'
import type { Project, ProjectFilter, ProjectModalState } from '~/types'
import { getCategoryIconPath } from '~/config/skills'

const MOCK_PROJECTS: Project[] = [
  {
    id: 'resumate',
    title: 'ResuMate',
    description: 'AI-powered resume and cover letter creation platform that combines intelligent document generation with job fit analysis to help job seekers create tailored application materials and improve their interview chances.',
    shortDescription: 'AI job matching platform with resume analysis',
    category: 'dev',
    status: 'in-progress',
    featured: true,
    technologies: ['React.js', 'Redux', 'PostgreSQL', 'TypeScript', 'Node.js', 'Express', 'Sequelize', 'OpenAI', 'Material UI'],
    images: [
      {
        id: 'res-hero',
        url: '/img/proj/resumate/ui/dash-cropped-v2.jpg',
        alt: 'ResuMate Dashboard',
        type: 'hero',
        width: 800,
        height: 600
      },
      {
        id: 'res-builder',
        url: '/img/proj/resumate/ui/resume-build-v2.jpg',
        alt: 'Resume Builder Interface',
        type: 'gallery',
        width: 800,
        height: 600
      },
      {
        id: 'res-jobfit',
        url: '/img/proj/resumate/ui/mobile-job-fit-v2.jpg',
        alt: 'Resume Job Fit Score',
        type: 'gallery',
        width: 800,
        height: 600
      }
    ],
    links: [
      {
        type: 'demo',
        url: 'https://resumate-ai.netlify.app',
        label: 'Demo'
      },
      {
        type: 'code',
        url: 'https://github.com/pixelynx/Resumate',
        label: 'GitHub'
      },
      {
        type: 'design',
        url: 'https://github.com/Pixelynx/ResuMate/blob/main/docs/demo.md',
        label: 'Designs'
      }
    ],
    details: {
      overview: 'ResuMate streamlines the job application process by offering an intuitive resume builder, AI-powered cover letter generation, and sophisticated job fit scoring using OpenAI embeddings to provide personalized feedback and improvement suggestions.',
      challenges: [
        'Implementing accurate semantic similarity between resumes and job descriptions',
        'Creating balanced scoring with proper penalty systems for mismatches',
        'Designing effective AI prompts for personalized cover letter generation'
      ],
      solutions: [
        "Utilized OpenAI's text-embedding-ada-002 for semantic analysis with cosine similarity",
        'Developed weighted component scoring with technical and experience mismatch penalties',
        'Implemented context-aware content generation with tone and focus customization'
      ],
      architecture: 'Full-stack web application with React/TypeScript frontend, Express.js backend, PostgreSQL database, and OpenAI API integration for AI-powered features',
      features: [
        'Multi-step resume builder with real-time preview',
        'AI-powered cover letter generation with customizable tone',
        'Job fit scoring using OpenAI text embeddings',
        'Component-based compatibility analysis (skills, experience, education)',
        'Professional document printing and export'
      ],
      lessons: [
        'Advanced integration of AI embeddings for document analysis',
        'Balancing AI automation with user control in document generation'
      ]
    },
    dateCreated: '2025-02-27',
    dateCompleted: '',
    order: 1
  },
  {
    id: 'spotivibe',
    title: 'SpotiVibe',
    description: "Music discovery platform that combines Spotify's catalog with natural language processing to help users find songs matching specific vibes and calculate artist discography durations through intelligent lyric analysis.",
    shortDescription: 'Music discovery through AI lyric analysis',
    category: 'dev',
    status: 'in-progress',
    featured: true,
    technologies: ['Python', 'React.js', 'OAuth', 'Spotipy API', 'Genius API', 'DeBERTa NLP Model', 'JavaScript'],
    images: [
      {
        id: 'spot-home',
        url: '/img/proj/spotivibe/ui/HOME-mic-laptop-bg-v2.png',
        alt: 'SpotiVibe Homepage',
        type: 'hero',
        width: 800,
        height: 600
      },
      // {
      //   id: 'spot-vibe-result',
      //   url: '/images/placeholder-project.svg',
      //   alt: 'SpotiVibe Vibe Search Results',
      //   type: 'gallery',
      //   width: 800,
      //   height: 600
      // }
    ],
    links: [
      {
        type: 'code',
        url: 'https://github.com/pixelynx/SpotiVibe',
        label: 'GitHub'
      }
    ],
    details: {
      overview: 'SpotiVibe enhances music discovery by offering vibe-based song search through lyric analysis and comprehensive artist catalog duration calculation, providing users with personalized music exploration based on emotional context and mood.',
      challenges: [
        'Implementing accurate lyrical emotion analysis beyond simple word matching',
        'Managing excessive load times from multiple sequential API calls',
        'Creating effective vibe interpretation from user input phrases',
        'Handling rate limits across multiple external APIs (Spotify & Genius)',
      ],
      solutions: [
        'TBD'
      ],
      features: [
        'Intelligent vibe search with natural language processing',
        'Artist catalog duration calculator with complete discography analysis',
        'Flexible search filters (vibe, artist)',
        'Spotify OAuth integration for secure authentication',
        'Responsive design with modern UI/UX principles',
        'Paginated search results for optimal performance',
      ],
      lessons: [
        'Advanced integration of multiple music APIs with authentication flows',
        'Natural language processing limitations in emotion detection from lyrics',
      ]
    },
    dateCreated: '2024-07-10',
    dateCompleted: '',
    order: 2
  },
  {
    id: 'pfn-ecommerce',
    title: 'PFN UX Redesign',
    description: "Hey there! I'm currently planning a fresh redesign for a press-on nail e-commerce site. My goal is to make finding and buying those perfect nails a super smooth and enjoyable experience. This project is just getting started, so check back soon for updates! In the meantime, you can dive into my early explorations, wireframes, and user flows through the links below if you're curious to see the BTS.",
    shortDescription: 'PFN platform UX redesign',
    category: 'ux',
    status: 'planning',
    featured: true,
    technologies: ['Figma', ],
    images: [
      {
        id: 'pfn-try-on-design',
        url: '/img/proj/pfn/Wireframes/Mobile/hi-fi/try-on-main-select-design-v1.png',
        alt: 'AR Nail Try On',
        type: 'hero',
        width: 800,
        height: 600
      },
      {
        id: 'pfn-try-finger',
        url: '/img/proj/pfn/Wireframes/Mobile/hi-fi/try-on-main-finger-expand-v1.png',
        alt: 'Finger Select Expanded',
        type: 'gallery',
        width: 800,
        height: 600
      },
      {
        id: 'pfn-try-color',
        url: '/img/proj/pfn/Wireframes/Mobile/hi-fi/try-on-main-select-color-v1.png',
        alt: 'Try On Color Select',
        type: 'gallery',
        width: 800,
        height: 600
      }
    ],
    links: [
      {
        type: 'design',
        url: 'https://figma.com/ecommerce-redesign',
        label: 'Designs'
      },
      {
        type: 'research',
        url: '/research/ecommerce-ux-study.pdf',
        label: 'Research'
      }
    ],
    details: {
      overview: 'TBD',
      challenges: [
        'TBD',
      ],
      solutions: [
        'TBD',
      ],
      features: [
        'TBD',
      ],
      lessons: [
        'TBD',
      ]
    },
    dateCreated: '2025-04-27',
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
    return getCategoryIconPath(category)
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