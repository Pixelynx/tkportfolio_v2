# TK Stevens Portfolio

[Portfolio Site](https://tjstevens-portfolio.netlify.app/)

## Tech Stack

- **Framework**: Nuxt 3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons, Simple Icons
- **Animations**: Vue Transitions, CSS Animations
- **Deployment**: Vercel/Netlify ready

## Project Structure

```
tkportfolio/
├── components/          # Vue components
│   ├── layout/         # Layout components (Header, Footer, Navigation)
│   ├── sections/       # Page sections (Home, Skills, Projects, Contact)
│   └── ui/            # Reusable UI components
├── composables/        # Vue composables
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and constants
├── assets/            # Static assets (CSS, images)
├── public/            # Public static files
└── server/            # Server-side API routes
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tkportfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Customization

### Colors and Theme

The project uses a custom color palette defined in `tailwind.config.js`:

- **Primary**: Blue shades for main actions and highlights
- **Secondary**: Gray shades for text and backgrounds
- **Accent**: Purple shades for special elements
- **Success/Warning/Error**: Standard semantic colors

### Content Management

Update the following files to customize your portfolio:

- `utils/constants.ts` - Portfolio information and navigation
- `types/index.ts` - Type definitions for your data
- Component files in `components/sections/` - Section content
- `assets/css/main.css` - Custom styles and components

### Adding Projects

1. Update the projects data in your components
2. Add project images to `public/images/projects/`
3. Update the project filtering logic if needed

## Responsive Design

The portfolio is built with a mobile-first approach and includes:

- Responsive typography and spacing
- Mobile-optimized navigation
- Touch-friendly interactions
- Optimized images for different screen sizes

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
SITE_URL=https://your-domain.com
CONTACT_EMAIL=your-email@domain.com
```

### Nuxt Configuration

The main configuration is in `nuxt.config.ts`:

- SEO meta tags
- Module configuration
- Build optimizations
- Image optimization settings

## Deployment

### Netlify

1. Build the project: `npm run generate`
2. Deploy the `dist` folder to Netlify

### Manual Deployment

1. Build the project: `npm run generate`
2. Upload the `dist` folder to your web server

## Performance

The portfolio is optimized for performance with:

- Image optimization with @nuxt/image
- Code splitting and lazy loading
- CSS purging with Tailwind
- Static site generation
- Service worker support (optional)

## Acknowledgments

- [Nuxt 3](https://nuxt.com/) - Vue.js framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [VueUse](https://vueuse.org/) - Vue composition utilities
- [Heroicons](https://heroicons.com/) - Beautiful icons
- [Simple Icons](https://simpleicons.org/) - SVG icons for brands
