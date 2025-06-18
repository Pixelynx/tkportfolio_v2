// Project types
export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: 'app' | 'design' | 'ux'
  challenge?: string
  solution?: string
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
  featured: boolean
  order: number
}

// Skill types
export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'design'
  proficiency: number // 0-100
  icon?: string
  color?: string
  order: number
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
  description: string[]
  technologies: string[]
  achievements: string[]
  order: number
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