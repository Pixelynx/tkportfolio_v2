# Changelog

## [0.1.0]

## [2025-01-27]
### [client]
- Properly configured Tailwind CSS dark mode with `darkMode: 'class'`
  - Added global dark mode wrapper in `app.vue` to ensure consistent dark theme application
  - Cleaned up redundant standalone "dark" classes from all Vue components
  - Maintained all `dark:` prefixed utility classes for proper dark mode styling
  - Resolved light mode flash issues with centralized dark mode management

- Custom scroll fade utility for improved UX
  - Added `.scroll-fade` Tailwind utility with 50% opacity default and 100% on hover
  - Implemented custom scrollbar styling with pink thumb and dark mode aware track colors
  - Applied to both ExperienceCard and SkillCard components for consistent behavior
  - Enhanced scrollable areas with smooth transitions and theme-appropriate colors

- Optimized card components for better display and responsiveness
  - Set consistent `min-height: 500px` for both ExperienceCard and SkillCard components
  - Added `max-height: 500px` with `overflow-y: auto` for ExperienceCard scroll behavior
  - Increased skill bar height in SkillCard from 256px to 320px for better visual impact
  - Implemented responsive min-height adjustments for mobile devices

- Enhanced Tailwind CSS configuration with custom scroll utilities plugin
- Added scroll-fade utility generation with dark mode variants
- Improved dark mode color scheme integration across all components

## [2025-06-26]
### [client]
- **ProjectsSection component**: Filtering system with horizontal carousel and responsive design
- **ProjectCard component**: Interactive project cards with hover effects and quick action buttons
- **ProjectModal component**: Detailed project view with image gallery and comprehensive information
- **Project data management**: Complete project data structure with categorization and status tracking
- **Filtering**: Filter by category (all, dev, UX, research) with real-time count indicators
- **Responsive design**: Desktop horizontal scroll with arrows, mobile vertical infinite scroll
- **Performance optimizations**: Virtual scrolling, lazy loading, and memoized computed properties
- **Accessibility features**: Keyboard navigation, ARIA labels, and focus management
- **Image handling**: Placeholder SVG assets and optimized image display
- **Interactive features**: Project favorites, external link handling, and smooth animations

## [2025-06-16]
### [client]
- Initial Nuxt 3 project setup with TypeScript
- Tailwind CSS integration and custom configuration
- Development tooling setup (ESLint, Prettier)
- Project structure foundation created
- Custom color palette and typography system
- Animation utilities and keyframes
- Responsive design utilities
- TypeScript type definitions for portfolio data
- Scroll management composable with full-page scrolling
- Constants and configuration files
- SEO optimization setup
- Image optimization configuration
- Performance optimization settings
- Core layout components created (Header, Footer, Navigation)
- Default layout with semantic HTML structure
- Responsive navigation with mobile support
- Accessibility features and ARIA attributes implemented
- Error handling and 404 page setup
- SkillXPSection with interactive experience skill card
    - Experience card to display professional experience
    - Animated progress bars and skill meters
    - Data visualization for skill proficiency

### [config]
- Nuxt 3 configuration with modules and optimizations
- Tailwind CSS custom theme and components
- TypeScript compiler options
- Build and deployment settings
- Environment variable handling
- Image optimization settings
