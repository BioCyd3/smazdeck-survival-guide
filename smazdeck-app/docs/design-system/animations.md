# Animation and Interaction Patterns

This document outlines the animation system, micro-interactions, and motion design principles used throughout the Smazdeck Survival Guide application.

## Animation Philosophy

### Design Principles
- **Purposeful**: Every animation serves a functional purpose
- **Subtle**: Animations enhance without distracting
- **Performance**: Optimized for smooth 60fps performance
- **Accessible**: Respects user motion preferences
- **Gaming Feel**: Subtle gaming-inspired effects and glows

### Motion Hierarchy
1. **Micro-interactions**: Button hovers, focus states (100-200ms)
2. **Component Transitions**: Card reveals, state changes (200-400ms)
3. **Page Transitions**: Route changes, major state updates (400-600ms)
4. **Ambient Animations**: Floating elements, glows (2-3s loops)

## Animation System

### Keyframe Definitions
```css
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideUp {
  0% { 
    transform: translateY(10px); 
    opacity: 0; 
  }
  100% { 
    transform: translateY(0); 
    opacity: 1; 
  }
}

@keyframes slideDown {
  0% { 
    transform: translateY(-10px); 
    opacity: 0; 
  }
  100% { 
    transform: translateY(0); 
    opacity: 1; 
  }
}

@keyframes scaleIn {
  0% { 
    transform: scale(0.95); 
    opacity: 0; 
  }
  100% { 
    transform: scale(1); 
    opacity: 1; 
  }
}

@keyframes glowPulse {
  0%, 100% { 
    box-shadow: 0 0 5px rgb(251 191 36 / 0.5); 
  }
  50% { 
    box-shadow: 0 0 20px rgb(251 191 36 / 0.8); 
  }
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-5px); 
  }
}
```

### Animation Classes
```css
/* Entry animations */
.animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
.animate-slide-up { animation: slideUp 0.3s ease-out; }
.animate-slide-down { animation: slideDown 0.3s ease-out; }
.animate-scale-in { animation: scaleIn 0.2s ease-out; }

/* Ambient animations */
.animate-glow-pulse { animation: glowPulse 2s ease-in-out infinite; }
.animate-float { animation: float 3s ease-in-out infinite; }
```

### Transition Durations
```css
.transition-75 { transition-duration: 75ms; }
.transition-100 { transition-duration: 100ms; }
.transition-150 { transition-duration: 150ms; }
.transition-200 { transition-duration: 200ms; }
.transition-300 { transition-duration: 300ms; }
.transition-400 { transition-duration: 400ms; }
.transition-500 { transition-duration: 500ms; }
.transition-600 { transition-duration: 600ms; }
```

### Easing Functions
```css
.ease-linear { transition-timing-function: linear; }
.ease-in { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }
.ease-out { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }
.ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
```

## Interaction Patterns

### Button Interactions

#### Primary Button
```jsx
<Button className="
  bg-amber-500 
  text-slate-900 
  transition-all 
  duration-200 
  ease-out
  hover:bg-amber-600 
  hover:scale-105 
  hover:shadow-lg 
  active:bg-amber-700 
  active:scale-95 
  focus-visible:ring-2 
  focus-visible:ring-amber-500 
  focus-visible:shadow-glow 
  focus-visible:shadow-amber-500/25
">
  Primary Action
</Button>
```

**Interaction States:**
- **Hover**: Color change + scale up (1.05x) + enhanced shadow
- **Active**: Darker color + scale down (0.95x)
- **Focus**: Ring + glow effect
- **Loading**: Opacity reduction + spinner animation

#### Ghost Button
```jsx
<Button className="
  bg-transparent 
  text-slate-200 
  transition-all 
  duration-200 
  ease-out
  hover:bg-slate-800 
  hover:scale-105 
  active:bg-slate-700 
  active:scale-95 
  focus-visible:ring-2 
  focus-visible:ring-slate-500 
  focus-visible:bg-slate-800/50
">
  Ghost Action
</Button>
```

### Card Interactions

#### Interactive Card
```jsx
<Card className="
  transition-all 
  duration-300 
  ease-out
  hover:scale-[1.02] 
  hover:shadow-xl 
  hover:shadow-amber-500/10 
  hover:border-amber-400/50 
  active:scale-[0.98] 
  focus-visible:outline-none 
  focus-visible:ring-2 
  focus-visible:ring-amber-500 
  focus-visible:shadow-glow 
  focus-visible:shadow-amber-500/25
">
  Interactive Card Content
</Card>
```

**Interaction States:**
- **Hover**: Subtle scale (1.02x) + enhanced shadow + border glow
- **Active**: Scale down (0.98x)
- **Focus**: Ring + glow effect

#### Smaz Card Hover
```jsx
<SmazCard className="
  group 
  transition-all 
  duration-300 
  ease-out
  hover:scale-[1.02] 
  hover:shadow-xl 
  hover:shadow-amber-500/20 
  hover:border-amber-400/50
">
  <div className="
    transition-all 
    duration-300 
    opacity-0 
    translate-y-2 
    group-hover:opacity-100 
    group-hover:translate-y-0
  ">
    Hover-revealed content
  </div>
</SmazCard>
```

### Form Interactions

#### Input Focus
```jsx
<Input className="
  border 
  border-slate-600 
  transition-all 
  duration-200 
  ease-out
  focus:border-amber-400 
  focus:ring-2 
  focus:ring-amber-400/20 
  focus:shadow-glow-sm 
  focus:shadow-amber-400/25
">
```

#### Checkbox Animation
```jsx
<Checkbox className="
  transition-all 
  duration-150 
  ease-out
  checked:bg-amber-500 
  checked:border-amber-500 
  checked:scale-110
  focus:ring-2 
  focus:ring-amber-400/20
">
```

## Loading Animations

### Spinner Component
```jsx
const LoadingSpinner = ({ size = 'md' }) => (
  <svg 
    className={`animate-spin ${sizeClasses[size]}`}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);
```

### Skeleton Loading
```jsx
const Skeleton = ({ className = '' }) => (
  <div className={`
    animate-pulse 
    bg-slate-700 
    rounded 
    ${className}
  `} />
);

// Usage
<div className="space-y-3">
  <Skeleton className="h-6 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
  <Skeleton className="h-4 w-full" />
</div>
```

### Progress Bar Animation
```jsx
<div className="w-full bg-slate-700 rounded-full h-2">
  <div 
    className="
      bg-amber-500 
      h-2 
      rounded-full 
      transition-all 
      duration-500 
      ease-out
    "
    style={{ width: `${progress}%` }}
  />
</div>
```

## Page Transitions

### Route Transitions
```jsx
// Fade transition between pages
<div className="animate-fade-in">
  <PageContent />
</div>

// Slide up transition for modals
<Modal className="animate-slide-up">
  <ModalContent />
</Modal>
```

### Content Reveal
```jsx
// Staggered content reveal
<div className="space-y-4">
  <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
    First item
  </div>
  <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
    Second item
  </div>
  <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
    Third item
  </div>
</div>
```

## Gaming-Specific Effects

### Glow Effects
```jsx
// Tier-specific glows
<div className="shadow-glow-tier-s">S-tier glow</div>
<div className="shadow-glow-tier-a">A-tier glow</div>
<div className="shadow-glow-tier-b">B-tier glow</div>
<div className="shadow-glow-tier-c">C-tier glow</div>

// Interactive glow
<Button className="
  hover:shadow-glow 
  hover:shadow-amber-500/50 
  focus-visible:shadow-glow-lg 
  focus-visible:shadow-amber-500/75
">
  Glowing Button
</Button>
```

### Floating Elements
```jsx
// Subtle floating animation for decorative elements
<div className="animate-float">
  <Icon className="text-amber-400" />
</div>

// Delayed floating for multiple elements
<div className="animate-float" style={{ animationDelay: '1s' }}>
  <Icon className="text-amber-400" />
</div>
```

### Pulse Effects
```jsx
// Attention-grabbing pulse
<div className="animate-glow-pulse">
  Important notification
</div>

// Subtle pulse for active states
<div className="animate-pulse opacity-75">
  Loading content
</div>
```

## Accessibility Considerations

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up,
  .animate-slide-down,
  .animate-scale-in,
  .animate-float {
    animation: none;
  }
  
  .animate-glow-pulse {
    animation: none;
    box-shadow: 0 0 5px rgb(251 191 36 / 0.5);
  }
  
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

### Implementation in Components
```jsx
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};

// Usage in components
const AnimatedComponent = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={prefersReducedMotion ? '' : 'animate-fade-in'}>
      Content
    </div>
  );
};
```

## Performance Optimization

### Hardware Acceleration
Use CSS transforms for better performance:

```css
/* Prefer transforms over changing layout properties */
.hover\:scale-105:hover {
  transform: scale(1.05); /* Hardware accelerated */
}

/* Avoid animating layout properties */
.hover\:w-full:hover {
  width: 100%; /* Causes layout recalculation */
}
```

### Animation Best Practices
```jsx
// Use transform and opacity for smooth animations
<div className="
  transition-transform 
  transition-opacity 
  duration-200 
  hover:scale-105 
  hover:opacity-90
">
  Optimized animation
</div>

// Avoid animating expensive properties
<div className="
  transition-all  /* Avoid - animates everything */
  duration-200
">
  Expensive animation
</div>
```

### Will-Change Optimization
```css
/* Add will-change for complex animations */
.complex-animation {
  will-change: transform, opacity;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

/* Remove will-change after animation */
.complex-animation:not(:hover) {
  will-change: auto;
}
```

## Testing Animations

### Visual Testing
```javascript
// Test animation classes are applied
test('button has hover animation', () => {
  render(<Button>Test</Button>);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('hover:scale-105');
});

// Test reduced motion preference
test('respects reduced motion preference', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  
  render(<AnimatedComponent />);
  // Test that animations are disabled
});
```

### Performance Testing
```javascript
// Test animation performance
test('animation completes within expected time', async () => {
  render(<AnimatedComponent />);
  const element = screen.getByTestId('animated-element');
  
  fireEvent.mouseEnter(element);
  
  // Wait for animation to complete
  await waitFor(() => {
    expect(element).toHaveStyle('transform: scale(1.05)');
  }, { timeout: 300 });
});
```

## Usage Guidelines

### Do's
- Use consistent timing and easing across similar interactions
- Provide visual feedback for all user interactions
- Respect user motion preferences
- Optimize animations for performance
- Use subtle effects that enhance rather than distract
- Test animations across different devices and browsers

### Don'ts
- Don't overuse animations or make them too prominent
- Don't animate expensive CSS properties (width, height, etc.)
- Don't ignore accessibility preferences
- Don't use animations longer than necessary
- Don't animate too many elements simultaneously
- Don't forget to provide fallbacks for older browsers

### Best Practices
1. **Purpose**: Every animation should have a clear functional purpose
2. **Subtlety**: Animations should feel natural and unobtrusive
3. **Performance**: Use hardware-accelerated properties (transform, opacity)
4. **Accessibility**: Always respect reduced motion preferences
5. **Consistency**: Use consistent timing and easing across the application
6. **Testing**: Test animations on various devices and connection speeds