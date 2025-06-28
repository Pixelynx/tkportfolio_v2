/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Main page colors
        primary: {
          50: '#fef2f7',
          100: '#fde7f1',
          200: '#fbd0e6',
          300: '#f8a8d1',
          400: '#f472b6',
          500: '#FB0078',
          600: '#e6006b',
          700: '#c2005a',
          800: '#a1004a',
          900: '#85003d',
          950: '#4d0023'
        },
        secondary: {
          50: '#fef7fb',
          100: '#fdeef7',
          200: '#fbddf0',
          300: '#f8c2e3',
          400: '#f495d0',
          500: '#FF62AD',
          600: '#e64a9a',
          700: '#c23a7e',
          800: '#a12f67',
          900: '#852a55',
          950: '#4d152f'
        },
        tertiary: {
          50: '#fefbfd',
          100: '#fdf5fa',
          200: '#fbeaf4',
          300: '#f7d4ea',
          400: '#f1b3d9',
          500: '#FFAFD6',
          600: '#e68fc2',
          700: '#c26fa3',
          800: '#a15a87',
          900: '#854b6f',
          950: '#4d2840'
        },

        // Dark mode colors (default state)
        background: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a'
        },

        surface: {
          50: '#f9f9f9',
          100: '#f4f4f4',
          200: '#e3e3e3',
          300: '#d2d2d2',
          400: '#a1a1a1',
          500: '#717171',
          600: '#505050',
          700: '#3e3e3e',
          800: '#242424',
          900: '#151515',
          950: '#080808'
        },
        
        // Text colors for dark mode
        text: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        
        // Semantic colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16'
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03'
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a'
        },

        // Border colors
        border: {
          // Primary border shades (pink/magenta based)
          primary: {
            50: '#fef2f7',
            100: '#fde7f1',
            200: '#fbd0e6',
            300: '#f8a8d1',
            400: '#f472b6',
            500: '#FB0078',
            600: '#e6006b',
            700: '#c2005a',
            800: '#a1004a',
            900: '#85003d',
            950: '#4d0023'
          },
          // Secondary border shades (lighter pink)
          secondary: {
            50: '#fef7fb',
            100: '#fdeef7',
            200: '#fbddf0',
            300: '#f8c2e3',
            400: '#f495d0',
            500: '#FF62AD',
            600: '#e64a9a',
            700: '#c23a7e',
            800: '#a12f67',
            900: '#852a55',
            950: '#4d152f'
          },
          // Tertiary border shades (softest pink)
          tertiary: {
            50: '#fefbfd',
            100: '#fdf5fa',
            200: '#fbeaf4',
            300: '#f7d4ea',
            400: '#f1b3d9',
            500: '#FFAFD6',
            600: '#e68fc2',
            700: '#c26fa3',
            800: '#a15a87',
            900: '#854b6f',
            950: '#4d2840'
          },
          // Neutral border shades (grey based)
          neutral: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
            950: '#0a0a0a'
          },
          // Surface-based borders for layering
          surface: {
            50: '#f9f9f9',
            100: '#f4f4f4',
            200: '#e3e3e3',
            300: '#d2d2d2',
            400: '#a1a1a1',
            500: '#717171',
            600: '#505050',
            700: '#3e3e3e',
            800: '#242424',
            900: '#151515',
            950: '#080808'
          }
        }
      },
      
      // Typography enhancements
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace']
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }]
      },
      
      // Animation utilities
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(251, 0, 120, 0.5)',
        'glow-lg': '0 0 40px rgba(251, 0, 120, 0.3)'
      },
      
      backdropBlur: {
        xs: '2px'
      },
      
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.scroll-fade': {
          'opacity': '0.5',
          'transition': 'opacity 0.3s ease-in-out',
          'scrollbar-width': 'thin',
          'scrollbar-color': `${theme('colors.primary.500')} ${theme('colors.background.700')}`,
          
          '&:hover': {
            'opacity': '1'
          },
          
          '&::-webkit-scrollbar': {
            'width': '6px'
          },
          
          '&::-webkit-scrollbar-track': {
            'background': theme('colors.background.700'),
            'border-radius': '3px'
          },
          
          '&::-webkit-scrollbar-thumb': {
            'background': theme('colors.primary.500'),
            'border-radius': '3px'
          },
          
          '&::-webkit-scrollbar-thumb:hover': {
            'background': theme('colors.primary.600')
          },
          
          // Dark mode variants
          '.dark &': {
            'scrollbar-color': `${theme('colors.primary.400')} ${theme('colors.background.800')}`,
            
            '&::-webkit-scrollbar-track': {
              'background': theme('colors.background.800')
            },
            
            '&::-webkit-scrollbar-thumb': {
              'background': theme('colors.primary.400')
            },
            
            '&::-webkit-scrollbar-thumb:hover': {
              'background': theme('colors.primary.500')
            }
          }
        }
      }
      
      addUtilities(newUtilities)
    }
  ]
} 