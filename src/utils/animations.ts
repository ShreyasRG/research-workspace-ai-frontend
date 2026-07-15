// Lightweight icon animation utility classes
export const iconAnimations = {
  // Hover animations
  hoverScale: 'hover:scale-110 transition-transform duration-200',
  hoverRotate: 'hover:rotate-12 transition-transform duration-200',
  hoverBounce: 'hover:animate-bounce',
  hoverPulse: 'hover:animate-pulse',
  
  // Click/interactive animations
  activeScale: 'active:scale-95 transition-transform duration-150',
  
  // Combined animations
  interactive: 'hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer',
  rotate: 'hover:rotate-90 transition-transform duration-300',
  
  // Spinner/loading
  spinner: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  
  // Smooth transitions
  smooth: 'transition-all duration-300',
} as const;

// Animation variants for different icon types
export const getIconAnimationClass = (type: 'button' | 'interactive' | 'static' | 'loading' = 'button'): string => {
  const animations: Record<string, string> = {
    button: 'hover:scale-110 active:scale-95 transition-all duration-200',
    interactive: 'hover:scale-105 hover:text-accent-fg transition-all duration-200 cursor-pointer',
    static: '',
    loading: 'animate-spin',
  };
  return animations[type] || animations.button;
};
