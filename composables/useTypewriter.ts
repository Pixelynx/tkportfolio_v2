import { ref, computed, nextTick, readonly } from 'vue'

// Animation phase constants
const TYPEWRITER_PHASES = {
  TYPING: 'typing',
  DISPLAYING: 'displaying', 
  ERASING: 'erasing',
  PAUSING: 'pausing'
} as const

type TypewriterPhase = typeof TYPEWRITER_PHASES[keyof typeof TYPEWRITER_PHASES]

// Configuration interface
export interface TypewriterConfig {
  baseText: string
  words: string[]
  typingSpeed: number // ms per char
  erasingSpeed: number // ms per char  
  displayDuration: number // ms to display complete word
  pauseDuration: number // ms between words
  cursorBlinkRate: number // ms for cursor blink
  startDelay: number // ms before animation starts
  loop: boolean // loop indefinitely
}

// Default configuration
const DEFAULT_CONFIG: TypewriterConfig = {
  baseText: 'Fullstack Engineer specializing in ',
  words: ['Frontend Development', 'Design', 'User Research'],
  typingSpeed: 100,
  erasingSpeed: 65,
  displayDuration: 2000,
  pauseDuration: 500,
  cursorBlinkRate: 500,
  startDelay: 1000,
  loop: true
}

export function useTypewriter(userConfig?: Partial<TypewriterConfig>) {
  // Merge user config with defaults
  const config = { ...DEFAULT_CONFIG, ...userConfig }
  
  // Reactive state
  const currentPhase = ref<TypewriterPhase>(TYPEWRITER_PHASES.PAUSING)
  const currentWordIndex = ref(0)
  const currentText = ref('')
  const cursorVisible = ref(true)
  const animationEnabled = ref(true)
  const isAnimating = ref(false)
  
  // Timer references for cleanup
  const animationTimer = ref<NodeJS.Timeout | null>(null)
  const cursorTimer = ref<NodeJS.Timeout | null>(null)
  
  // Computed properties
  const displayText = computed(() => {
    return config.baseText + currentText.value
  })
  
  const currentWord = computed(() => {
    return config.words[currentWordIndex.value] || ''
  })
  
  const isComplete = computed(() => {
    return !config.loop && currentWordIndex.value >= config.words.length && currentPhase.value === TYPEWRITER_PHASES.PAUSING
  })
  
  // Check for reduced motion preference
  const checkReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  
  // Clear all timers
  const clearTimers = () => {
    if (animationTimer.value) {
      clearTimeout(animationTimer.value)
      animationTimer.value = null
    }
    if (cursorTimer.value) {
      clearTimeout(cursorTimer.value)
      cursorTimer.value = null
    }
  }
  
  // Start cursor blinking animation
  const startCursorBlink = () => {
    if (cursorTimer.value) return // Already running
    
    const blink = () => {
      cursorVisible.value = !cursorVisible.value
      cursorTimer.value = setTimeout(blink, config.cursorBlinkRate)
    }
    
    cursorTimer.value = setTimeout(blink, config.cursorBlinkRate)
  }
  
  // Stop cursor blinking
  const stopCursorBlink = () => {
    if (cursorTimer.value) {
      clearTimeout(cursorTimer.value)
      cursorTimer.value = null
    }
    cursorVisible.value = true
  }
  
  // Type characters one by one
  const typeText = (targetText: string, currentIndex: number = 0) => {
    if (currentIndex >= targetText.length) {
      // Typing complete, switch to display phase
      currentPhase.value = TYPEWRITER_PHASES.DISPLAYING
      scheduleNextPhase(config.displayDuration, startErasing)
      return
    }
    
    currentText.value = targetText.substring(0, currentIndex + 1)
    
    // Schedule next character
    animationTimer.value = setTimeout(() => {
      typeText(targetText, currentIndex + 1)
    }, config.typingSpeed)
  }
  
  // Erase characters one by one
  const eraseText = (currentIndex?: number) => {
    const startIndex = currentIndex ?? currentText.value.length
    
    if (startIndex <= 0) {
      // Erasing complete, switch to pause phase
      currentText.value = ''
      currentPhase.value = TYPEWRITER_PHASES.PAUSING
      scheduleNextPhase(config.pauseDuration, moveToNextWord)
      return
    }
    
    currentText.value = currentText.value.substring(0, startIndex - 1)
    
    // Schedule next character deletion
    animationTimer.value = setTimeout(() => {
      eraseText(startIndex - 1)
    }, config.erasingSpeed)
  }
  
  // Move to next word in cycle
  const moveToNextWord = () => {
    currentWordIndex.value = (currentWordIndex.value + 1) % config.words.length
    
    // If not looping and we've reached the end, stop
    if (!config.loop && currentWordIndex.value === 0) {
      isAnimating.value = false
      return
    }
    
    startTyping()
  }
  
  // Schedule next animation phase
  const scheduleNextPhase = (delay: number, callback: () => void) => {
    animationTimer.value = setTimeout(callback, delay)
  }
  
  // Start typing current word
  const startTyping = () => {
    currentPhase.value = TYPEWRITER_PHASES.TYPING
    typeText(currentWord.value)
  }
  
  // Start erasing current word
  const startErasing = () => {
    currentPhase.value = TYPEWRITER_PHASES.ERASING
    eraseText()
  }
  
  // Initialize animation
  const startAnimation = () => {
    if (!animationEnabled.value) {
      // If animations disabled, show first word statically
      currentText.value = config.words[0] || ''
      currentPhase.value = TYPEWRITER_PHASES.DISPLAYING
      return
    }
    
    if (checkReducedMotion()) {
      animationEnabled.value = false
      startAnimation() // Recursive call with animations disabled
      return
    }
    
    isAnimating.value = true
    startCursorBlink()
    
    // Start with initial delay
    animationTimer.value = setTimeout(() => {
      startTyping()
    }, config.startDelay)
  }
  
  // Stop animation
  const stopAnimation = () => {
    isAnimating.value = false
    clearTimers()
    stopCursorBlink()
  }
  
  // Reset animation to beginning
  const resetAnimation = () => {
    stopAnimation()
    currentWordIndex.value = 0
    currentText.value = ''
    currentPhase.value = TYPEWRITER_PHASES.PAUSING
    cursorVisible.value = true
  }
  
  // Pause animation
  const pauseAnimation = () => {
    if (isAnimating.value) {
      clearTimers()
      isAnimating.value = false
    }
  }
  
  // Resume animation
  const resumeAnimation = () => {
    if (!isAnimating.value && animationEnabled.value) {
      isAnimating.value = true
      startCursorBlink()
      
      // Resume from current phase
      switch (currentPhase.value) {
        case TYPEWRITER_PHASES.TYPING:
          typeText(currentWord.value, currentText.value.length)
          break
        case TYPEWRITER_PHASES.ERASING:
          eraseText()
          break
        case TYPEWRITER_PHASES.DISPLAYING:
          scheduleNextPhase(config.displayDuration, startErasing)
          break
        case TYPEWRITER_PHASES.PAUSING:
          scheduleNextPhase(config.pauseDuration, moveToNextWord)
          break
      }
    }
  }
  
  // Lifecycle management
  const initializeTypewriter = () => {
    // Start animation after brief delay
    nextTick(() => {
      startAnimation()
    })
  }
  
  const cleanupTypewriter = () => {
    stopAnimation()
  }
  
  // Public API
  return {
    // Reactive state
    displayText: readonly(displayText),
    currentText: readonly(currentText),
    currentPhase: readonly(currentPhase),
    currentWord: readonly(currentWord),
    cursorVisible: readonly(cursorVisible),
    isAnimating: readonly(isAnimating),
    isComplete: readonly(isComplete),
    animationEnabled: readonly(animationEnabled),
    
    // Control methods
    startAnimation,
    stopAnimation,
    resetAnimation,
    pauseAnimation,
    resumeAnimation,
    
    // Lifecycle methods
    initializeTypewriter,
    cleanupTypewriter,
    
    // Configuration
    config: readonly(config)
  }
} 