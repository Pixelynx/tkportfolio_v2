# Changelog

## [0.1.0]

## [2025-06-29]
### [client]
- Hero section typewriter cycling animation implementation
  - Created `useTypewriter` composable with complete animation state management and TypeScript interfaces
  - Implemented 4-phase animation cycle: typing → displaying → erasing → pausing with configurable timing
  - Added realistic typing speeds (100ms/char) and faster erasing (65ms/char) for natural feel
  - Integrated cycling text animation for "Frontend Development", "Design", "User Research" specializations
  - Added animated blinking cursor with 500ms intervals and smooth opacity transitions
  - Configured 2-second display duration and 500ms inter-word pauses for optimal readability
  - Implemented `prefers-reduced-motion` accessibility support with automatic fallback to static text
  - Added SSR-safe initialization with proper cleanup and timer management
  - Enhanced hero section engagement with dynamic text while maintaining responsive design
  - Styled cursor with monospace font and primary brand colors matching dark mode theme

- Home section visual enhancement with background illustration
  - Added `headset-girl-bg-svg.svg` as decorative background image to home section
  - Applied CSS filter to transform outline color to match custom secondary brand color (#FF62AD)
  - Implemented gradient mask with fade-out effects at top (0-15%) and bottom (85-100%)
  - Set background image opacity to 30% for subtle visual impact without content interference
  - Added responsive positioning: desktop left-edge alignment (-15% center) and mobile focused view (4% center)
  - Added proper accessibility attributes with `aria-hidden="true"` for decorative element
  - Enhanced home section visual depth while maintaining content readability and focus

- Skills section staggered animation system implementation
  - Replaced Vue TransitionGroup with custom multi-stage sequential animation system
  - Implemented 4-stage animation sequence per skill bar: slide-in → fade-in → fill → interactive
  - Added 300ms staggered delay between each bar animation start for smooth sequential effect
  - Created custom animation state management with TypeScript-safe reactive references
  - Integrated `prefers-reduced-motion` accessibility support with automatic animation disabling
  - Enhanced visual hierarchy with smooth right-to-left slide entrance and opacity transitions
  - Implemented performance optimizations with `will-change` CSS properties and proper cleanup
  - Added animation state tracking to prevent tooltip/hover interactions until animations complete
  - Configured responsive timing: 600ms slide/fade, 500ms bar fill, with proper easing functions
  - Maintained existing hover states and tooltip functionality while bars animate

- Skills section UI enhancement with interactive tooltips
  - Refactored skill names from static text labels to hover/click tooltips for cleaner bar graph presentation
  - Removed skill name text elements below technology icons to reduce visual clutter
  - Implemented desktop hover tooltips with instant show/hide on technology icons
  - Added mobile click-to-show tooltips with 3-second auto-hide functionality
  - Updated tooltip styling to match ProjectCard tag design system for visual consistency
  - Enhanced touch interaction on mobile devices while maintaining desktop hover functionality

## [2025-06-28]
### [deployment]
- Netlify deployment configuration resolved
  - Updated Node.js version from 18 to 20 for better Nuxt 3 and Netlify compatibility
  - Using `dist` as publish directory as standard .output/public currently breaks production build
  - Added `CI = "true"` environment variable for proper CI/CD detection
  - Configured `failOnError: false` in Nitro prerender to prevent build failures on non-critical errors
  - Enabled `crawlLinks: true` for automatic route discovery and complete site generation
  - Disabled experimental payload extraction (`payloadExtraction: false`) for build stability
  - Set compatibility date to `2024-11-01` for stable feature set

## [2025-06-27]
### [client]
- Dynamic icon path construction system implementation
  - Created centralized `config/skills.ts` utility with `getIconPath()` and `getCategoryIconPath()` functions for dynamic asset resolution
  - Converted all skill icons in constants.ts from hardcoded paths (`icon: '/img/icons/svg/file.svg'`) to dynamic names (`iconName: 'file.svg'`)
  - Updated SkillCard.vue component to use `getIconPath(skill.iconName)` with proper TypeScript interface support
  - Refactored project category icons in useProjects.ts and ProjectsSection.vue to use dynamic path construction
  - Updated SkillXPSection.vue mobile filter buttons to use dynamic icon resolution with fallback support
  - Fixed ProjectModal.vue fallback icon to use dynamic path instead of hardcoded SVG reference
  - Added comprehensive TypeScript type safety with updated Skill interface including `iconName?: string` property

- Icon system overhaul and modernization
  - Migrated from emoji-based icons to professional SVG/PNG image icons across all components
  - Updated all technology skill icons to use `/img/icons/svg/` and `/img/icons/` standardized paths
  - Added category-specific icons: experience (briefcase), development (code), UX (design), research (search), skills (gear)
  - Implemented proper icon support for ProjectsSection and SkillXPSection filter buttons with dynamic color management

- Comprehensive emoji dependency removal
  - Removed `getDefaultIcon()` functions from ProjectCard.vue and ProjectModal.vue components
  - Removed `getSkillIcon()` function from useSkills.ts composable and all related references
  - Cleaned up template logic to use direct `link.icon` and `skill.icon` properties
  - Updated SkillCard.vue to eliminate emoji display logic in favor of image-only icons

- Component style consistency and visual enhancements
  - Updated home section CTA buttons to match filter button style convention with consistent sizing and interactions
  - Applied `brightness-0 invert` filters to category icons in ProjectCard and ProjectModal for better contrast
  - Increased ProjectsSection filter icons from 16px to 18px for improved visibility
  - Implemented dynamic icon color changes using CSS filters for active/inactive states

- Project data improvements and bug fixes
  - Added real project images for ResuMate project replacing placeholder assets
  - Fixed ProjectModal image display by changing from `object-cover` to `object-contain` for proper scaling
  - Increased maxLinks from 2 to 3
  - Updated project image paths to use actual screenshots in `/img/proj/resumate/ui/` directory

- Production deployment preparation and build optimization
  - Implemented dynamic asset path construction to resolve Vite build issues with static asset imports
  - Created comprehensive `netlify.toml` configuration with build settings, redirects, and performance headers
  - Updated `nuxt.config.ts` for static site generation with SSR enabled and optimized runtime configuration
  - Configured asset caching, security headers, and SPA routing support for Netlify deployment
  - Set up build command (`npm run generate`) and publish directory (`.output/public`) for static hosting
  - Resolved Rollup import resolution errors by eliminating hardcoded asset paths in favor of runtime construction

## [2025-06-26]
### [client]
- Enhanced carousel alignment and centering behavior
  - Implemented dynamic centering logic for mobile carousel using computed properties
  - Added conditional `justify-center` for single card scenarios to horizontally center lone cards
  - Applied `justify-start` for multiple card scenarios to maintain natural scrolling behavior
  - Fixed desktop carousel centering by adding `justify-center` to main flex container
  - Ensured carousel positioning works harmoniously with existing `translateX` transforms

- Dark mode support and improved user interaction
  - Added `dark` class to modal root container to ensure proper dark mode inheritance
  - Fixed dark mode styling issues caused by `Teleport to="body"` escaping app context
  - Implemented click-outside-to-close functionality on modal container layer

- Professional contact interface with 2x2 button grid layout
  - Implemented responsive contact buttons for Email, LinkedIn, GitHub, and Twitter
  - Created consistent button spacing with `gap-4` across all screen sizes using CSS Grid
  - Added hover animations with elevation effects and color transitions
  - Integrated SVG icons with scaling animations and dark mode support
  - Optimized grid container with `max-w-lg` for compact button layout on larger screens
  - Added accessibility features including ARIA labels and focus management
  - Implemented mailto link generation with pre-filled subject line for email contact
  - Applied consistent styling with existing component patterns and theme integration

- Enhanced mobile user experience with horizontal scrolling
  - Relocated mobile filter buttons into header container with proper right-alignment and vertical centering
  - Converted mobile project layout from vertical stacking to horizontal scrolling for consistency with desktop
  - Removed pagination system and "Load More" functionality in favor of continuous horizontal scroll
  - Updated mobile card width from 280px to 300px for better content accommodation
  - Simplified header layout structure using `flex items-center justify-between` across all screen sizes

- Improved card sizing and content layout
  - Increased mobile card height from 384px to 448px (`h-[28rem]`) to prevent content cutoff
  - Adjusted desktop card height to 416px (`h-[26rem]`) for optimal proportions
  - Reduced mobile technology display from 3 to 2 tags with `:max-technologies="2"` for cleaner layout
  - Removed "Details" button from mobile cards using `v-if="!compact"` for space optimization
  - Implemented bottom-anchored action buttons with consistent card heights using flex layout
  - Added flex structure to pin actions to bottom while preserving natural content spacing

- Standardized SkillXPSection header layout to match ProjectsSection pattern
  - Updated header container structure from `flex justify-start` to `flex items-center justify-between mb-8`
  - Repositioned mobile filter buttons from centered below title to right-aligned within header
  - Converted mobile filter buttons from large vertical cards to compact 10x10 icon-only buttons
  - Changed button styling from `mobile-filter-btn` to `mobile-filter-button` with consistent hover states
  - Added proper accessibility attributes including `type="button"` and `aria-pressed` states
  - Updated button icons from `text-2xl` to `text-sm` for header integration
  - Implemented unified header styling across all major sections for visual consistency

## [2025-06-25]
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

## [2025-06-24]
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
