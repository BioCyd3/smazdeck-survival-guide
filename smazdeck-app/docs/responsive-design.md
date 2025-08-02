# Responsive Design Guidelines

This document outlines the responsive design approach, breakpoints, and mobile-first strategies used throughout the Smazdeck Survival Guide application.

## Design Philosophy

### Mobile-First Approach
All components are designed mobile-first, then enhanced for larger screens:

1. **Base Styles**: Optimized for mobile devices (320px+)
2. **Progressive Enhancement**: Add features for larger screens
3. **Touch-Friendly**: Minimum 44px touch targets
4. **Performance**: Optimize for mobile networks and devices

## Breakpoints

### Tailwind CSS Breakpoints
The application uses Tailwind's default breakpoint system:

```css
/* Mobile First (default) */
/* 0px - 639px */

/* Small tablets and large phones */
sm: 640px

/* Tablets */
md: 768px

/* Small laptops */
lg: 1024px

/* Desktops */
xl: 1280px

/* Large desktops */
2xl: 1536px
```

### Usage Examples
```jsx
// Mobile-first responsive classes
<div className="text-sm md:text-base lg:text-lg">
  Responsive text sizing
</div>

// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>

// Spacing adjustments
<div className="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>
```

## Component Responsive Behavior

### Button Component
```jsx
// Touch-friendly sizing on mobile
const getButtonSizes = (isTouchDevice) => ({
  xs: isTouchDevice ? 'h-8 px-2 text-xs' : 'h-7 px-2 text-xs',
  sm: isTouchDevice ? 'h-10 px-3 text-sm' : 'h-8 px-3 text-sm',
  md: isTouchDevice ? 'h-12 px-4 text-base' : 'h-10 px-4 text-base',
  lg: isTouchDevice ? 'h-14 px-6 text-lg' : 'h-12 px-6 text-lg',
  xl: isTouchDevice ? 'h-16 px-8 text-xl' : 'h-14 px-8 text-xl',
});
```

### Typography Scaling
```jsx
// Responsive heading sizes
const variantClasses = {
  display: {
    1: 'text-5xl md:text-6xl lg:text-7xl',
    2: 'text-4xl md:text-5xl lg:text-6xl',
    3: 'text-3xl md:text-4xl lg:text-5xl',
  },
  heading: {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl lg:text-5xl',
    3: 'text-2xl md:text-3xl lg:text-4xl',
  }
};
```

### Card Layouts
```jsx
// Responsive card grids
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</div>
```

## Mobile Optimizations

### Touch Targets
All interactive elements meet accessibility guidelines:

- **Minimum Size**: 44px × 44px for touch targets
- **Spacing**: Adequate spacing between touch elements
- **Visual Feedback**: Clear pressed states for touch interactions

```jsx
// Touch-friendly button sizing
<Button 
  size={isTouchDevice ? 'md' : 'sm'}
  className="min-h-[44px] min-w-[44px]"
>
  Touch Friendly
</Button>
```

### Navigation Patterns
```jsx
// Mobile navigation with hamburger menu
<MobileNavigation>
  <nav className="md:hidden">
    <button className="p-2 rounded-md">
      <MenuIcon className="w-6 h-6" />
    </button>
  </nav>
</MobileNavigation>

// Desktop navigation
<nav className="hidden md:flex space-x-4">
  <NavLink to="/smazs">Smazs</NavLink>
  <NavLink to="/builds">Builds</NavLink>
  <NavLink to="/tier-lists">Tier Lists</NavLink>
</nav>
```

### Content Adaptation
```jsx
// Progressive disclosure on mobile
<ProgressiveDisclosure>
  <summary className="md:hidden">Show Details</summary>
  <div className="md:block">
    Detailed content that's always visible on desktop
  </div>
</ProgressiveDisclosure>
```

## Layout Patterns

### Container Widths
```jsx
// Responsive container with max widths
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  <div className="max-w-none sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
    Content with responsive max-width
  </div>
</div>
```

### Grid Systems
```jsx
// Responsive grid with different column counts
<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {/* Grid items */}
</div>

// Responsive grid with span variations
<div className="grid grid-cols-1 md:grid-cols-12 gap-4">
  <div className="md:col-span-8">Main content</div>
  <div className="md:col-span-4">Sidebar</div>
</div>
```

### Flexbox Layouts
```jsx
// Responsive flex direction
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex-1">Content 1</div>
  <div className="flex-1">Content 2</div>
</div>

// Responsive alignment
<div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
  <h1>Title</h1>
  <nav>Navigation</nav>
</div>
```

## Data Presentation

### Tables
```jsx
// Responsive table with horizontal scroll
<div className="overflow-x-auto">
  <table className="min-w-full">
    <thead>
      <tr>
        <th className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm">Name</th>
        <th className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm">Stats</th>
      </tr>
    </thead>
    <tbody>
      {/* Table rows */}
    </tbody>
  </table>
</div>
```

### Card-Based Data
```jsx
// Transform table data to cards on mobile
<div className="block md:hidden">
  {/* Mobile card layout */}
  {data.map(item => (
    <Card key={item.id} className="mb-4">
      <div className="space-y-2">
        <div className="font-semibold">{item.name}</div>
        <div className="text-sm text-slate-400">{item.description}</div>
      </div>
    </Card>
  ))}
</div>

<div className="hidden md:block">
  {/* Desktop table layout */}
  <table>
    {/* Table content */}
  </table>
</div>
```

## Image Handling

### Responsive Images
```jsx
// Responsive image component
<ResponsiveImage
  src="/images/hero.jpg"
  alt="Hero image"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="w-full h-auto"
/>
```

### Image Optimization
```jsx
// Different image sizes for different screens
<picture>
  <source 
    media="(max-width: 768px)" 
    srcSet="/images/mobile-hero.jpg" 
  />
  <source 
    media="(max-width: 1200px)" 
    srcSet="/images/tablet-hero.jpg" 
  />
  <img 
    src="/images/desktop-hero.jpg" 
    alt="Hero image"
    className="w-full h-auto"
  />
</picture>
```

## Performance Considerations

### Mobile Performance
- **Lazy Loading**: Images and components load as needed
- **Code Splitting**: JavaScript bundles split by route
- **Critical CSS**: Above-the-fold styles inlined
- **Font Loading**: Optimized font loading strategies

```jsx
// Lazy loading images
<img 
  src="/images/smaz.jpg" 
  alt="Smaz portrait"
  loading="lazy"
  className="w-full h-auto"
/>

// Lazy loading components
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>
```

### Network Optimization
```jsx
// Responsive image loading
<img
  src="/images/smaz-small.jpg"
  srcSet="/images/smaz-small.jpg 480w, /images/smaz-medium.jpg 768w, /images/smaz-large.jpg 1200w"
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
  alt="Smaz portrait"
/>
```

## Testing Responsive Design

### Device Testing
Test on various devices and screen sizes:

- **Mobile Phones**: 320px - 480px
- **Large Phones**: 480px - 640px  
- **Tablets**: 640px - 1024px
- **Laptops**: 1024px - 1440px
- **Desktops**: 1440px+

### Browser DevTools
Use browser developer tools for responsive testing:

```javascript
// Common mobile viewport sizes
const viewports = [
  { width: 320, height: 568 }, // iPhone SE
  { width: 375, height: 667 }, // iPhone 8
  { width: 414, height: 896 }, // iPhone 11
  { width: 768, height: 1024 }, // iPad
  { width: 1024, height: 768 }, // iPad Landscape
];
```

### Automated Testing
```javascript
// Responsive design tests
describe('Responsive Design', () => {
  test('adapts to mobile viewport', () => {
    cy.viewport(375, 667);
    cy.visit('/');
    cy.get('[data-testid="mobile-nav"]').should('be.visible');
    cy.get('[data-testid="desktop-nav"]').should('not.be.visible');
  });

  test('adapts to desktop viewport', () => {
    cy.viewport(1280, 720);
    cy.visit('/');
    cy.get('[data-testid="desktop-nav"]').should('be.visible');
    cy.get('[data-testid="mobile-nav"]').should('not.be.visible');
  });
});
```

## useResponsive Hook

Custom hook for responsive behavior:

```javascript
// useResponsive hook implementation
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
  const isDesktop = screenSize.width >= 1024;
  const isTouchDevice = 'ontouchstart' in window;

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
  };
};

// Usage in components
const { isMobile, isTouchDevice } = useResponsive();

return (
  <Button 
    size={isTouchDevice ? 'lg' : 'md'}
    className={isMobile ? 'w-full' : 'w-auto'}
  >
    Responsive Button
  </Button>
);
```

## Best Practices

### Design Principles
1. **Mobile First**: Start with mobile design, enhance for desktop
2. **Touch Friendly**: Ensure adequate touch target sizes
3. **Content Priority**: Show most important content first on mobile
4. **Performance**: Optimize for mobile networks and devices
5. **Accessibility**: Maintain accessibility across all screen sizes

### Implementation Guidelines
1. **Use Relative Units**: Prefer rem, em, and percentages over px
2. **Flexible Layouts**: Use CSS Grid and Flexbox for responsive layouts
3. **Progressive Enhancement**: Add features for larger screens
4. **Test Early**: Test responsive behavior during development
5. **Performance Budget**: Monitor bundle size and loading performance

### Common Patterns
```jsx
// Responsive spacing
<div className="p-4 md:p-6 lg:p-8">

// Responsive text sizing  
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// Responsive grid columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Responsive visibility
<div className="block md:hidden"> {/* Mobile only */}
<div className="hidden md:block"> {/* Desktop only */}

// Responsive flex direction
<div className="flex flex-col md:flex-row">
```