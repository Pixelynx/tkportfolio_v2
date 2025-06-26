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

// Skills Data
export const SKILLS_DATA = [
  // Frontend Skills
  {
    id: 'typescript',
    name: 'TS',
    category: 'frontend' as const,
    proficiency: 85,
    icon: '/assets/img/icons/typescript-logo.png',
    iconType: 'image' as const,
    color: '#3178C6',
    description: 'Strongly typed JavaScript superset',
    yearsExperience: 2,
    tags: ['type-safety', 'scalability'],
    isHighlighted: true,
    order: 1
  },
  {
    id: 'javascript',
    name: 'JS',
    category: 'frontend' as const,
    proficiency: 90,
    icon: '/assets/img/icons/javascript-logo.png',
    iconType: 'image' as const,
    color: '#F7DF1E',
    description: 'Dynamic programming language for web',
    yearsExperience: 3,
    tags: ['es6+', 'dom-manipulation'],
    isHighlighted: true,
    order: 2
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend' as const,
    proficiency: 90,
    icon: '/assets/img/icons/react-logo.png',
    iconType: 'image' as const,
    color: '#61DAFB',
    description: 'Component-based UI library',
    yearsExperience: 3,
    tags: ['hooks', 'jsx', 'virtual-dom'],
    isHighlighted: true,
    order: 3
  },
  {
    id: 'vue',
    name: 'Vue',
    category: 'frontend' as const,
    proficiency: 75,
    icon: '🟢',
    iconType: 'emoji' as const,
    color: '#4FC08D',
    description: 'Progressive JavaScript framework',
    yearsExperience: 1,
    tags: ['composition-api', 'nuxt'],
    order: 4
  },
  {
    id: 'html',
    name: 'HTML5',
    category: 'frontend' as const,
    proficiency: 95,
    icon: '/assets/img/icons/html-5-logo.png',
    iconType: 'image' as const,
    color: '#E34F26',
    description: 'Semantic markup language',
    yearsExperience: 4,
    tags: ['semantic', 'accessibility'],
    order: 5
  },
  {
    id: 'css',
    name: 'CSS3',
    category: 'frontend' as const,
    proficiency: 90,
    icon: '/assets/img/icons/css-3-logo.png',
    iconType: 'image' as const,
    color: '#1572B6',
    description: 'Cascading Style Sheets',
    yearsExperience: 4,
    tags: ['flexbox', 'grid', 'animations'],
    order: 6
  },
  {
    id: 'sass',
    name: 'SASS',
    category: 'frontend' as const,
    proficiency: 85,
    icon: '/assets/img/icons/sass-logo.png',
    iconType: 'image' as const,
    color: '#CC6699',
    description: 'CSS preprocessor',
    yearsExperience: 2,
    tags: ['mixins', 'variables'],
    order: 7
  },

  // Backend Skills
  {
    id: 'nodejs',
    name: 'Node',
    category: 'backend' as const,
    proficiency: 75,
    icon: '/assets/img/icons/node-js-logo.png',
    iconType: 'image' as const,
    color: '#339933',
    description: 'JavaScript runtime environment',
    yearsExperience: 2,
    tags: ['express', 'api'],
    order: 1
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend' as const,
    proficiency: 70,
    icon: '🐍',
    iconType: 'emoji' as const,
    color: '#3776AB',
    description: 'Versatile programming language',
    yearsExperience: 1,
    tags: ['flask', 'django'],
    order: 2
  },
  {
    id: 'postgresql',
    name: 'PSQL',
    category: 'backend' as const,
    proficiency: 70,
    icon: '/assets/img/icons/postgresql-logo.png',
    iconType: 'image' as const,
    color: '#336791',
    description: 'Advanced relational database',
    yearsExperience: 2,
    tags: ['sql', 'relational'],
    order: 3
  },
  {
    id: 'oauth',
    name: 'OAuth',
    category: 'backend' as const,
    proficiency: 65,
    icon: '/assets/img/icons/oauth-logo.png',
    iconType: 'image' as const,
    color: '#4285F4',
    description: 'Authentication protocol',
    yearsExperience: 1,
    tags: ['security', 'authentication'],
    order: 4
  },

  // Libraries
  {
    id: 'redux',
    name: 'Redux',
    category: 'libraries' as const,
    proficiency: 80,
    icon: '/assets/img/icons/redux-logo.png',
    iconType: 'image' as const,
    color: '#764ABC',
    description: 'State management library',
    yearsExperience: 2,
    tags: ['state-management', 'predictable'],
    order: 1
  },
  {
    id: 'axios',
    name: 'Axios',
    category: 'libraries' as const,
    proficiency: 85,
    icon: '/assets/img/icons/axios-dark-logo.png',
    iconType: 'image' as const,
    color: '#5A29E4',
    description: 'HTTP client library',
    yearsExperience: 3,
    tags: ['http', 'promises'],
    order: 2
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    category: 'libraries' as const,
    proficiency: 90,
    icon: '🎨',
    iconType: 'emoji' as const,
    color: '#06B6D4',
    description: 'Utility-first CSS framework',
    yearsExperience: 2,
    tags: ['utility-first', 'responsive'],
    order: 3
  },

  // Tools
  {
    id: 'git',
    name: 'Git',
    category: 'tools' as const,
    proficiency: 85,
    icon: '📝',
    iconType: 'emoji' as const,
    color: '#F05032',
    description: 'Version control system',
    yearsExperience: 3,
    tags: ['version-control', 'collaboration'],
    order: 1
  },
  {
    id: 'vscode',
    name: 'VSC',
    category: 'tools' as const,
    proficiency: 95,
    icon: '💻',
    iconType: 'emoji' as const,
    color: '#007ACC',
    description: 'Code editor',
    yearsExperience: 4,
    tags: ['ide', 'extensions'],
    order: 2
  },
  {
    id: 'npm',
    name: 'NPM',
    category: 'tools' as const,
    proficiency: 85,
    icon: '📦',
    iconType: 'emoji' as const,
    color: '#CB3837',
    description: 'Package manager',
    yearsExperience: 3,
    tags: ['packages', 'dependencies'],
    order: 3
  },

  // Testing
  {
    id: 'jest',
    name: 'Jest',
    category: 'testing' as const,
    proficiency: 70,
    icon: '🧪',
    iconType: 'emoji' as const,
    color: '#C21325',
    description: 'JavaScript testing framework',
    yearsExperience: 1,
    tags: ['unit-testing', 'mocking'],
    order: 1
  },

  // Design
  {
    id: 'figma',
    name: 'Figma',
    category: 'design' as const,
    proficiency: 75,
    icon: '🎨',
    iconType: 'emoji' as const,
    color: '#F24E1E',
    description: 'UI/UX design tool',
    yearsExperience: 2,
    tags: ['prototyping', 'collaboration'],
    order: 1
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    category: 'design' as const,
    proficiency: 70,
    icon: '🖼️',
    iconType: 'emoji' as const,
    color: '#31A8FF',
    description: 'Image editing software',
    yearsExperience: 3,
    tags: ['photo-editing', 'graphics'],
    order: 2
  }
] as const

// Skill Categories
export const SKILL_CATEGORIES = [
  {
    id: 'all',
    name: 'All Skills',
    description: 'Complete technical skill set',
    icon: '🚀',
    color: '#6366F1',
    order: 0
  },
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'User interface and experience',
    icon: '🌐',
    color: '#3B82F6',
    order: 1
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Server-side development',
    icon: '⚙️',
    color: '#10B981',
    order: 2
  },
  {
    id: 'libraries',
    name: 'Libraries',
    description: 'Frameworks and libraries',
    icon: '📚',
    color: '#8B5CF6',
    order: 3
  },
  {
    id: 'tools',
    name: 'Dev Tools',
    description: 'Development tools and workflows',
    icon: '🔧',
    color: '#F59E0B',
    order: 4
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Quality assurance and testing',
    icon: '🧪',
    color: '#EF4444',
    order: 5
  },
  {
    id: 'design',
    name: 'UX/Design',
    description: 'Design and user experience',
    icon: '🎨',
    color: '#EC4899',
    order: 6
  }
] as const

// Experience Data
export const EXPERIENCE_DATA = [
  {
    id: 'citigroup',
    title: 'Front End Web, Software Analyst, Equities',
    company: 'CitiGroup Inc.',
    location: 'New York, NY',
    startDate: 'August 2020',
    endDate: 'April 2024',
    current: false,
    description: [
      'Assisted in migration projects, updating the team\'s application to the latest company-wide software version',
      'Managed and optimized data grids, improving UI responsiveness and enhancing data visualization',
      'Played a pivotal role in integrating Single Sign-On (SSO) functionality into software',
      'Oversaw biweekly release cycles, streamlining documentation and change requests',
      'Collaborated with cross-functional teams, ensuring software updates met compliance standards'
    ],
    responsibilities: [
      'Frontend development and maintenance',
      'Data visualization optimization',
      'SSO integration and authentication',
      'Release management and documentation',
      'Cross-functional collaboration'
    ],
    technologies: ['React', 'Redux', 'TypeScript', 'Jest', 'BitBucket', 'ServiceNow', 'Jenkins'],
    achievements: [
      'Reduced legacy code issues by 25% through migration projects',
      'Improved UI responsiveness for 100K+ institutional traders worldwide',
      'Enhanced security through SSO functionality integration',
      'Achieved high on-time deployment rates through process optimization'
    ],
    order: 1
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