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
    iconName: 'typescript-icon.svg',
    iconType: 'image' as const,
    color: '#3178C6',
    description: 'Strongly typed JavaScript superset',
    yearsExperience: 2,
    tags: ['type-safety', 'scalability'],
    isHighlighted: true,
    order: 3
  },
  {
    id: 'javascript',
    name: 'JS',
    category: 'frontend' as const,
    proficiency: 90,
    iconName: 'javascript.svg',
    iconType: 'image' as const,
    color: '#F7DF1E',
    description: 'Dynamic programming language for web',
    yearsExperience: 3,
    tags: ['es6+', 'dom-manipulation'],
    isHighlighted: true,
    order: 4
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend' as const,
    proficiency: 90,
    iconName: 'react.svg',
    iconType: 'image' as const,
    color: '#61DAFB',
    description: 'Component-based UI library',
    yearsExperience: 3,
    tags: ['hooks', 'jsx', 'virtual-dom'],
    isHighlighted: true,
    order: 5
  },
  {
    id: 'vue',
    name: 'Vue',
    category: 'frontend' as const,
    proficiency: 75,
    iconName: 'vue-logo.png',
    iconType: 'image' as const,
    color: '#4FC08D',
    description: 'Progressive JavaScript framework',
    yearsExperience: 1,
    tags: ['composition-api', 'nuxt'],
    order: 1
  },
  {
    id: 'html',
    name: 'HTML5',
    category: 'frontend' as const,
    proficiency: 95,
    iconName: 'html-5-svgrepo-com.svg',
    iconType: 'image' as const,
    color: '#E34F26',
    description: 'Semantic markup language',
    yearsExperience: 4,
    tags: ['semantic', 'accessibility'],
    order: 7
  },
  {
    id: 'css',
    name: 'CSS3',
    category: 'frontend' as const,
    proficiency: 90,
    iconName: 'css-3-svgrepo-com.svg',
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
    iconName: 'sass-svgrepo-com.svg',
    iconType: 'image' as const,
    color: '#CC6699',
    description: 'CSS preprocessor',
    yearsExperience: 2,
    tags: ['mixins', 'variables'],
    order: 2
  },

  // Backend Skills
  {
    id: 'nodejs',
    name: 'Node',
    category: 'backend' as const,
    proficiency: 85,
    iconName: 'node-js-green-svgrepo-com.svg',
    iconType: 'image' as const,
    color: '#339933',
    description: 'JavaScript runtime environment',
    yearsExperience: 2,
    tags: ['express', 'api'],
    order: 4
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend' as const,
    proficiency: 70,
    iconName: 'python-svgrepo-com.svg',
    iconType: 'image' as const,
    color: '#3776AB',
    description: 'Versatile programming language',
    yearsExperience: 1,
    tags: ['flask', 'django'],
    order: 1
  },
  {
    id: 'postgresql',
    name: 'PSQL',
    category: 'backend' as const,
    proficiency: 80,
    iconName: 'postgresql-svgrepo-com.svg',
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
    proficiency: 70,
    iconName: 'oauth-svgrepo-com.svg',
    iconType: 'image' as const,
    color: '#EB5424',
    description: 'Authentication protocol',
    yearsExperience: 1,
    tags: ['security', 'authentication'],
    order: 2
  },

  // Libraries
  {
    id: 'redux',
    name: 'Redux',
    category: 'libraries' as const,
    proficiency: 85,
    iconName: 'redux-logo-svgrepo-com.svg',
    iconType: 'image' as const,
    color: '#764ABC',
    description: 'State management library',
    yearsExperience: 2,
    tags: ['state-management', 'predictable'],
    order: 3
  },
  {
    id: 'axios',
    name: 'Axios',
    category: 'libraries' as const,
    proficiency: 85,
    iconName: 'axios-logo.svg',
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
    proficiency: 70,
    iconName: 'tailwind-css-logo.png',
    iconType: 'image' as const,
    color: '#06B6D4',
    description: 'Utility-first CSS framework',
    yearsExperience: 2,
    tags: ['utility-first', 'responsive'],
    order: 1
  },

  // Tools
  {
    id: 'git',
    name: 'Git',
    category: 'tools' as const,
    proficiency: 85,
    iconName: 'Git_icon.png',
    iconType: 'image' as const,
    color: '#F05032',
    description: 'Version control system',
    yearsExperience: 3,
    tags: ['version-control', 'collaboration'],
    order: 2
  },
  {
    id: 'vscode',
    name: 'VSC',
    category: 'tools' as const,
    proficiency: 95,
    iconName: 'Visual_Studio_Code_icon.png',
    iconType: 'image' as const,
    color: '#007ACC',
    description: 'Code editor',
    yearsExperience: 4,
    tags: ['ide', 'extensions'],
    order: 3
  },
  {
    id: 'npm',
    name: 'NPM',
    category: 'tools' as const,
    proficiency: 75,
    iconName: 'npm-icon.png',
    iconType: 'image' as const,
    color: '#CB3837',
    description: 'Package manager',
    yearsExperience: 3,
    tags: ['packages', 'dependencies'],
    order: 1
  },

  // Testing
  {
    id: 'jest',
    name: 'Jest',
    category: 'testing' as const,
    proficiency: 50,
    iconName: 'jest-logo.png',
    iconType: 'image' as const,
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
    iconName: 'Figma-logo.png',
    iconType: 'image' as const,
    color: '#F24E1E',
    description: 'UI/UX design tool',
    yearsExperience: 1,
    tags: ['prototyping', 'collaboration'],
    order: 1
  },
  {
    id: 'illustrator',
    name: 'Illustator',
    category: 'design' as const,
    proficiency: 80,
    iconName: 'adobe-illustrator-svgrepo-com.svg',
    iconType: 'image' as const,
    color: '#FF9A00',
    description: 'Image editing software',
    yearsExperience: 5,
    tags: ['photo-editing', 'graphics'],
    order: 2
  },
  {
    id: 'affinity',
    name: 'Affinity',
    category: 'design' as const,
    proficiency: 90,
    iconName: 'affinity-designer-2-logo.png',
    iconType: 'image' as const,
    color: '#1B72BE',
    description: 'Image editing software',
    yearsExperience: 2,
    tags: ['photo-editing', 'graphics'],
    order: 3
  }
] as const

// Skill Categories
export const SKILL_CATEGORIES = [
  {
    id: 'all',
    name: 'All Skills',
    description: 'Complete technical skill set',
    color: '#6366F1',
    order: 0
  },
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'User interface and experience',
    color: '#3B82F6',
    order: 1
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Server-side development',
    color: '#10B981',
    order: 2
  },
  {
    id: 'libraries',
    name: 'Libraries',
    description: 'Frameworks and libraries',
    color: '#8B5CF6',
    order: 3
  },
  {
    id: 'tools',
    name: 'Dev Tools',
    description: 'Development tools and workflows',
    color: '#F59E0B',
    order: 4
  },
  {
    id: 'testing',
    name: 'Testing',
    description: 'Quality assurance and testing',
    color: '#EF4444',
    order: 5
  },
  {
    id: 'design',
    name: 'UX/Design',
    description: 'Design and user experience',
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
      'Refactored data grid logic by replacing middleware with Redux Thunks',
      'Implemented intelligent caching and conditional fetch logic in state management',
      'Managed UI optimization for real-time data display across grids',
      'Supported migration of application to the latest version of internal company software',
      'Collaborated cross-functionally to update enterprise-level Single Sign-On (SSO)',
      'Contributed to release management by overseeing biweekly deployments'
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
      'Reduced API call complexity and improved load time responsiveness by ~15%',
      'Decreased redundant API requests and minimized performance bottlenecks',
      'Improved usability and system reliability for 100K+ institutional users globally',
      'Ensured seamless integration across modules through component validation',
      'Enhanced authentication security while aligning with compliance policies'
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