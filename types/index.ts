import type { Ref } from 'vue'

// Project types
export interface Project {
  id: string
  title: string
  description: string
  shortDescription: string
  category: 'dev' | 'ux' | 'research'
  status: 'completed' | 'in-progress' | 'planning' | 'archived'
  featured: boolean
  technologies: readonly string[]
  images: readonly ProjectImage[]
  links: readonly ProjectLink[]
  details: ProjectDetails
  dateCreated: string
  dateCompleted?: string
  order: number
}

export interface ProjectImage {
  id: string
  url: string
  alt: string
  caption?: string
  type: 'hero' | 'gallery' | 'thumbnail'
  width?: number
  height?: number
}

export interface ProjectLink {
  type: 'demo' | 'code' | 'research' | 'design' | 'documentation'
  url: string
  label: string
  icon?: string
}

export interface ProjectDetails {
  overview: string
  challenges: readonly string[]
  solutions: readonly string[]
  architecture?: string
  features: readonly string[]
  lessons: readonly string[]
  nextSteps?: readonly string[]
}

export interface ProjectFilter {
  category: 'all' | 'dev' | 'ux' | 'research'
  status?: Project['status']
  featured?: boolean
}

export interface ProjectModalState {
  isOpen: boolean
  project: Project | null
  currentImageIndex: number
}

// Skill types
export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'testing' | 'tools' | 'libraries' | 'design'
  proficiency: number // 0-100
  icon?: string
  iconName?: string
  iconType?: 'svg' | 'image' | 'emoji'
  color?: string
  description?: string
  yearsExperience?: number
  tags?: readonly string[]
  isHighlighted?: boolean
  order: number
}

export interface SkillCategory {
  id: string
  name: string
  description?: string
  color: string
  skills?: Skill[]
  order: number
}

export interface SkillFilter {
  category: 'all' | Skill['category']
  proficiencyMin?: number
  highlighted?: boolean
}

// Experience types
export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: readonly string[]
  technologies: readonly string[]
  achievements: readonly string[]
  responsibilities?: readonly string[]
  companyUrl?: string
  companyLogo?: string
  order: number
}

export interface SkillXPFilter {
  activeView: 'skills' | 'experience'
  skillCategory?: Skill['category']
}

// Contact form types
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

// Navigation types
export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: string
  order: number
}

// Section types
export interface Section {
  id: string
  title: string
  subtitle?: string
  visible: boolean
  order: number
}

// Animation types
export interface AnimationConfig {
  duration: number
  delay: number
  easing: string
  threshold: number
}

// Theme types
export interface Theme {
  name: 'light' | 'dark'
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form validation types
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => boolean | string
}

export interface ValidationRules {
  [key: string]: ValidationRule
}

// Scroll types
export interface ScrollConfig {
  smooth: boolean
  duration: number
  offset: number
}

// Intersection Observer types
export interface IntersectionOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

// Event types
export interface CustomEvent {
  type: string
  payload?: any
  timestamp: number
}

// Component props types
export interface BaseComponentProps {
  class?: string
  id?: string
  'data-testid'?: string
}

// Image types
export interface ImageConfig {
  src: string
  alt: string
  width?: number
  height?: number
  lazy?: boolean
  priority?: boolean
}

// SEO types
export interface SeoConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
}

// Social media types
export interface SocialLink {
  platform: 'linkedin' | 'github' | 'twitter' | 'instagram' | 'email'
  url: string
  icon: string
  label: string
  order: number
}

// Layout component types
export interface LayoutProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
  canonical?: string
}

// Header component types
export interface HeaderProps {
  fixed?: boolean
  transparent?: boolean
  showLogo?: boolean
  showActions?: boolean
}

// Navigation component types
export interface NavigationProps {
  sections?: Section[]
  showMobileNav?: boolean
  offset?: number
}

// Footer component types
export interface FooterProps {
  showSocial?: boolean
  showNavigation?: boolean
  showBackToTop?: boolean
}

// Error page types
export interface ErrorPageProps {
  error: {
    statusCode: number
    statusMessage: string
    message: string
    stack?: string
  }
}

// Scroll composable return type
export interface UseScrollReturn {
  activeSection: Ref<string | null>
  scrollProgress: Ref<number>
  isScrolling: Ref<boolean>
} 