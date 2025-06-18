import { ref, onMounted, onUnmounted, readonly } from 'vue'
import { SCROLL_CONFIG } from '~/utils/constants'

export const useScroll = () => {
  const currentSection = ref(0)
  const sections = ref<HTMLElement[]>([])
  const isScrolling = ref(false)
  const scrollDirection = ref<'up' | 'down'>('down')
  const lastScrollY = ref(0)

  // Get all sections
  const getSections = () => {
    const sectionElements = document.querySelectorAll('[data-section]')
    sections.value = Array.from(sectionElements) as HTMLElement[]
  }

  // Scroll to specific section
  const scrollToSection = (index: number) => {
    if (index < 0 || index >= sections.value.length) return
    
    const targetSection = sections.value[index]
    if (!targetSection) return

    const offsetTop = targetSection.offsetTop + SCROLL_CONFIG.offset
    
    window.scrollTo({
      top: offsetTop,
      behavior: SCROLL_CONFIG.smooth ? 'smooth' : 'auto'
    })
    
    currentSection.value = index
  }

  // Scroll to next section
  const scrollToNext = () => {
    const nextIndex = Math.min(currentSection.value + 1, sections.value.length - 1)
    scrollToSection(nextIndex)
  }

  // Scroll to previous section
  const scrollToPrevious = () => {
    const prevIndex = Math.max(currentSection.value - 1, 0)
    scrollToSection(prevIndex)
  }

  // Handle wheel events for full-page scrolling
  const handleWheel = (event: WheelEvent) => {
    if (isScrolling.value) {
      event.preventDefault()
      return
    }

    const delta = event.deltaY
    const direction = delta > 0 ? 'down' : 'up'
    
    if (direction === 'down') {
      scrollToNext()
    } else {
      scrollToPrevious()
    }
  }

  // Handle keyboard navigation
  const handleKeydown = (event: KeyboardEvent) => {
    if (isScrolling.value) return

    switch (event.key) {
      case 'ArrowDown':
      case 'PageDown':
        event.preventDefault()
        scrollToNext()
        break
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault()
        scrollToPrevious()
        break
      case 'Home':
        event.preventDefault()
        scrollToSection(0)
        break
      case 'End':
        event.preventDefault()
        scrollToSection(sections.value.length - 1)
        break
    }
  }

  // Update current section based on scroll position
  const updateCurrentSection = () => {
    const scrollY = window.scrollY
    const offset = SCROLL_CONFIG.offset

    for (let i = 0; i < sections.value.length; i++) {
      const section = sections.value[i]
      if (!section) continue
      
      const sectionTop = section.offsetTop + offset
      const sectionBottom = sectionTop + section.offsetHeight

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        currentSection.value = i
        break
      }
    }

    // Update scroll direction
    scrollDirection.value = scrollY > lastScrollY.value ? 'down' : 'up'
    lastScrollY.value = scrollY
  }

  // Smooth scroll to element
  const scrollToElement = (element: HTMLElement | string, offset = 0) => {
    const target = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element

    if (!target) return

    const targetTop = target.offsetTop + offset
    
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    })
  }

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Check if element is in viewport
  const isInViewport = (element: HTMLElement, threshold = 0.1) => {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    return (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= windowHeight * threshold
    )
  }

  // Debounced scroll handler
  let scrollTimeout: NodeJS.Timeout
  const handleScroll = () => {
    clearTimeout(scrollTimeout)
    
    scrollTimeout = setTimeout(() => {
      updateCurrentSection()
      isScrolling.value = false
    }, 100)
  }

  // Initialize scroll functionality
  const initScroll = () => {
    getSections()
    updateCurrentSection()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeydown)
  }

  // Cleanup
  const cleanup = () => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('wheel', handleWheel)
    window.removeEventListener('keydown', handleKeydown)
    clearTimeout(scrollTimeout)
  }

  // Lifecycle hooks
  onMounted(() => {
    initScroll()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    currentSection: readonly(currentSection),
    sections: readonly(sections),
    isScrolling: readonly(isScrolling),
    scrollDirection: readonly(scrollDirection),
    scrollToSection,
    scrollToNext,
    scrollToPrevious,
    scrollToElement,
    scrollToTop,
    isInViewport,
    getSections,
    initScroll,
    cleanup
  }
} 