# Icon Animation Guide

This project uses **lightweight CSS animations** for a clean, modern UX. No additional dependencies required!

## Available Animations

### Hover Scale
Scale icons up smoothly on hover - perfect for interactive buttons.
```tsx
<button className="hover:scale-110 transition-all duration-200">
  <Icon />
</button>
```

### Active Scale
Shrink slightly when clicked for tactile feedback.
```tsx
<button className="active:scale-95 transition-all duration-200">
  <Icon />
</button>
```

### Combined Interactive (Recommended)
```tsx
<button className="hover:scale-110 active:scale-95 transition-all duration-200">
  <Icon />
</button>
```

### Rotate Animations
Perfect for chevrons and expand/collapse indicators.
```tsx
<ChevronDown className={cn('w-3 h-3 transition-transform duration-300', open && 'rotate-180')} />
```

### Custom Keyframe Animations

#### Icon Bounce
```tsx
<button className="hover:animate-icon-bounce">
  <Icon />
</button>
```

#### Icon Pulse Glow (Loading)
```tsx
<Icon className="animate-icon-pulse-glow" />
```

#### Icon Slide In
```tsx
<Icon className="animate-icon-slide-in" />
```

#### Icon Slide Right
```tsx
<Icon className="animate-icon-slide-right" />
```

## Where Animations Are Used

- **Buttons**: Hover scale + active scale for tactile feedback
- **Delete buttons**: Color change + scale on hover
- **Status dropdown**: Rotating chevron indicator
- **Interactive icons**: Smooth hover effects
- **Quick actions**: Scale animations on visibility

## Performance

All animations use:
- ✅ CSS transforms (GPU-accelerated)
- ✅ Transition durations of 200-300ms
- ✅ No JavaScript animation loops
- ✅ Works perfectly in light/dark mode

## Adding to New Components

```tsx
// Simple hover scale
<button className="hover:scale-110 transition-all duration-200">
  <Plus className="w-4 h-4" />
</button>

// With color change
<button className="hover:scale-110 hover:text-accent-fg transition-all duration-200">
  <Icon />
</button>

// With click feedback
<button className="hover:scale-110 active:scale-95 transition-all duration-200">
  <Icon />
</button>
```

## Customization

All animations are defined in `src/index.css` and can be customized:

```css
@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); } /* Adjust bounce height */
}
```

Duration can be adjusted per component:
- `duration-150` - Very fast
- `duration-200` - Default (fast)
- `duration-300` - Standard
- `duration-500` - Slow
