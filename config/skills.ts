// Icon path construction utility
export function getIconPath(iconName: string): string {
  const basePath = '/img/icons'
  
  // Check if it's an SVG file
  if (iconName.endsWith('.svg')) {
    return `${basePath}/svg/${iconName}`
  }
  
  // Default to PNG files
  return `${basePath}/${iconName}`
}

// Project category icon mapping
export function getCategoryIconPath(category: 'dev' | 'ux' | 'research'): string {
  const categoryIconNames = {
    dev: 'browser-code-solid-svgrepo-com.svg',
    ux: 'design-ideas-svgrepo-com.svg',
    research: 'office-search-research-svgrepo-com.svg'
  }
  
  const iconName = categoryIconNames[category] || 'code-square-filled-svgrepo-com.svg'
  return getIconPath(iconName)
}

// Error handling for missing icons
export function handleImageError(skillId: string) {
  console.warn(`Failed to load icon for skill: ${skillId}`)
} 