// Portfolio constants
export const PORTFOLIO_CONFIG = {
  name: 'TK Stevens',
  title: 'Frontend Developer',
  tagline: 'Building modern web experiences with React, Python, and TypeScript',
  description: 'Frontend Developer specializing in React and modern web technologies. Creating responsive, accessible, and performant web applications.',
  email: 'tjstevens1992@gmail.com',
  location: 'United States',
  availableForWork: true
} as const

// Navigation items
export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', href: '#home', order: 1 },
  { id: 'skills', label: 'Skills & Experience', href: '#skills', order: 2 },
  { id: 'projects', label: 'Projects', href: '#projects', order: 3 },
  { id: 'contact', label: 'Contact', href: '#contact', order: 4 }
] as const

// Social media links
export const SOCIAL_LINKS = [
  {
    platform: 'linkedin' as const,
    url: 'https://linkedin.com/in/tjstevens92',
    icon: 'i-simple-icons-linkedin',
    label: 'LinkedIn',
    order: 1
  },
  {
    platform: 'github' as const,
    url: 'https://github.com/Pixelynx',
    icon: 'i-simple-icons-github',
    label: 'GitHub',
    order: 2
  },
  {
    platform: 'email' as const,
    url: 'mailto:tjstevens1992@gmail.com',
    icon: 'i-heroicons-envelope',
    label: 'Email',
    order: 3
  }
] as const

// Animation constants
export const ANIMATION_CONFIG = {
  default: {
    duration: 500,
    delay: 0,
    easing: 'ease-out',
    threshold: 0.1
  },
  fast: {
    duration: 300,
    delay: 0,
    easing: 'ease-out',
    threshold: 0.1
  },
  slow: {
    duration: 800,
    delay: 0,
    easing: 'ease-out',
    threshold: 0.1
  }
} as const

// Scroll configuration
export const SCROLL_CONFIG = {
  smooth: true,
  duration: 800,
  offset: -80
} as const

// Form validation rules
export const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 100
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  }
} as const

// Project categories
export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All', value: '*' },
  { id: 'app', label: 'Applications', value: '.filter-app' },
  { id: 'design', label: 'UX Design', value: '.filter-design' },
] as const

// SEO defaults
export const SEO_DEFAULTS = {
  title: 'TK Stevens - Fullstack Developer Portfolio',
  description: 'Frontend Developer Portfolio showcasing React, Python, and modern web development projects',
  keywords: ['frontend developer', 'react', 'vue', 'python', 'javascript', 'typescript', 'web development', 'portfolio'],
  image: '/og-image.jpg',
  url: 'https://tjstevens-portfolio.netlify.app/',
  type: 'website' as const
} as const 